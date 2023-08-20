<div align="center">
  ⚡️ JavaScript library for building performant and instant mobile apps experiences with ConvertNative. ⚡️
</div>

---

ConvertNative SDK makes it easy to use native features from your web code.

## Install

```
npm install convertnative-sdk
# or
yarn add convertnative-sdk
```

## Get Started

```typescript
import * as ConvertNative from 'convertnative-sdk'

await ConvertNative.oneSignal.setAppId('ONESIGNAL-APP-ID')
await ConvertNative.oneSignal.promptForPushNotifications()
console.log('OneSignal state: ', await ConvertNative.oneSignal.getState())

await ConvertNative.share.open({
  title: 'Google',
  url: 'https://google.com'
})
```
