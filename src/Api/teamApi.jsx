import axiosInstance from "./axiosInstance"

const teamApi = {
    CreateTeam: (data) => axiosInstance.post("TeamLead/CreateTeam", data),
    UpdateTeam: (data) => axiosInstance.patch("TeamLead/UpdateTeam", data),
    RemoveTeam: (teamId) => axiosInstance.delete(`TeamLead/RemoveTeam?TeamId=${teamId}`),
    ApproveOrRejectMember: (data) => axiosInstance.put("TeamLead/ApproveOrRejectMember", data),
    GetTeamMembers: (params) => axiosInstance.get("TeamLead/GetTeamMembers", { params }),
    RemoveMember: (teamId, memberId) => axiosInstance.delete(`TeamLead/RemoveMember/${teamId}/${memberId}`),
    ViewMyTeams: () => axiosInstance.get("TeamLead/ViewMyTeams"),
    ViewTeamById: (teamId) => axiosInstance.get(`TeamLead/ViewTeamById?teamId=${teamId}`),
}

export default teamApi;
