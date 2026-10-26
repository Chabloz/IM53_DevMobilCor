export const TAU = 2 * Math.PI;

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (inclusive)
 * @returns {number} Random integer between min and max
 */
export function randomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') throw new TypeError('Both min and max must be numbers');
  if (min > max) throw new RangeError('min must be less than or equal to max');
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') throw new TypeError('All arguments must be numbers');
  if (min > max) throw new RangeError('min must be less than or equal to max');
  return Math.min(Math.max(value, min), max);
}

export function moduloEuclidian(op1, op2) {
  return ((op1 % op2) + op2) % op2;
}
