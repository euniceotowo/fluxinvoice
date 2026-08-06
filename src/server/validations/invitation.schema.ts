import { z } from "zod";

export const invitationRoleSchema = z.enum([
  "admin",
  "hr_manager",
  "payroll_manager",
  "employee",
]);

export const createInvitationSchema = z.object({
  email: z.email("Enter a valid email address"),
  role: invitationRoleSchema,
  message: z
    .string()
    .max(500, "Message must be 500 characters or fewer")
    .optional()
    .or(z.literal("")),
});

export const resendInvitationSchema = z.object({
  invitationId: z.string().min(1, "Invitation id is required"),
});

export const listInvitationsSchema = z.object({
  status: z.string().optional(),
  role: invitationRoleSchema.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export type CreateInvitationInput = z.infer<typeof createInvitationSchema>;
export type ResendInvitationInput = z.infer<typeof resendInvitationSchema>;
export type ListInvitationsInput = z.infer<typeof listInvitationsSchema>;
