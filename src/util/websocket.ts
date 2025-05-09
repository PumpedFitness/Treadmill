import { ref } from 'vue'

export const useWebsocket = () => {
  const websocketRef = ref<undefined | WebSocket>()
  const status = ref<"closed" | "connecting" | "connected">("closed")

  if (websocketRef.value === undefined) {
    status.value = "connecting"
    websocketRef.value = new WebSocket(`${import.meta.env.VITE_WS_API_URL}`)
    status.value = websocketRef.value.OPEN ? "connected" : "closed"
  }

  const ws = websocketRef.value

  ws.addEventListener("open", () => {
    const testAction = {
      path: "/",
      data: {
        test: "this is a string"
      }
    }

    ws.send(JSON.stringify(testAction))
  })



  return { status }
}
