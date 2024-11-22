import { useState, useEffect } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import SelectField from '../widgets/selectField';

const ProjectForm = ({ addProject, departments, updateProject, editingProject, errors, shouldNavigate,setShouldNavigate }) => {
    const [formData, setFormData] = useState({
        projName: '',
        deptNo: ''
    });

    useEffect(() => {
        if (editingProject) {
            setFormData({
                projName: editingProject.projName,
                deptNo: editingProject.deptNo,
            });
        } else {
            setFormData({
                projName: '',
                deptNo: ''
            });
        }
    }, [editingProject]);

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingProject) {
            const result = await updateProject(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    projName: '',
                    deptNo: ''
                });
                setShouldNavigate(!shouldNavigate)
            }
        } else {
            const result = await addProject(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    projName: '',
                    deptNo: ''
                });
                setShouldNavigate(!shouldNavigate)
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Project Name"
                    type="text"
                    id="projName"
                    value={formData.projName}
                    onChange={handleInputChange}
                />
                {errors?.projName ? <h6 className='text-start'>{errors.projName}</h6> : ''}
                <SelectField
                    label="Select Department"
                    id="deptNo"
                    options={departments}
                    value={formData.deptNo}
                    labelKey={ ["deptName"]}
                    valueKey={'deptNo'}
                    optionTitle={'Choose Department'}
                    onChange={(e) => handleInputChange(e,'deptNo')}
                    className="form-select"
                />
                {errors?.deptNo ? <h6 className='text-start'>{errors.deptNo}</h6> : ''}

                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default ProjectForm;
