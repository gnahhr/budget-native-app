import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { getDateTodayISO } from './dateFunctions';

export async function schedulePushNotification(type, value, hasList, list) {

  const notifData = {
    "overspend": {
      title: "You have overspent!",
      body: `You spend over the budget for ${value}!`
    },
    "nearBudget": {
      title: 'Warning!',
      body: 'You are close to spending all your budget!'
    },
    "overBudget": {
      title: 'Warning!!',
      body: 'You have spent over your budget!'
    },
    "reminder": {
      title: 'Reminder!',
      body: `Don't forget to add your expenses for the day!`,
    },
    "dueDate": {
      title: 'Reminder!',
      body: `Your ${value.type} to ${value.name} is nearing the due date at ${value.date}.`
    },
    "extraBudget": {
      title: 'Reminder!',
      body: `Extra amount has been added to your budget because of ${value}.`
    }
  }
  
  let newList = list ? JSON.parse(list) : {"initData" : "0-0-0"};
  
  if (hasList) {
    const notifDate = new Date(newList[value]);
    const dateToday = getDateTodayISO();

    if (newList[value] === undefined) {
      newList[value] = getDateTodayISO();
    } else if (newList[value] && (dateToday > notifDate)) {
      newList[value] = getDateTodayISO();
    } else {
      return newList;
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

  if (hasList) return newList;
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