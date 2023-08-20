import {rpc} from "../bridge";

export interface ShareOptions {
	title?: string
	text?: string
	url?: string
	dialogTitle?: string
}

export interface ShareResult {
	activityType: "SHARED" | "DISMISSED"
}

/**
 * Show a Share modal for sharing content with other apps
 */
export function open(options: ShareOptions): Promise<ShareResult> {
	return rpc("share/open", [options])
}
