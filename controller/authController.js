import { createNewUser } from "../services/authService.js";

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, username, password } = req.body;
    const newUser = await createNewUser({
      first_name,
      last_name,
      email,
      username,
      password,
    });
    res.json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

export default { register };
