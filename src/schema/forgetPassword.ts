import { z } from 'zod'

export const forgetPasswordSchema = z.object({
    email: z.string().describe("Enter email address").min(1, "Email is required")
})

export type forgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>