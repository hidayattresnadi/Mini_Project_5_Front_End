import apiClient from "../axiosConfig.jsx";

const getAll = async () => {
    return await apiClient.get("/Dependent");
};

const DependentService = {
    getAll,
};
    
export default DependentService;