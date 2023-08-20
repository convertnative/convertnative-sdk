import {rpc} from "../bridge";

export enum AuthorizationStatus {
	/**
	 * The app user has not yet chosen whether to allow the application to create notifications. Usually
	 * this status is returned prior to the first call of `requestPermission`.
	 *
	 * @platform ios iOS
	 */
	NOT_DETERMINED = -1,

	/**
	 * The app is not authorized to create notifications.
	 */
	DENIED = 0,

	/**
	 * The app is authorized to create notifications.
	 */
	AUTHORIZED = 1,

	/**
	 * The app is currently authorized to post non-interrupting user notifications
	 * @platform ios iOS >= 12
	 */
	PROVISIONAL = 2,

	/**
	 * The app is authorized to create notifications for a limited amount of time.
	 * Used in App Clips.
	 * @platform ios iOS >= 14
	 */
	EPHEMERAL = 3,
}

export interface RemoteMessage {
	/**
	 * The collapse key a message was sent with. Used to override existing messages with the same
	 * key.
	 */
	collapseKey?: string;

	/**
	 * A unique ID assigned to every message.
	 *
	 * If not provided, a random unique ID is generated.
	 */
	messageId?: string;

	/**
	 * The message type of the message.
	 */
	messageType?: string;

	/**
	 * The topic name or message identifier.
	 */
	from?: string;

	/**
	 * The address for the message.
	 */
	to?: string;

	/**
	 * The time to live for the message in seconds.
	 *
	 * Defaults to 3600.
	 */
	ttl?: number;

	/**
	 * The time the message was sent, in milliseconds since the start of unix epoch
	 */
	sentTime?: number;

	/**
	 * Any additional data sent with the message.
	 */
	data?: { [key: string]: string };

	/**
	 * Additional Notification data sent with the message
	 */
	notification?: Notification;

	/**
	 * Whether the iOS APNs message was configured as a background update notification.
	 *
	 * @platform ios iOS
	 */
	contentAvailable?: boolean;

	/**
	 * Whether the iOS APNs `mutable-content` property on the message was set
	 * allowing the app to modify the notification via app extensions.
	 *
	 * @platform ios iOS
	 */
	mutableContent?: boolean;

	/**
	 * The iOS category this notification is assigned to.
	 *
	 * @platform ios iOS
	 */
	category?: string;

	/**
	 * An iOS app specific identifier used for notification grouping.
    threadId?: string;
	 */
	threadId?: string;
}

export interface Notification {
	/**
	 * The native localization key for the notification title.
	 */
	titleLocKey?: string;

	/**
	 * Any arguments that should be formatted into the resource specified by titleLocKey.
	 */
	titleLocArgs?: string[];

	/**
	 * The notification body content.
	 */
	body?: string;

	/**
	 * Web only. The URL to use for the notification's icon. If you don't send this key in the request,
	 * FCM displays the launcher icon specified in your app manifest.
	 */
	icon?: string;

	/**
	 * Web only. The URL of an image that is downloaded on the device and displayed in the notification.
	 */
	image?: string;

	/**
	 * Web only. The notification's title.
	 */
	title?: string;

	/**
	 * The native localization key for the notification body content.
	 */
	bodyLocKey?: string;

	/**
	 * Any arguments that should be formatted into the resource specified by bodyLocKey.
	 */
	bodyLocArgs?: string[];

	ios?: {
		/**
		 * The notification's subtitle.
		 */
		subtitle?: string;

		/**
		 * The native localization key for the notification's subtitle.
		 */
		subtitleLocKey?: string;

		/**
		 * Any arguments that should be formatted into the resource specified by subtitleLocKey.
		 */
		subtitleLocArgs?: string[];

		/**
		 * The value of the badge on the home screen app icon.
		 * If not specified, the badge is not changed.
		 * If set to 0, the badge has been removed.
		 */
		badge?: string;

		/**
		 * The sound played when the notification was delivered on the device (if permissions permit).
		 */
		sound?: string;
	};

	/**
	 * Additional Android specific properties set on the notification.
	 */
	android?: {
		/**
		 * The sound played when the notification was delivered on the device (channel settings permitted).
		 *
		 * Set as "default" if the default device notification sound was used.
		 */
		sound?: string;

		/**
		 * The channel ID set on the notification. If not set, the notification uses the default
		 * "Miscellaneous" channel set by FCM.
		 */
		channelId?: string;

		/**
		 * The custom color used to tint the notification content.
		 */
		color?: string;

		/**
		 * The custom small icon used to display on the notification. If not set, uses the default
		 * application icon defined in the AndroidManifest file.
		 */
		smallIcon?: string;

		/**
		 * The custom image was provided and displayed in the notification body.
		 */
		imageUrl?: string;

		/**
		 * Deep link URL provided to the notification.
		 */
		link?: string;

		/**
		 * The current unread notification count for this application, managed by the device.
		 */
		count?: number;

		/**
		 * Name of the click action set on the notification.
		 */
		clickAction?: string;

		/**
		 * The notification priority.
		 *
		 * Note; on devices which have channel support (Android 8.0 (API level 26) +),
		 * this value will be ignored. Instead, the channel "importance" level is used.
		 */
		priority?: number;

		/**
		 * Ticker text set on the notification.
		 *
		 * Ticker text is used for devices with accessibility enabled (e.g. to read out the message).
		 */
		ticker?: string;

		/**
		 * The visibility of a notification. This value determines how the notification is shown on the users
		 * devices (e.g. on the lock-screen).
		 */
		visibility?: number;
	};
}

export type EventHandler =
	((eventName: 'firebase-cloud-messaging/notification-received-in-background', payload: RemoteMessage) => any) |
	((eventName: 'firebase-cloud-messaging/notification-received-in-foreground', payload: RemoteMessage) => any) |
	((eventName: 'firebase-cloud-messaging/notification-opened', payload: RemoteMessage) => any)

export function isSupported(): Promise<boolean> {
	return rpc("firebase-cloud-messaging/is-supported", [])
}

export function getToken(): Promise<string> {
	return rpc("firebase-cloud-messaging/get-token", [])
}

export function hasPermission(): Promise<AuthorizationStatus> {
	return rpc("firebase-cloud-messaging/has-permission", [])
}

export function getInitialNotification(): Promise<RemoteMessage | null> {
	return rpc("firebase-cloud-messaging/get-initial-notification", [])
}

export function subscribeToTopic(topic: string): Promise<void> {
	return rpc("firebase-cloud-messaging/subscribe-to-topic", [topic])
}

export function unsubscribeFromTopic(topic: string): Promise<void> {
	return rpc("firebase-cloud-messaging/unsubscribe-from-topic", [topic])
}

export function registerDeviceForRemoteMessages(): Promise<void> {
	return rpc("firebase-cloud-messaging/register-device-for-remote-messages", [])
}

export function unregisterDeviceForRemoteMessages(): Promise<void> {
	return rpc("firebase-cloud-messaging/unregister-device-for-remote-messages", [])
}

export function requestPermission(): Promise<AuthorizationStatus> {
	return rpc("firebase-cloud-messaging/request-permission", [])
}
