
import axiosInstance from "./axiosInstance"

const BASE_URL = "http://localhost:8090";

class BankService{

    login(userInfo){
        return axiosInstance.post(BASE_URL + "/auth/login", userInfo)
    }

    register(userInfo){
        return axiosInstance.post(BASE_URL + "/auth/register", userInfo)
    }
    
    updateUserInfo(userInfo, userId){
        return axiosInstance.patch(BASE_URL + "/auth/updateUserInfo/"+ userId ,userInfo)
    }

    updatePassword(userInfo, userId){
        return axiosInstance.patch(BASE_URL + "/auth/updatePassword/"+ userId, userInfo)
    }

    getAllUsers(){
        return axiosInstance.get(BASE_URL + "/auth/admin/allusers")
    }

    deleteUser(userId){
        return axiosInstance.delete(BASE_URL + "/auth/admin/delete/" + userId);
    }

}

export default new BankService();