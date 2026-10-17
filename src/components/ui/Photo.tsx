import Image from "next/image";
import type { Photo as PhotoData } from "@/lib/photos";

/**
 * A photo with the shared color grade and, for stand-ins, the honest caption.
 * The caption disappears the moment `isStock` is false for that slot.
 */
export function Photo({
  photo,
  sizes,
  priority = false,
  fill = false,
  className = "",
  imgClassName = "",
  style,
}: {
  photo: PhotoData;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  imgClassName?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`graded relative block overflow-hidden ${className}`} style={style}>
      {fill ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={photo.blurDataURL}
          className={`h-auto w-full ${imgClassName}`}
        />
      )}
      {photo.isStock && <span className="sample-caption">Sample photo. Yours goes here.</span>}
    </span>
  );
}
