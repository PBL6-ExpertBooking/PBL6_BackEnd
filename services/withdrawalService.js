import httpStatus from "http-status";
import { User, WithdrawalRequest } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const createWithdrawalRequest = async ({ user_id, amount, bank_account }) => {
    const user = User.findById(user_id)

    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    };

    if (user.balance < amount) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Insufficent amount");
    };

    const request = await WithdrawalRequest.create({
        user: user_id,
        amount: amount,
        bank_account: bank_account,
    });

    return request;
}

const fetchWithdrawalRequests = async (page = 1, limit = 10) => {
    const pagination = await WithdrawalRequest.paginate({},
        {
            sort: { createdAt: 1 },
            populate: [
                {
                    path: "user",
                    select: "first_name last_name phone address photo_url DoB email role",
                },
            ],
            page,
            limit,
            lean: true,
            customLabels: {
                docs: "withdrawal_requests",
            },
        })

    return pagination;
}

export default {
    createWithdrawalRequest,
    fetchWithdrawalRequests
}