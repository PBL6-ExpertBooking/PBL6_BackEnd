import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const get_random = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const generateUsers = async (start, end) => {
  const middle_names = ["Văn", "Hữu", "Thị", "Đức"];
  const first_names = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const last_names = [
    "Nguyễn",
    "Phạm",
    "Bùi",
    "Trần",
    "Lê",
    "Phan",
    "Hoàng",
    "Huỳnh",
    "Hồ",
    "Dương",
    "Đỗ",
    "Ngô",
    "Đinh",
  ];
  for (let i = start; i <= end; i++) {
    await User.create({
      first_name: `${get_random(middle_names)} ${get_random(first_names)}`,
      last_name: get_random(last_names),
      gender: get_random([true, false]),
      phone: `0${Math.floor(Math.random() * 900000000) + 100000000}`,
      address:
        "K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng",
      email: `user${i}@test.com`,
      username: `testuser${i}`,
      encrypted_password: await bcrypt.hash(
        "123123123",
        parseInt(process.env.BCRYPT_SALT)
      ),
      isRestricted: get_random([true, false]),
      isConfirmed: get_random([true, false]),
    });
  }
  console.log(`generated ${end - start + 1} users`);
};

export default {
  generateUsers,
};
