import { AppState } from 'react-native';
import PushNotification from 'react-native-push-notification';

const _handleAppStateChange = nextAppState => {
  if (nextAppState === 'active') {
    _registerLocalNotification();
  }
};

const _registerLocalNotification = () => {

  const message = '현위치는 불법 주정차 단속구역입니다!';

  PushNotification.localNotificationSchedule({
    vibrate: true,
    vibration: 300,
    priority: 'hight',
    visibility: 'public',
    importance: 'hight',
    message,
    playSound: false,
    number: 1,
    actions: '["OK"]',
    date: new Date(Date.now()),

  });
};
export default {
  register: async () => {
    PushNotification.configure({
      onNotification: function(notification) {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
    });

    _registerLocalNotification();

    AppState.addEventListener('change', _handleAppStateChange);
  },
  unregister: () => {
    AppState.removeEventListener('change', _handleAppStateChange);
  },
};