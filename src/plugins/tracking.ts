import {rpc} from "../bridge";

export type TrackingStatus = "unavailable" | "denied" | "authorized" | "restricted" | "not-determined"

/**
 * Get the status of the Tracking settings (only IOS).
 */
export function getStatus(): Promise<TrackingStatus> {
	return rpc("tracking/get-status", [])
}

/**
 * Show dialog to request tracking permission for your app (only IOS).
 */
export function requestPermission(): Promise<TrackingStatus> {
	return rpc("tracking/request-permission", [])
}
