import {rpc} from '../bridge'

export function isEnabled(): Promise<boolean> {
	return rpc("firebase-crashlytics/is-enabled", [])
}

export function setEnabled(enabled: boolean): Promise<void> {
	return rpc("firebase-crashlytics/set-enabled", [enabled])
}

export function didCrashOnPreviousExecution(): Promise<boolean> {
	return rpc("firebase-crashlytics/did-crash-on-previous-execution", [])
}

export function log(message: string): Promise<void> {
	return rpc("firebase-crashlytics/log", [message])
}

export function setUserId(userId: string): Promise<void> {
	return rpc("firebase-crashlytics/set-user-id", [userId])
}

export function setAttribute(key: string, value: string): Promise<void> {
	return rpc("firebase-crashlytics/set-attribute", [key, value])
}

export function setAttributes(attributes: { [p: string]: string }): Promise<void> {
	return rpc("firebase-crashlytics/set-attributes", [attributes])
}

export function crash(): Promise<void> {
	return rpc("firebase-crashlytics/crash", [])
}
