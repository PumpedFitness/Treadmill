import { isWsResponse, type WsResponse } from '@/types/ws-response.ts'

export type Notification = WsResponse & {
  id: string
  priority: "HIGH" | "MEDIUM" | "LOW",
  body: string,
  title: string
}

export function isNotification(obj: unknown): obj is Notification {
  if (!isWsResponse(obj)) return false;

  const o = obj as Record<string, unknown>;

  return (
    typeof o.shouldNotify === 'boolean' && o.shouldNotify &&
    typeof o.body === 'string' &&
    typeof o.title === 'string' &&
    (o.priority === 'HIGH' || o.priority === 'MEDIUM' || o.priority === 'LOW')
  );
}
