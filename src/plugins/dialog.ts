import {rpc} from "../bridge";

export interface AlertOptions {
	title: string
	message: string
	buttonTitle: string
}

export interface PromptOptions {
	title: string
	message: string
	okButtonTitle: string
	cancelButtonTitle: string
	inputPlaceholder: string
	inputText: string
}

export interface PromptResult {
	value: string | undefined
	canceled: boolean
}

export interface ConfirmOptions {
	title: string
	message: string
	okButtonTitle: string
	cancelButtonTitle: string
}

export interface ConfirmResult {
	value: boolean
}

/**
 * Show an alert dialog
 */
export function alert(options: AlertOptions): Promise<void> {
	return rpc("dialog/alert", [options])
}

/**
 * Show a prompt dialog
 */
export function prompt(options: PromptOptions): Promise<PromptResult> {
	return rpc("dialog/prompt", [options])
}

/**
 * Show a confirmation dialog
 */
export function confirm(options: ConfirmOptions): Promise<ConfirmResult> {
	return rpc("dialog/confirm", [options])
}
