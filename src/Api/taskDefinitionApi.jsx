import axiosInstance from "./axiosInstance"

const taskDefinitionApi = {
    CreateTaskDefinition: (data) => axiosInstance.post("TaskDefinition/CreateTaskDefinition", data),
    UpdateTaskDefinition: (taskDefinitionId, data) => axiosInstance.put(`TaskDefinition/UpdateTaskDefinition/${taskDefinitionId}`, data),
    DeleteTask: (taskDefinitionId) => axiosInstance.delete(`TaskDefinition/DeleteTask/${taskDefinitionId}`),
    AssignTask: (taskId, memberId) => axiosInstance.put(`TaskDefinition/AssignTask/${taskId}/${memberId}`),
    RemoveMember: (taskDefinitionId, memberId) => axiosInstance.delete(`TaskDefinition/RemoveMember/${taskDefinitionId}/${memberId}`),
    GetTaskDefinitionById: (taskDefinitionId) => axiosInstance.get("TaskDefinition/GetTaskDefinitionById", { params: { taskDefinitionId } }),
    GetAllTaskDefinition: (taskHeadId) => axiosInstance.get("TaskDefinition/GetAllTaskDefinition", { params: { taskHeadId } }),
}

export default taskDefinitionApi;
