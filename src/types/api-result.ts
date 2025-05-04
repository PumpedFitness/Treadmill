import type { ServerFieldError } from '@/types/server-field-error.ts'

export type APIResult<T> = {
  status: boolean,
  code: number,
  message: string,
  data?: T
  fields: ServerFieldError[]
}
