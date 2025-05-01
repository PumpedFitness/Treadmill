import { z } from 'zod'
import type { SubmissionContext } from 'vee-validate'

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function getSubmitFn<Schema extends z.ZodObject<Record<string, any>>>(
  _: Schema,
  callback: (values: z.infer<Schema>, ctx: SubmissionContext) => void
) {
  return (values: Record<string, any>, ctx: SubmissionContext): void => {
    callback(values, ctx);
  };
}
