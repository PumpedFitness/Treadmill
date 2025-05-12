import { type Ref, ref } from 'vue'
import type { Action } from '@/types/action.ts'
import type { Notification } from '@/types/notification.ts'
import type { WsResponse } from '@/types/ws-response.ts'
import { isCancel } from 'axios'

type ReceiverFunction = (response: WsResponse) => void
type OnConnectFunction = () => void

export type BBWebsocket = {
  connect: () => void
  onConnect: (key: string, callback: OnConnectFunction) => void
  send: (action: Action) => void
  sendWithReceive: (
    action: Action,
    callback?: ReceiverFunction
  ) => Promise<WsResponse | undefined>
  onReceive: (key: string, callback: ReceiverFunction) => void
  unregisterReceiver: (key: string) => void
  status: Ref<"closed" | "connecting" | "connected">
}

export const useWebsocket = (): BBWebsocket => {
  const websocketRef = ref<undefined | WebSocket>()
  const status = ref<"closed" | "connecting" | "connected">("closed")
  const isReconnecting = ref<boolean>(false)

  const receivers = new Map<string, ReceiverFunction>()
  const connectListeners = new Map<string, OnConnectFunction>()

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
      connectListeners.forEach((callback) => {
        callback()
      })

      websocketRef.value!.addEventListener("message", (event: MessageEvent) => {
        const notification = JSON.parse(event.data) as Notification

        // Dispatch to all registered receivers
        receivers.forEach((callback) => {
          callback(notification)
        })
      })
    })

    websocketRef.value.addEventListener("error", (error) => {
      console.log("Error with websocket", error)
    })

    websocketRef.value.addEventListener("close", () => {
      status.value = "closed"
      websocketRef.value = undefined

      setTimeout(async () => {
        await reconnect()
      }, 500)

    })
  }

  const reconnect = async () => {
    if (isReconnecting.value) return
    isReconnecting.value = true

    let attempts = 0
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      attempts++;
      console.log(`Reconnect attempt ${attempts}`);

      connect();

      const connected = await waitForConnect(1000); // Wait 1 second to check connection

      if (connected) {
        console.log("Connected successfully.");
        isReconnecting.value = false
        return
      }

      console.log("Connection failed. Retrying...");
    }

    isReconnecting.value = false
    console.error("Failed to reconnect after 3 attempts.");

  }

  const waitForConnect = (timeout: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(false), timeout);

      // Assume we have some function `isConnected` that returns true if connected
      const checkInterval = setInterval(() => {
        if (status.value === "connected") {
          clearTimeout(timer);
          clearInterval(checkInterval);
          resolve(true);
        }
      }, 100);
    });
  };

  const send = (action: Action) => {
    if (!websocketRef.value || websocketRef.value.readyState !== WebSocket.OPEN) {
        throw new Error("Websocket must be connected to be used")
    }
    websocketRef.value.send(JSON.stringify(action))
  }

  const onConnect = (key: string, callback: OnConnectFunction) => {
    connectListeners.set(key, callback)
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
    onConnect,
    sendWithReceive,
    onReceive: registerReceiver,
    unregisterReceiver,
    status
  }
}
