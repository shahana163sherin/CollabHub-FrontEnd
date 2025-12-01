import axiosInstance from "./axiosInstance"

const LeaderApi={
    ViewMyProfile:function(){
        return axiosInstance.get("Profile/ViewMyProfile")
    },

    EditProfile:(formData)=>axiosInstance.put("Profile/UpdateProfile",formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

    ChangePassword:(data)=>axiosInstance.put("Profile/ChangePassword",data),
}
export default LeaderApi;