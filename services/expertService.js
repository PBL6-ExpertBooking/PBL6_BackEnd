import httpStatus from "http-status";
import { ExpertInfo, Certificate, User } from "../models/index.js";
import ApiError from "../utils/ApiError.js";

const fetchExpertsPagination = async (page = 1, limit = 10, isFull = false) => {
  let select = "first_name last_name gender photo_url";
  if (isFull) {
    select += "phone address DoB email username role isRestricted isConfirmed";
  }
  const pagination = await ExpertInfo.paginate(
    {},
    {
      populate: [
        {
          path: "user",
          select: select,
        },
      ],
      page,
      limit,
      lean: true,
      customLabels: {
        docs: "experts",
      },
    }
  );
  return pagination;
};

const fetchExpertById = async (expert_id, isFull = false) => {
  let select = "first_name last_name gender photo_url";
  if (isFull) {
    select += "phone address DoB email username role isRestricted isConfirmed";
  }
  const expert = await ExpertInfo.findById(expert_id)
    .populate("user", select)
    .populate({
      path: "certificates",
      populate: {
        path: "major",
      },
    })
    .lean();
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }
  return expert;
};

const fetchExpertByUserId = async (user_id, isFull) => {
  let select = "first_name last_name gender photo_url";
  if (isFull) {
    select += "phone address DoB email username role isRestricted isConfirmed";
  }
  const expert = await ExpertInfo.findOne({ user: user_id })
    .populate("user", select)
    .populate({
      path: "certificates",
      populate: {
        path: "major",
      },
    })
    .lean();
  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }
  return expert;
};

const fetchCertificatesByExpertId = async (expert_id) => {
  const expert = await ExpertInfo.findById(expert_id, {
    select: "certificates",
  })
    .populate({
      path: "certificates",
      populate: {
        path: "major",
      },
    })
    .lean();
  return expert.certificates;
};

const fetchUnverifiedCertificatesByExpertId = async (expert_id) => {
  const expert = await ExpertInfo.findById(expert_id)
    .populate({ path: "certificates", match: { isVerified: false } })
    .lean();
  return expert.certificates;
};

const fetchVerifiedMajorsByExpertId = async (expert_id) => {
  const expert = await ExpertInfo.findById(expert_id, {
    select: "certificates",
  }).populate({
    path: "certificates",
    populate: {
      path: "major",
    },
    match: { isVerified: true },
  });

  if (!expert) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Expert not found");
  }

  const majors = [
    ...new Map(
      expert.certificates.map((certificate) => [
        certificate.major._id,
        certificate.major,
      ])
    ).values(),
  ];
  return majors;
};

const fetchExpertsHavingUnverifiedCert = async (page = 1, limit = 10) => {
  const aggregate = ExpertInfo.aggregate([
    {
      $lookup: {
        from: Certificate.collection.name,
        localField: "certificates",
        foreignField: "_id",
        as: "certificates",
      },
    },
    {
      $unwind: "$certificates",
    },
    {
      $match: { "certificates.isVerified": false },
    },
    {
      $group: {
        _id: "$_id",
        user: { $first: "$user" },
        descriptions: { $first: "$descriptions" },
        average_rating: { $first: "$average_rating" },
        rating_count: { $first: "$rating_count" },
        certificates: { $push: "$certificates" },
      },
    },
    {
      $lookup: {
        from: User.collection.name,
        localField: "user",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 1,
              first_name: 1,
              last_name: 1,
              gender: 1,
              phone: 1,
              address: 1,
              photo_url: 1,
              DoB: 1,
              email: 1,
            },
          },
        ],
        as: "user",
      },
    },
  ]);
  const pagination = await ExpertInfo.aggregatePaginate(aggregate, {
    page,
    limit,
    lean: true,
    customLabels: {
      docs: "experts",
    },
  });
  return pagination;
};

export default {
  fetchExpertsPagination,
  fetchExpertById,
  fetchCertificatesByExpertId,
  fetchExpertByUserId,
  fetchUnverifiedCertificatesByExpertId,
  fetchVerifiedMajorsByExpertId,
  fetchExpertsHavingUnverifiedCert,
};
