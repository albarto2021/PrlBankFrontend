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
      BASE_URL + "/users/updateUserInfo/" + userId,
      userInfo
    );
  }

  updateSingleUserInfo(userInfo) {
    return axiosInstance.patch(
      BASE_URL + "/admin/updateSingleUserInfo",
      userInfo
    );
  }

  updatePassword(userInfo, userId) {
    return axiosInstance.patch(
      BASE_URL + "/users/updatePassword/" + userId,
      userInfo
    );
  }

  getAllTransactions() {
    return axiosInstance.get(BASE_URL + "/accounts/transactions");
  }

  getAllUsers() {
    return axiosInstance.get(BASE_URL + "/admin/allusers");
  }

  getAllAccounts() {
    return axiosInstance.get(BASE_URL + "/admin/edituser");
  }

  getSingleUser(userId) {
    return axiosInstance.get(BASE_URL + "/admin/singleUserDetails/" + userId);
  }

  deleteUser(userId) {
    return axiosInstance.delete(BASE_URL + "/admin/delete/" + userId);
  }

  deleteAccount(accountId) {
    return axiosInstance.delete(BASE_URL + "/accounts/delete/" + accountId);
  }
  moneyTransfer(accountInfo, userId) {
    return axiosInstance.post(
      BASE_URL + "/accounts/moneyTransfer/" + userId,
      accountInfo
    );
  }
  createAccount(accountInfo) {
    return axiosInstance.post(
      BASE_URL + "/accounts/createAccount",
      accountInfo
    );
  }

  deposit(transactionInfo) {
    return axiosInstance.post(BASE_URL + "/accounts/deposit", transactionInfo);
  }

  withdraw(transactionInfo) {
    return axiosInstance.post(BASE_URL + "/accounts/withdraw", transactionInfo);
  }
}

export default new BankService();
