import { AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';

const handleAppStateChange = appState => {
  if (appState === 'background') {
    const message = '현위치는 불법 주정차 단속구역입니다!';
    PushNotification.createChannel(
      {
        channelId: "com.parking",
        channelName: "com.parking",
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
      date: new Date(Date.now()),
      channelId:"com.parking",
    });
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
};