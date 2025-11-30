import axiosInstance from "./axiosInstance"

export const loginApi=async(data) =>{
    const res=await axiosInstance.post("/Auth/login",data);
    return res.data;

}

export const RegisterLeaderApi=async(formData)=>{
    const res=await axiosInstance.post("/Auth/RegisterTeamLead",formData,{
        headers:{
            "content-type":"multipart/form-data",
                },
    });
    return res.data;
}

export const RegisterMemberApi=async(formData)=>{
    const res=await axiosInstance.post("/Auth/RegisterMember",formData,{
        headers:{
            "Content-Type":"multipart/form-data",
        },
    });
    return res.data;
}

export const ForgetPasswordApi=async(data)=>{
    const res=await axiosInstance.post("/Auth/ForgetPassword",data);
    return res.data;
}

export const ResetPasswordApi=async(data)=>{
    const res=await axiosInstance.post("/Auth/ResetPassword",data);
    return res.data;
}

export const refreshTokenApi=async(token)=>{
    const res=await axiosInstance.post("/Auth/RefreshToken",token,{
       headers:{
        "Content-Type":"application/json",
       },
    });
    return res.data;
}

export const logoutApi=async(token)=>{
    const res=await axiosInstance.post("/Auth/Logout",token,{
       headers:{
        "Content-Type":"application/json",},
    });
    return res.data;
}