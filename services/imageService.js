import cloudinary from "../config/cloudinaryConfig.js";

const uploadImage = async (file) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;
  const res = await cloudinary.uploader.upload(dataURI, {
    resource_type: "auto",
  });
  return { public_id: res.public_id, url: res.secure_url };
};

const deleteImageByPublicId = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
};

export default { uploadImage, deleteImageByPublicId };
