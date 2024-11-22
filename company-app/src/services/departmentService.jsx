import apiClient from "../axiosConfig.jsx";

const getAll = async (params) => {
    return await apiClient.get("/Department", { params });
};

const get = async (id) => {
    return await apiClient.get(`/Department/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Department", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Department/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Department/${id}`);
};

const DepartmentService = {
    getAll,
    get,
    create,
    update,
    remove
};
    
export default DepartmentService;