import {rpc} from "../bridge";

export interface Notification {
	title: string
	body: string
	sound: string
	badge: string
	payload: object | string
}

export interface State {
	smsNumber: string
	emailAddress: string
	userId: string
	isSubscribed: boolean
	isPushDisabled: boolean
	pushToken: string
}

export type EventHandler =
	((eventName: 'one-signal/notification-received-in-foreground', payload: Notification) => any) |
	((eventName: 'one-signal/notification-opened', payload: Notification) => any)

export function getState(): Promise<State | null> {
	return rpc("one-signal/get-state", [])
}

export function setAppId(appId: string): Promise<void> {
	return rpc("one-signal/set-app-id", [appId])
}

export function promptForPushNotifications(): Promise<boolean> {
	return rpc("one-signal/prompt-for-push-notifications", [])
}

export function setExternalUserId(id: string): Promise<void> {
	return rpc("one-signal/set-external-user-id", [id])
}

export function removeExternalUserId(): Promise<void> {
	return rpc("one-signal/remove-external-user-id", [])
}

export function setEmail(email: string): Promise<void> {
	return rpc("one-signal/set-email", [email])
}

export function removeEmail(): Promise<void> {
	return rpc("one-signal/remove-email", [])
}

export function setSMSNumber(smsNumber: string): Promise<void> {
	return rpc("one-signal/set-sms-number", [smsNumber])
}

export function removeSMSNumber(): Promise<void> {
	return rpc("one-signal/remove-sms-number", [])
}

export function setTag(key: string, value: string): Promise<void> {
	return rpc("one-signal/set-tag", [key, value])
}

export function setTags(tags: { [key: string]: string }): Promise<void> {
	return rpc("one-signal/set-tags", [tags])
}

export function deleteTag(key: string): Promise<void> {
	return rpc("one-signal/delete-tag", [key])
}

export function deleteTags(keys: string[]): Promise<void> {
	return rpc("one-signal/delete-tags", [keys])
}

export function getTags(): Promise<{ [key: string]: string } | null> {
	return rpc("one-signal/get-tags", [])
}
