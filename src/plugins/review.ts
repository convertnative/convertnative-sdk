import {rpc} from "../bridge";

/**
 * Show dialog to request a review of your app on the Store.
 */
export function request(): Promise<boolean> {
	return rpc("review/request", [])
}

/**
 * Return if the device support rating or not
 */
export function isAvailable(): Promise<boolean> {
	return rpc("review/is-available", [])
}
