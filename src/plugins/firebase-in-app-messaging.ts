import {rpc} from '../bridge'

export function isDisabled(): Promise<boolean> {
	return rpc("firebase-in-app-messaging/is-disabled", [])
}

export function setDisabled(disabled: boolean): Promise<void> {
	return rpc("firebase-in-app-messaging/set-disabled", [disabled])
}
