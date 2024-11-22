import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../elements/loading';
import ProjectForm from '../modules/projectForm';
import FormLayout from '../templates/FormLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { failedSwal, successSwal, validateProject } from '../../helper';

function ProjectFormPage({ setErrors, departments, editingProject, setEditingProject, errors, setDepartments }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const [shouldNavigate, setShouldNavigate] = useState();

    const addProject = async (project) => {
        try {
            const listErrors = validateProject(project)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                await axios.post('http://localhost:5227/Project', project)
                successSwal('Project Added successfully');
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data
        }
    };

    const updateProject = async (project) => {
        try {
            const listErrors = validateProject(project);
            setErrors(listErrors);

            if (Object.keys(listErrors).length === 0) {
                await axios.put(`http://localhost:5227/Project/${id}`, project)
                successSwal('Project Edited successfully');
                setEditingProject(null);
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data;
        }

    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const DepartmentResponse = await axios.get(`http://localhost:5227/Department/select`);
                setDepartments(DepartmentResponse.data);
                if (!id) {
                    setLoading(false);
                    return;
                }
                const projectResponse = await axios.get(`http://localhost:5227/Project/${id}`);
                setEditingProject(projectResponse.data);
            } catch (error) {
                setErrorStatus(true);
                console.log(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        loadData();
    }, [id, setDepartments, setEditingProject, setErrorStatus]);

    useEffect(()=>{
        if (shouldNavigate) {
            navigate('/projects');
        }
    }, [shouldNavigate, navigate])

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading projects</p>;
    return (
        <FormLayout title={editingProject ? "Form to Update Project" : "Form to Add Project"}>
            <ProjectForm 
                addProject={addProject}
                departments={departments}  
                updateProject={updateProject} 
                editingProject={editingProject}  
                errors={errors}
                shouldNavigate={shouldNavigate}
                setShouldNavigate={setShouldNavigate} 
            />
        </FormLayout>
    )
}

export default ProjectFormPage;