import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('big endian fixture', () => {
  assert.deepEqual([...api.encodeWords([0x1234], 16)], [0x12, 0x34]);
});
test('little endian fixture', () => {
  assert.deepEqual([...api.encodeWords([0x12345678], 32, true)], [0x78, 0x56, 0x34, 0x12]);
});
test('roundtrip range', () => {
  for (const width of [16, 32])
    for (const little of [false, true]) {
      const a = [0, 1, width === 16 ? 65535 : 4294967295];
      assert.deepEqual(api.decodeWords(api.encodeWords(a, width, little), width, little), a);
    }
});
test('subarray offset', () => {
  assert.deepEqual(
    api.decodeWords(new Uint8Array([9, 0x12, 0x34, 9]).subarray(1, 3), 16),
    [0x1234],
  );
});
test('bounds and alignment', () => {
  assert.throws(() => api.encodeWords([65536], 16));
  assert.throws(() => api.decodeWords(new Uint8Array([1]), 16));
  assert.throws(() => api.encodeWords([1], 8));
});
test('type and dense contract', () => {
  assert.throws(() => api.encodeWords([1, , 2], 16));
  assert.throws(() => api.decodeWords([], 16));
  assert.throws(() => api.encodeWords([1], 16, 1));
});
