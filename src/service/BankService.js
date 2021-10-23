import axiosInstance from "./axiosInstance";

const BASE_URL = "http://localhost:8090";

class BankService {
  login(userInfo) {
    return axiosInstance.post(BASE_URL + "/auth/login", userInfo);
  }

  register(userInfo) {
    return axiosInstance.post(BASE_URL + "/auth/register", userInfo);
  }

  updateUserInfo(userInfo, userId) {
    return axiosInstance.patch(
      BASE_URL + "/auth/updateUserInfo/" + userId,
      userInfo
    );
  }

  updateSingleUserInfo(userInfo) {
    return axiosInstance.patch(
      BASE_URL + "/auth/admin/updateSingleUserInfo",
      userInfo
    );
  }

  updatePassword(userInfo, userId) {
    return axiosInstance.patch(
      BASE_URL + "/auth/updatePassword/" + userId,
      userInfo
    );
  }

  getAllUsers() {
    return axiosInstance.get(BASE_URL + "/auth/admin/allusers");
  }

  getAllAccounts() {
    return axiosInstance.get(BASE_URL + "/auth/admin/edituser");
  }

  getSingleUser(userId) {
    return axiosInstance.get(
      BASE_URL + "/auth/admin/singleUserDetails/" + userId
    );
  }

  deleteUser(userId) {
    return axiosInstance.delete(BASE_URL + "/auth/admin/delete/" + userId);
  }

  deleteAccount(accountId) {
    return axiosInstance.delete(
      BASE_URL + "/auth/accounts/delete/" + accountId
    );
  }
  moneyTransfer(accountInfo, userId) {
    return axiosInstance.post(
      BASE_URL + "/auth/moneyTransfer/" + userId,
      accountInfo
    );
  }
  createAccount(accountInfo, userId) {
    return axiosInstance.post(
      BASE_URL + "/auth/createAccount/" + userId,
      accountInfo
    );
  }
}

export default new BankService();
