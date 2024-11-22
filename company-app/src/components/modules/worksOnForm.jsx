import { useState, useEffect } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import SelectField from '../widgets/selectField';

const WorksOnForm = ({ shouldNavigate, setShouldNavigate, addWorksOn, employees, projects, updateWorksOn, editingWorksOn, errors }) => {
    const [formData, setFormData] = useState({
        projNo: '',
        empNo: '',
        hoursWorked: '',
        dateWorked: ''
    });

    useEffect(() => {
        if (editingWorksOn) {
            setFormData({
                projNo: editingWorksOn.projNo,
                empNo: editingWorksOn.empNo,
                hoursWorked: editingWorksOn.hoursworked,
                dateWorked: editingWorksOn.dateWorked
            });
        } else {
            setFormData({
                projNo: '',
                empNo: '',
                hoursWorked: '',
                dateWorked: ''
            });
        }
    }, [editingWorksOn]);

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editingWorksOn) {
            const result = await updateWorksOn(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    projNo: '',
                    empNo: '',
                    hoursWorked: '',
                    dateWorked: ''
                });
                setShouldNavigate(!shouldNavigate)
            }
        } else {
            const result = await addWorksOn(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    projNo: '',
                    empNo: '',
                    hoursWorked: '',
                    dateWorked: ''
                });
                setShouldNavigate(!shouldNavigate)
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Select Project"
                    id="projNo"
                    options={projects}
                    value={formData.projNo}
                    labelKey={["projName"]}
                    valueKey={'projNo'}
                    optionTitle={'Choose Project'}
                    onChange={(e) => handleInputChange(e, 'projNo')}
                    className="form-select"
                />
                {errors?.projNo ? <h6 className='text-start'>{errors.projNo}</h6> : ''}
                <SelectField
                    label="Select Employee"
                    id="empNo"
                    options={employees}
                    value={formData.empNo}
                    labelKey={["fname","lname"]}
                    valueKey={'empNo'}
                    optionTitle={'Choose Employee'}
                    onChange={(e) => handleInputChange(e, 'empNo')}
                    className="form-select"
                />
                {errors?.empNo ? <h6 className='text-start'>{errors.empNo}</h6> : ''}
                <InputField
                    label="Hours Worked"
                    type="number"
                    id="hoursWorked"
                    value={formData.hoursWorked}
                    onChange={handleInputChange}
                />
                {errors?.hoursWorked ? <h6 className='text-start'>{errors.hoursWorked}</h6> : ''}
                <InputField
                    label="Date Worked"
                    type="date"
                    id="dateWorked"
                    value={formData.dateWorked}
                    onChange={handleInputChange}
                />
                {errors?.dateWorked ? <h6 className='text-start'>{errors.dateWorked}</h6> : ''}

                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default WorksOnForm;
