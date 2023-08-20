import {rpc} from "../bridge";

export interface RegistrationSucceedEvent {
	deviceToken: string
}

export interface RegistrationFailedEvent {
	code: string
	domain: string
	localizedDescription: string
}

export interface Notification {
	type: string
	title: string
	body: string
	sound: string
	thread: string
	badge: number
	identifier: string
	payload: any
}

export type EventHandler =
	((eventName: 'push-notifications/registration-succeed', payload: RegistrationSucceedEvent) => any) |
	((eventName: 'push-notifications/registration-failed', payload: RegistrationFailedEvent) => any) |
	((eventName: 'push-notifications/registration-denied', payload: {}) => any) |
	((eventName: 'push-notifications/notification-opened', payload: Notification) => any) |
	((eventName: 'push-notifications/received-in-background', payload: Notification) => any) |
	((eventName: 'push-notifications/received-in-foreground', payload: Notification) => any)

export function registerRemoteNotifications(): Promise<void> {
	return rpc("push-notifications/register-remote-notifications", [])
}

export function isRegisteredForRemoteNotifications(): Promise<void> {
	return rpc("push-notifications/is-registered-for-remote-notifications", [])
}

export function getInitialNotification(): Promise<Notification | null> {
	return rpc("push-notifications/get-initial-notification", [])
}
