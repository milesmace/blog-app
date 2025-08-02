import { computeFromTo } from '@/utils';

describe('computeFromTo', () => {
  it('should compute the correct from and to values with no offset', () => {
    const { from, to } = computeFromTo({ page: 1, limit: 10 });

    expect(from).toBe(0);
    expect(to).toBe(10);
  });

  it('should compute the correct from and to values with offset', () => {
    const { from, to } = computeFromTo({ page: 1, limit: 10, offset: 4 });

    expect(from).toBe(4);
    expect(to).toBe(14);
  });
});
