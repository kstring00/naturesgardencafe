/**
 * Every fact on the page carries a status so nothing invented ships.
 * - verified: taken from the printed menu or confirmed by Marina
 * - assumed:  reasonable, but must be confirmed before launch
 * - missing:  we don't have it; the UI hides it
 */
export type FactStatus = "verified" | "assumed" | "missing";

export interface Fact<T> {
  value: T | null;
  status: FactStatus;
  /** What to ask Marina to move this to "verified". */
  confirm?: string;
}

export const fact = <T>(
  value: T | null,
  status: FactStatus,
  confirm?: string,
): Fact<T> => ({ value, status, confirm });

/** A fact is shown only when it has a value and is not missing. */
export const isShown = <T>(f: Fact<T>): f is Fact<T> & { value: T } =>
  f.value !== null && f.status !== "missing";
