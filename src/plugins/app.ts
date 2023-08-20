import {rpc} from "../bridge";

export type EventHandler =
  ((eventName: 'app/url', url: string) => any) |
  ((eventName: 'app/hardware-back-press') => any)

export interface AppInfo {
  id: string
  name: string
  build: string
  version: string
  theme: "light" | "dark" | null | undefined
}

/**
 * Force exit the app.
 * This should only be used in conjunction with the backButton handler for Android to exit the app when navigation is complete.
 */
export function exit(): Promise<void> {
  return rpc("app/exit", [])
}

/**
 * Close splash screen.
 */
export function hideSplashScreen(): Promise<void> {
  return rpc("app/hide-splash-screen", [])
}

/**
 * Return information about the app.
 */
export function getInfo(): Promise<AppInfo> {
  return rpc("app/get-info", [])
}

/**
 * Returns if the app is active.
 */
export function isActive(): Promise<boolean> {
  return rpc("app/is-active", [])
}

/**
 * Get the URL the app was launched with, if any.
 */
export function getLaunchUrl(): Promise<string | null> {
  return rpc("app/get-launch-url", [])
}

/**
 * Open the homepage of the settings app.
 */
export function openSettings(): Promise<void> {
  return rpc("app/open-settings", [])
}

/**
 * Check if an app can be opened with the given URL.
 */
export function canOpenUrl(url: string): Promise<boolean> {
  return rpc("app/can-open-url", [url])
}

/**
 * Open an app with the given URL.
 */
export function openUrl(url: string): Promise<boolean> {
  return rpc("app/open-url", [url])
}
