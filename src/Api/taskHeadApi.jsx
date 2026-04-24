import axiosInstance from "./axiosInstance"

const taskHeadApi = {
    CreateTask: (data) => axiosInstance.post("TaskHead/CreateTask", data),
    UpdateTask: (taskHeadId, data) => axiosInstance.patch(`TaskHead/UpdateTask/${taskHeadId}`, data),
    DeleteTask: (taskHeadId) => axiosInstance.delete(`TaskHead/DeleteTask/${taskHeadId}`),
    GetAllTaskHead: (params) => axiosInstance.get("TaskHead/GetAllTaskHead", { params }),
    GetTaskById: (taskHeadId) => axiosInstance.get(`TaskHead/GetTaskById/${taskHeadId}`),
}

export default taskHeadApi;
