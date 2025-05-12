export type WsResponse = {
  shouldNotify: boolean
  message: string
  status: boolean
}

export function isWsResponse(obj: unknown): obj is WsResponse {
  if (typeof obj !== 'object' || obj === null) return false;

  const o = obj as Record<string, unknown>;

  return (
    typeof o.shouldNotify === 'boolean' &&
    typeof o.message === 'string' &&
    typeof o.status === 'boolean'
  );
}
