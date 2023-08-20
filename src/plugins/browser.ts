import {rpc} from "../bridge";


export type IosBrowserConfig = {
	dismissButtonStyle?: 'done' | 'close' | 'cancel',
	preferredBarTintColor?: string,
	preferredControlTintColor?: string,
	readerMode?: boolean,
	animated?: boolean,
	modalPresentationStyle?:
		| 'automatic'
		| 'fullScreen'
		| 'pageSheet'
		| 'formSheet'
		| 'currentContext'
		| 'custom'
		| 'overFullScreen'
		| 'overCurrentContext'
		| 'popover'
		| 'none',
	modalTransitionStyle?:
		| 'coverVertical'
		| 'flipHorizontal'
		| 'crossDissolve'
		| 'partialCurl',
	modalEnabled?: boolean,
	enableBarCollapsing?: boolean,
	ephemeralWebSession?: boolean,
	formSheetPreferredContentSize?: { width: number, height: number },
}

export type AndroidBrowserConfig = {
	showTitle?: boolean,
	toolbarColor?: string,
	secondaryToolbarColor?: string,
	navigationBarColor?: string,
	navigationBarDividerColor?: string,
	enableUrlBarHiding?: boolean,
	enableDefaultShare?: boolean,
	forceCloseOnRedirection?: boolean,
	animations?: {
		startEnter: string,
		startExit: string,
		endEnter: string,
		endExit: string
	},
	headers?: { [key: string]: string },
	hasBackButton?: boolean,
	browserPackage?: string,
	showInRecents?: boolean
	includeReferrer?: boolean,
}

export type BrowserConfig = IosBrowserConfig | AndroidBrowserConfig

export interface OpenOptions {
	url: string
	browserConfig?: BrowserConfig
}

export interface OpenAuthOptions {
	url: string
	redirectURL: string
	browserConfig?: BrowserConfig
}

export interface OpenAuthResult {
	result: 'cancel' | 'dismiss' | 'success'
	url?: string
}

export class BrowserNotAvailable extends Error {
	constructor() {
		super('Browser not available');
	}
}

/**
 * Returns if the browser is available.
 */
export function isAvailable(): Promise<boolean> {
	return rpc("browser/is-available", [])
}

/**
 * Open a page with the specified options.
 */
export function open(options: OpenOptions): Promise<void> {
	return rpc("browser/open", [options])
}

/**
 * Close an open browser window.
 */
export function close(): Promise<void> {
	return rpc("browser/close", [])
}

/**
 * Open an authentication page.
 */
export function openAuth(options: OpenAuthOptions): Promise<void> {
	return rpc("browser/open-auth", [options])
}

/**
 * Close an authentication page.
 */
export function closeAuth(): Promise<void> {
	return rpc("browser/close-auth", [])
}
