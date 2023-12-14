import { job_request_status, roles, transaction_status, transaction_types } from "../config/constant.js"
import { JobRequest, Major, Review, Transaction, User } from "../models/index.js"

const getStatisticsForAdmin = async () => {

    const [job_request_count,
        job_request_pending_count,
        job_request_processing_count,
        job_request_done_count,
        job_request_canceled_count,
        expert_count,
        user_count,
        major_count,
        reviews,
        total_deposit_amount] =
        await Promise.all([
            JobRequest.count({}),
            JobRequest.count({ status: job_request_status.PENDING }),
            JobRequest.count({ status: job_request_status.PROCESSING }),
            JobRequest.count({ status: job_request_status.DONE }),
            JobRequest.count({ status: job_request_status.CANCELED }),
            User.count({ role: roles.EXPERT }),
            User.count({ role: roles.USER }),
            Major.count({}),
            Review.find({}).sort({ createdAt: -1 }).limit(5).populate([
                {
                    path: "user",
                    select: "first_name last_name photo_url",
                },
                {
                    path: "expert",
                    select: "user",
                    populate: {
                        path: "user",
                        select: "first_name last_name photo_url",
                    },
                },
            ]).lean(),
            getTotalDepositAmount()
        ]);

    return {
        job_request_count,
        job_request_pending_count,
        job_request_processing_count,
        job_request_done_count,
        job_request_canceled_count,
        expert_count,
        user_count,
        major_count,
        total_deposit_amount,
        reviews,
    };
}

const getTotalDepositAmount = async () => {
    const result = await Transaction.aggregate([
        {
            $match: { transaction_type: transaction_types.DEPOSIT, transaction_status: transaction_status.DONE },
        },
        {
            $group: { _id: null, amount: { $sum: "$amount" } },
        }
    ]).exec();

    return result[0].amount;
}

export default {
    getStatisticsForAdmin,
}