import {rpc} from "../bridge";

export interface DeviceInfo {
	name: string
	model: string
	platform: string
	operatingSystem: string
	osVersion: string
	manufacturer: string
	isVirtual: boolean
	memUsed: number
	diskFree: number
	diskTotal: number
	appVersion: string
	appBuild: string
	appId: string
	appName: string
}

export interface BatteryInfo {
	batteryLevel: number
	isCharging: boolean
}

export interface GetLanguageCodeResult {
	value: string
}

/**
 * Return a unique identifier for the device.
 */
export function getId(): Promise<string> {
	return rpc("device/get-id", [])
}

/**
 * Return information about the underlying device/os/platform.
 */
export function getInfo(): Promise<DeviceInfo> {
	return rpc("device/get-info", [])
}

/**
 * Return information about the battery.
 */
export function getBatteryInfo(): Promise<BatteryInfo> {
	return rpc("device/get-battery-info", [])
}

/**
 * Get the device’s current language locale code.
 */
export function getLanguageCode(): Promise<GetLanguageCodeResult> {
	return rpc("device/get-language-code", [])
}
