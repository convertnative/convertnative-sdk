import { rpc } from "./bridge";

export * from './bridge'

export * from './plugins'

export async function isAvailable(): Promise<boolean> {
  try {
    await rpc("ping", [])
    return true
  } catch (error) {
    return false
  }
}
