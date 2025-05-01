import { z } from 'zod'
import type { SubmissionContext } from 'vee-validate'
import type { ServerFieldError } from '@/types/server-field-error.ts'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function getSubmitFn<Schema extends z.ZodObject<Record<string, any>>>(
  _: Schema,
  callback: (values: z.infer<Schema>, ctx: SubmissionContext) => void
) {
  return (values: Record<string, any>, ctx: SubmissionContext): void => {
    callback(values, ctx);
  };
}


export const transformFieldErrors = (fields: ServerFieldError[]): Record<string, string> => {
  return fields.reduce((acc, field) => {
    acc[field.path] = field.message
    return acc
  }, {} as Record<string, string>)
}
