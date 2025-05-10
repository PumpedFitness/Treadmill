import { type Ref, ref } from 'vue'
import type { Action } from '@/types/action.ts'
import type { Notification } from '@/types/notification.ts'

type ReceiverFunction = (notification: Notification) => void

export type BBWebsocket = {
  connect: () => void
  send: (action: Action) => void
  sendWithReceive: (
    action: Action,
    callback?: ReceiverFunction
  ) => Promise<Notification | undefined>
  onReceive: (key: string, callback: ReceiverFunction) => void
  unregisterReceiver: (key: string) => void
  status: Ref<"closed" | "connecting" | "connected">
}

export const useWebsocket = (): BBWebsocket => {
  const websocketRef = ref<undefined | WebSocket>()
  const status = ref<"closed" | "connecting" | "connected">("closed")

  const receivers = new Map<string, ReceiverFunction>()

  const registerReceiver = (key: string, callback: ReceiverFunction) => {
    receivers.set(key, callback)
  }

  const unregisterReceiver = (key: string) => {
    receivers.delete(key)
  }

  const connect = () => {
    if (!websocketRef.value) {
      status.value = "connecting"
      console.log(import.meta.env.VITE_WS_API_URL)
      websocketRef.value = new WebSocket(import.meta.env.VITE_WS_API_URL)
    }

    websocketRef.value.addEventListener("open", () => {
      console.log("Connected with websocket")
      status.value = "connected"

      websocketRef.value!.addEventListener("message", (event: MessageEvent) => {
        const notification = JSON.parse(event.data) as Notification

        // Dispatch to all registered receivers
        receivers.forEach((callback, key) => {
          callback(notification)
        })
      })
    })

    websocketRef.value.addEventListener("error", (error) => {
      console.log("Error with websocket", error)
    })

    websocketRef.value.addEventListener("close", () => {
      status.value = "closed"
      console.log("Connection closed with websocket")
    })
  }

  const send = (action: Action) => {
    if (!websocketRef.value || websocketRef.value.readyState !== WebSocket.OPEN) {
      throw new Error("Websocket must be connected to be used")
    }
    websocketRef.value.send(JSON.stringify(action))
  }

  const sendWithReceive = async (
    action: Action,
    callback?: ReceiverFunction
  ): Promise<Notification | undefined> => {
    send(action)

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        websocketRef.value?.removeEventListener('message', onMessage)
        resolve(undefined)
      }, 1000)

      const onMessage = (event: MessageEvent) => {
        const receivedNotification = JSON.parse(event.data) as Notification

        if (receivedNotification.id === action.id) {
          clearTimeout(timeout)
          websocketRef.value?.removeEventListener('message', onMessage)

          if (callback) callback(receivedNotification)
          resolve(receivedNotification)
        }
      }

      websocketRef.value!.addEventListener('message', onMessage)
    })
  }

  return {
    connect,
    send,
    sendWithReceive,
    onReceive: registerReceiver,
    unregisterReceiver,
    status
  }
}
