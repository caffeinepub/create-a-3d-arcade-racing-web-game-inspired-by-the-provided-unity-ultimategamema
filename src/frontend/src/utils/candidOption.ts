/**
 * Utility functions for handling Candid optional types.
 * Candid optionals can be represented as null, undefined, or [] (empty array).
 */

/**
 * Unwraps a Candid optional value to a consistent TypeScript representation.
 * Returns null if the value is absent, otherwise returns the value.
 */
export function unwrapOption<T>(value: T | null | undefined | []): T | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (Array.isArray(value) && value.length === 0) {
    return null;
  }
  return value as T;
}

/**
 * Wraps a TypeScript optional value for Candid encoding.
 * Converts null/undefined to undefined (which Candid encodes as opt-none).
 * Passes through defined values as-is.
 */
export function wrapOption<T>(value: T | null | undefined): T | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }
  return value;
}

/**
 * Normalizes a bigint optional field.
 * Returns undefined if the value is absent or zero.
 */
export function normalizeBigIntOption(value: bigint | null | undefined): bigint | undefined {
  const unwrapped = unwrapOption(value);
  if (unwrapped === null || unwrapped === BigInt(0)) {
    return undefined;
  }
  return unwrapped;
}
