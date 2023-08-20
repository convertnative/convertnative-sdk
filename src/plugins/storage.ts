import {rpc} from "../bridge";

export interface GetOptions {
	key: string
}

export interface GetResult {
	value: string | null
}

export interface SetOptions {
	key: string
	value: string
}

export interface RemoveOptions {
	key: string
}

export interface KeysResult {
	keys: string[]
}

/**
 * Get the value from storage of a given key.
 */
export function get(options: GetOptions): Promise<GetResult> {
	return rpc("storage/get", [options])
}

/**
 * Set the value in storage for a given key.
 */
export function set(options: SetOptions): Promise<void> {
	return rpc("storage/set", [options])
}

/**
 * Remove the value from storage for a given key, if any.
 */
export function remove(options: RemoveOptions): Promise<void> {
	return rpc("storage/remove", [options])
}

/**
 * Clear keys and values from storage.
 */
export function clear(): Promise<void> {
	return rpc("storage/clear", [])
}

/**
 * Return the list of known keys in storage.
 */
export function keys(): Promise<KeysResult> {
	return rpc("storage/keys", [])
}
