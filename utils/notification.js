import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export async function schedulePushNotification(type, value) {
  const notifData = {
    "overspend": {
      title: "You have overspent!",
      body: `You spend over the budget for ${value}!`
    }
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: notifData[type].title,
      body: notifData[type].body,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

export async function registerForPushNotificationsAsync() {
  // let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:

    // token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  // return token;
}
