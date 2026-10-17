"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import {
  CanvasTexture,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  LinearMipmapLinearFilter,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  DoubleSide,
  WebGLRenderer,
} from "three";
import { loadGsap } from "@/lib/motion";

const COUNT = 900;

/** 64×64 alpha leaf, drawn once on a canvas. Two greens are mixed in the shader. */
function leafTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(32, 2);
  ctx.bezierCurveTo(56, 18, 56, 46, 32, 62);
  ctx.bezierCurveTo(8, 46, 8, 18, 32, 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(32, 6);
  ctx.lineTo(32, 58);
  ctx.stroke();
  const t = new CanvasTexture(c);
  t.minFilter = LinearMipmapLinearFilter;
  return t;
}

const vertex = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aTarget;
  attribute float aRotStart;
  attribute float aRotTarget;
  attribute float aScale;
  attribute float aTint;
  attribute float aSeed;
  uniform float uProgress;
  uniform float uTime;
  varying vec2 vUv;
  varying float vTint;
  void main() {
    vUv = uv;
    vTint = aTint;
    float p = uProgress;
    float sway = sin(uTime * 1.3 + aSeed * 6.2831) * 0.035 * p;
    float rot = mix(aRotStart, aRotTarget, p) + sway;
    vec2 r = vec2(cos(rot), sin(rot));
    vec2 local = position.xy * aScale;
    vec2 rotated = vec2(local.x * r.x - local.y * r.y, local.x * r.y + local.y * r.x);
    vec3 pos = mix(aStart, aTarget, p);
    pos.xy += rotated;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uMap;
  varying vec2 vUv;
  varying float vTint;
  void main() {
    float a = texture2D(uMap, vUv).a;
    if (a < 0.35) discard;
    vec3 verde = vec3(0.306, 0.357, 0.192);
    vec3 hoja = vec3(0.478, 0.561, 0.235);
    gl_FragColor = vec4(mix(verde, hoja, vTint), 1.0);
  }
`;

/** Leaf positions: scattered start, wreath target on two arcs open at the top. */
function buildGeometry() {
  const base = new PlaneGeometry(1, 1);
  const geo = new InstancedBufferGeometry();
  geo.index = base.index;
  geo.setAttribute("position", base.attributes.position!);
  geo.setAttribute("uv", base.attributes.uv!);

  const start = new Float32Array(COUNT * 3);
  const target = new Float32Array(COUNT * 3);
  const rotStart = new Float32Array(COUNT);
  const rotTarget = new Float32Array(COUNT);
  const scale = new Float32Array(COUNT);
  const tint = new Float32Array(COUNT);
  const seed = new Float32Array(COUNT);

  const rx = 3.1;
  const ry = 2.95;
  for (let i = 0; i < COUNT; i++) {
    start[i * 3] = (Math.random() - 0.5) * 16;
    start[i * 3 + 1] = (Math.random() - 0.5) * 10;
    start[i * 3 + 2] = (Math.random() - 0.5) * 2;
    rotStart[i] = Math.random() * Math.PI * 2;

    const side = i % 2 === 0 ? -1 : 1;
    const u = Math.random();
    const theta = side < 0 ? (110 + u * 160) * (Math.PI / 180) : (270 + u * 160) * (Math.PI / 180);
    const thickness = (Math.random() - 0.5) * 0.8;
    const cx = rx * Math.cos(theta);
    const cy = ry * Math.sin(theta);
    const nx = Math.cos(theta) / rx;
    const ny = Math.sin(theta) / ry;
    const nl = Math.hypot(nx, ny) || 1;
    target[i * 3] = cx + (nx / nl) * thickness;
    target[i * 3 + 1] = cy + 0.2 + (ny / nl) * thickness;
    target[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    const tangent = Math.atan2(ry * Math.cos(theta), -rx * Math.sin(theta));
    const lean = (0.35 + Math.random() * 0.5) * (thickness >= 0 ? 1 : -1) * side;
    rotTarget[i] = tangent + lean;

    scale[i] = 0.24 + Math.random() * 0.22;
    tint[i] = Math.random() > 0.5 ? 1 : 0;
    seed[i] = Math.random();
  }
  geo.setAttribute("aStart", new InstancedBufferAttribute(start, 3));
  geo.setAttribute("aTarget", new InstancedBufferAttribute(target, 3));
  geo.setAttribute("aRotStart", new InstancedBufferAttribute(rotStart, 1));
  geo.setAttribute("aRotTarget", new InstancedBufferAttribute(rotTarget, 1));
  geo.setAttribute("aScale", new InstancedBufferAttribute(scale, 1));
  geo.setAttribute("aTint", new InstancedBufferAttribute(tint, 1));
  geo.setAttribute("aSeed", new InstancedBufferAttribute(seed, 1));
  geo.instanceCount = COUNT;
  base.dispose();
  return geo;
}

/**
 * Plain Three (no React renderer, to stay inside the chunk budget).
 * Renders while mounted; the parent unmounts it when it scrolls away.
 */
export function WreathScene({ assembledRef }: { assembledRef: MutableRefObject<boolean> }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 10;

    const geometry = buildGeometry();
    const texture = leafTexture();
    const progress = { value: assembledRef.current ? 1 : 0 };
    const material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: { uProgress: { value: progress.value }, uTime: { value: 0 }, uMap: { value: texture } },
      side: DoubleSide,
    });
    const mesh = new Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      // keep the wreath inside the shorter axis on narrow screens
      camera.position.z = w < h * 1.1 ? 13.5 : 10;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      material.uniforms.uTime!.value = (now - t0) / 1000;
      material.uniforms.uProgress!.value = progress.value;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let cancelled = false;
    if (!assembledRef.current) {
      loadGsap().then((gsap) => {
        if (cancelled) return;
        gsap.to(progress, { value: 1, duration: 1.6, ease: "expo.out", onComplete: () => (assembledRef.current = true) });
      });
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [assembledRef]);

  return <div ref={host} className="absolute inset-0" />;
}
