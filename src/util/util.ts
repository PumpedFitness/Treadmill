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

export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}


export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
