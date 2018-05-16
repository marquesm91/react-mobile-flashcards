import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import dayjs from 'dayjs';

const NOTIFICATION_PRACTICE = 'notification-practice';

export const clearLocalNotification = () => (
  AsyncStorage.removeItem(NOTIFICATION_PRACTICE)
    .then(Notifications.cancelAllScheduledNotificationAsync)
);

const createNotification = () => ({
  title: 'Do a Quiz!',
  body: "Don't forget to practice today!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
});

export const setLocalNotification = async () => {
  const raw = await AsyncStorage.getItem(NOTIFICATION_PRACTICE);
  const data = JSON.parse(raw);

  if (data === null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync()

      let tomorrow = dayjs().add(1, 'day');

      Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
          time: tomorrow,
          repeat: 'day',
        }
      )

      AsyncStorage.setItem(NOTIFICATION_PRACTICE, JSON.stringify(true))
    }
  }
}

export default {
  setLocalNotification,
  clearLocalNotification,
}