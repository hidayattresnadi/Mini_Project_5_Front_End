import { useState } from 'react';
import Button from '../elements/button';
import LabeledTextArea from '../widgets/labeledTextArea';
import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';
import Container from '../elements/container';

const DeactivateEmployeeForm = ({ deactivateEmployee, editingEmployee, id, errors, shouldNavigate, setShouldNavigate }) => {

    const [formData, setFormData] = useState({
        empNo: id,
        deleteReasoning: ''
    });

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await deactivateEmployee(formData);
        if (Object.keys(result).length === 0) {
            setFormData({
                employeeId: '',
                deleteReasoning: '',
            });
            setShouldNavigate(!shouldNavigate);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Container className='mb-5'>
                    <Label className='me-3 fs-4'>Deactivate Employee: </Label>
                    <select className='me-3 form-select mt-3 fs-4'>
                        <SelectOption >{editingEmployee.employeeName}</SelectOption>
                    </select>
                </Container>

                <LabeledTextArea
                    label="Delete Reasoning"
                    id="deleteReasoning"
                    value={formData.deleteReasoning}
                    onChange={handleInputChange}
                    placeholder="Enter delete Reasoning"
                    className={'form-control fs-5'}
                    labelClassname={'fs-4 mb-4'}
                />
                {errors?.deleteReasoning && <h6 className="text-start">{errors.deleteReasoning}</h6>}


                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default DeactivateEmployeeForm;
