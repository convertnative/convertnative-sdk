import { v4 as uuid } from "uuid"
import * as plugins from './plugins'

export type EventHandler =
  plugins.pushNotifications.EventHandler |
  plugins.oneSignal.EventHandler |
  plugins.firebaseCloudMessaging.EventHandler |
  plugins.app.EventHandler

let eventListeners: [Parameters<EventHandler>[0] | '*', EventHandler][] = []

function handleEventMessage(event: any) {
  try {
    const data = JSON.parse(event.data)
    eventListeners.forEach((listener) => {
      try {
        if (data && data.type === 'event' && ['*', data.eventName].includes(listener[0])) {
          listener[1](data.eventName as never, data.payload)
        }
      } catch (error) {
        console.error(`An error occurred with a listener: ${error}`)
      }
    })
  } catch (error) {}
}

if (typeof window === 'object') {
  window.addEventListener('message', handleEventMessage)
}
if (typeof document === 'object') {
  document.addEventListener('message', handleEventMessage)
}

export function postMessage(message: string) {
  const webview = (window as any).ReactNativeWebView
  if (!webview?.postMessage) {
    throw new BridgeUnavailable()
  }
  webview.postMessage(message)
}

export class BridgeUnavailable extends Error {
  constructor() {
    super('Bridge unavailable, are you running in the app?')
  }
}

export function addEventListener<T extends EventHandler>(eventName: Parameters<T>[0] | '*', handler: T) {
  eventListeners.push([eventName, handler])
}

export function removeEventListener<T extends EventHandler>(eventName: Parameters<T>[0] | '*', handler: T) {
  eventListeners = eventListeners.filter((listener) => listener[0] !== eventName || listener[1] !== handler)
}

export function rpc(method: string, args: any[]): Promise<any> {
  const requestId = uuid()
  postMessage(JSON.stringify({
    requestId,
    method,
    arguments: args,
  }))

  return new Promise((resolve, reject) => {
    function onMessage(event: any) {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'response/success' && data.requestId === requestId) {
          window.removeEventListener('message', onMessage)
          document.removeEventListener('message', onMessage)
          resolve(data.payload)
        } else if (data.type === 'response/failure' && data.requestId === requestId) {
          window.removeEventListener('message', onMessage)
          document.removeEventListener('message', onMessage)
          reject(new BridgeRPCFailed(data.payload))
        }
      } catch (error) {}
    }
    window.addEventListener('message', onMessage)
    document.addEventListener('message', onMessage)
  })
}

export class BridgeRPCFailed extends Error {}
