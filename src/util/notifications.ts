import { LocalNotifications } from '@capacitor/local-notifications'

export const sampleNotification = async () => {

  const permissionStatus = await LocalNotifications.checkPermissions()

  if (permissionStatus.display !== "granted") {
    await LocalNotifications.requestPermissions()
  }

  console.log("scheduling notification")
  const not = await LocalNotifications.schedule({
    notifications: [
      {
        title: "Goonhub",
        body: "Your goonbodies are waiting for you. Join now for the 42th Circlejerk this month!",
        id: 1,
        schedule: { at: new Date(Date.now() + 1000) }
      }
    ]
  })
}
