import apiClient from "../axiosConfig.jsx";

const getAll = async (params) => {
    return await apiClient.get("/Employee", { params });
};

const get = async (id) => {
    return await apiClient.get(`/Employee/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Employee", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Employee/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Employee/${id}`);
};

const deactivateEmployee = async (id, data) => {
    return await apiClient.patch(`/Employee/Deactivate_Employee/${id}`,data)
}

const EmployeeService = {
    getAll,
    get,
    create,
    update,
    remove,
    deactivateEmployee
};
    
export default EmployeeService;