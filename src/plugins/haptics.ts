import {rpc} from "../bridge";

export enum ImpactStyle {
	Heavy = "HEAVY",
	Medium = "MEDIUM",
	Light = "LIGHT",
}

export enum NotificationType {
	Success = "SUCCESS",
	Warning = "WARNING",
	Error = "ERROR",
}

export interface ImpactOptions {
	style: ImpactStyle
}

export interface NotificationOptions {
	type: NotificationType
}

/**
 * Trigger a haptics "impact" feedback
 */
export function impact(options?: ImpactOptions): Promise<void> {
	return rpc("haptics/impact", [options])
}

/**
 * Trigger a haptics "notification" feedback
 */
export function notification(options?: NotificationOptions): Promise<void> {
	return rpc("haptics/notification", [options])
}
