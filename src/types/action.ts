import { uuidv4 } from '@/util/util.ts'

export type Action = {
  id: string
  path: string
  data: unknown
}

export const buildAction = (action: object, path: string): Action => {

  return {
    data: action,
    id: uuidv4(),
    path
  }
}
