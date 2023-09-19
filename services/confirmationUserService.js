import { ConfirmationToken, User } from "../models/index.js";
import { fetchUserById, enableUserById } from "./userService.js";
import sendMail from "../utils/sendMail.js";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../utils/APIError.js";
import httpStatus from "http-status";

const createConfirmationTokenAndSendMail = async (userId) => {
  const user = await fetchUserById(userId);

  const confirmationToken = await ConfirmationToken.create({
    user_id: userId,
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
  await enableUserById(confirmationToken.user_id);
  await confirmationToken.updateOne({ confirm_at: Date.now() });
};

export { createConfirmationTokenAndSendMail, enableUserByConfirmationToken };
