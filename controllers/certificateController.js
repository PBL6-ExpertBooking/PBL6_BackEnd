import certificateService from "../services/certificateService.js";

const createCertificate = async (req, res, next) => {
  try {
    const user_id = req.authData.user._id;
    const { name, major_id, descriptions } = req.body;
    const photo = req.file;
    const certificate = await certificateService.createCertificate({
      user_id,
      name,
      major_id,
      descriptions,
      photo,
    });
    res.json({ certificate });
  } catch (error) {
    next(error);
  }
};

export default { createCertificate };
