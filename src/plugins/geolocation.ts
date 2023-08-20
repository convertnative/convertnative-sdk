import {rpc} from "../bridge";

export type PermissionState = "disabled" | "granted" | "denied" | "restricted" | "never_ask_again"

export interface PermissionLevel {
	level: "whenInUse" | "always"
}

export interface PermissionStatus {
	location: PermissionState
}

export interface PositionOptions {
	enableHighAccuracy?: boolean
	timeout?: number
	maximumAge?: number
}

export interface Position {
	timestamp:  number
	coords: {
		latitude: number
		longitude: number
		accuracy: number
		altitudeAccuracy?: number
		altitude?: number
		speed?: number
		heading?: number
	}
}

/**
 * Get the current GPS location of the device
 */
export function getCurrentPosition(options?: PositionOptions): Promise<Position> {
	return rpc("geolocation/get-current-location", [options])
}

/**
 * Request location permissions
 */
export function requestPermission(options: PermissionLevel): Promise<PermissionStatus> {
	return rpc("geolocation/request-permission", [options])
}
