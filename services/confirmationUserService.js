import { ConfirmationToken } from "../models/index.js";
import userService from "./userService.js";
import authService from "./authService.js";
import sendMail from "../utils/sendMail.js";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const createConfirmationTokenAndSendMail = async (user_id) => {
  const user = await userService.fetchUserById(user_id);

  const confirmationToken = await ConfirmationToken.create({
    user_id: user_id,
    token: uuidv4(),
  });

  // send confirmation email async
  sendMail(
    user.email,
    "Confirmation",
    `
    Click the link to confirm your email:
    http://localhost:3000/v1/auth/activate/${confirmationToken.token}
    `,
    async () => {
      await confirmationToken.updateOne({ confirmation_sent_at: Date.now() });
    }
  );
};

const enableUserByConfirmationToken = async (token) => {
  const confirmationToken = await ConfirmationToken.findOne({ token: token });
  if (!confirmationToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid confirmation token");
  }
  await authService.enableUserById(confirmationToken.user_id);
  await confirmationToken.updateOne({ confirm_at: Date.now() });
};

export default {
  createConfirmationTokenAndSendMail,
  enableUserByConfirmationToken,
};
