import pushTokenService from '../services/pushTokenService';

const { Expo } = require('expo-server-sdk');

const expo = new Expo();

export async function sendPushNotifications({ title, body, role }) {
  try {
    const tokens = pushTokenService.getTokens({ role });
    const messages = tokens.map((token) => ({
      to: token,
      sound: 'default',
      title,
      body,
    }));
    expo.sendPushNotificationsAsync(messages);
  } catch (error) {
    console.log(error);
  }
}
