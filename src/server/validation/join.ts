import { z } from 'zod';

export const JoinRequestSchema = z.object({
  communityId: z.string().uuid(),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
});
