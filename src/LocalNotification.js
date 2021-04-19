import { AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';

const handleAppStateChange = appState => {
  if (appState === 'background') {
    const message = '현위치는 불법 주정차 단속구역입니다!';
    console.log(message);
    PushNotification.createChannel(
      {
        channelId: "com.parking", // (required)
        channelName: "com.parking", // (required)
        channelDescription: "com.parking", 
        importance: 4, 
        vibrate: true, 
      },
    );
    PushNotification.localNotification({
      visibility: 'public',
      smallIcon: "ic_notification",
      message,
      number: 1,
      actions: '["OK"]',
      repeatType: 'minute',
      date: new Date(Date.now()),
      channelId:"com.parking",
    });
    console.log("ㅇㅇ");

  }
}

export default {
  register: async () => {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      }
    });
    AppState.addEventListener('change', handleAppStateChange);
  },
  unregister: () => {
    AppState.removeEventListener('change', handleAppStateChange);
  },
};