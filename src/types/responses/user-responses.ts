import type { WsResponse } from '@/types/ws-response.ts'
import type { OnlineUser } from '@/types/online-user.ts'

export type ListUsersResponse = WsResponse & {
  users: OnlineUser[]
}
