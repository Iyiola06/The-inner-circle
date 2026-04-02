import { submitJoinRequest } from '@/server/actions/join';
import { describe, it, expect, vi } from 'vitest';

// Mocking dependencies
vi.mock('@/lib/supabase-server', () => ({
  createClient: vi.fn(),
}));

describe('Join Request Flow', () => {
  it('should throw error for invalid community ID', async () => {
    const data = { communityId: 'not-a-uuid', fullName: 'John Doe', email: 'john@example.com', phone: '1234567890' };
    await expect(submitJoinRequest(data)).rejects.toThrow();
  });

  it('should throw error for invalid email', async () => {
    const data = { communityId: '550e8400-e29b-41d4-a716-446655440000', fullName: 'John Doe', email: 'invalid-email', phone: '1234567890' };
    await expect(submitJoinRequest(data)).rejects.toThrow();
  });
});
