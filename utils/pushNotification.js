import pushTokenService from "../services/pushTokenService";
import { Expo } from "expo-server-sdk";

const expo = new Expo();

export async function sendPushNotifications({ title, body, user_ids }) {
  try {
    const tokens = await pushTokenService.getTokensByUserIds({ user_ids });
    const messages = tokens.map((token) => ({
      to: token,
      sound: "default",
      title,
      body,
    }));
    expo.sendPushNotificationsAsync(messages);
  } catch (error) {
    console.log(error);
  }
}
