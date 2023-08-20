import {rpc} from '../bridge'

export function logEvent(name: string, params?: { [p: string]: any}): Promise<void> {
	return rpc("firebase-analytics/log-event", [name, params])
}

export function setUserId(userId: string | null): Promise<void> {
	return rpc("firebase-analytics/set-user-id", [userId])
}

export function setUserProperty(key: string, value: string | null): Promise<void> {
	return rpc("firebase-analytics/set-user-property", [key, value])
}

export function setUserProperties(properties: { [p: string]: string | null }): Promise<void> {
	return rpc("firebase-analytics/set-user-properties", [properties])
}

export function setEnabled(enabled: boolean): Promise<void> {
	return rpc("firebase-analytics/set-enabled", [enabled])
}

export function reset(): Promise<void> {
	return rpc("firebase-analytics/reset", [])
}

export function getSessionId(): Promise<number | null> {
	return rpc("firebase-analytics/get-session-id", [])
}

export function getAppInstanceId(): Promise<string | null> {
	return rpc("firebase-analytics/get-app-instance-id", [])
}
