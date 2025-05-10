import { LocalNotifications } from '@capacitor/local-notifications'

const notificationPrerequisites = async () => {
  const permissionStatus = await LocalNotifications.checkPermissions()

  if (permissionStatus.display !== "granted") {
    await LocalNotifications.requestPermissions()
  }
}

export const notifyNow = async (title: string, body: string) => {
  await notificationPrerequisites()

  await LocalNotifications.schedule({
    notifications: [
      {
        title,
        body,
        id: 1,
        schedule: { at: new Date(Date.now() + 1) }
      }
    ]
  })
}
