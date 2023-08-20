import {rpc} from "../bridge";

export type AuthenticationType = "FaceID" | "TouchID" | "Biometrics"

export interface PromptOptions {
	reason: string
	cancelButton?: string
	fallbackPromptMessage?: string
}

export interface PromptResult {
	success: boolean
	error: string | undefined
}

export interface SupportedResult {
	available: boolean
	type: AuthenticationType | null
}

/**
 * Request a biometric verification
 */
export function prompt(options: PromptOptions): Promise<PromptResult> {
	return rpc("biometric/prompt", [options])
}

/**
 * Return if the device support biometric verification or not
 */
export function isSupported(): Promise<SupportedResult> {
	return rpc("biometric/is-supported", [])
}
