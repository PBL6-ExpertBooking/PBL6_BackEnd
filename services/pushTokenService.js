import { roles } from '../config/constant';

const saveToken = ({ token, role }) => {
  //lưu push-token vào db. có tạo model cho push token r
};

const getTokens = ({ role }) => {
  //lấy token theo role muốn gửi thông báo
  return [
    { token: 'ExponentPushToken[xbrQ21DZQCgvFtZkj2vkNj]', role: roles.USER },
  ];
};

export default {
  saveToken,
  getTokens,
};
