import { useState, useEffect } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import SelectField from '../widgets/selectField';

const DepartmentForm = ({ addDepartment, updateDepartment, editingDepartment, employees, errors, shouldNavigate, setShouldNavigate }) => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        mgrEmpNo: '',
        locations: []
    });

    const addLocation = () => {
        setFormData({
            ...formData,
            locations: [...formData.locations, { id: Date.now(), name: '' }]
        });
    };

    const removeLocation = (id) => {
        setFormData({
            ...formData,
            locations: formData.locations.filter((location) => location.id !== id)
        });
    };

    const handleLocationChange = (id, value) => {
        setFormData({
            ...formData,
            locations: formData.locations.map((location) =>
                location.id === id ? { ...location, name: value } : location
            )
        });
    };

    useEffect(() => {
        if (editingDepartment) {
            setFormData({
                name: editingDepartment.name,
                number: editingDepartment.number,
                mgrEmpNo: editingDepartment.mgrEmpNo,
                locations: editingDepartment.locations
            });
        } else {
            setFormData({
                name: '',
                number: '',
                mgrEmpNo: '',
                locations: []
            });
        }
    }, [editingDepartment]);

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingDepartment) {
            const result = await updateDepartment(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    name: '',
                    number: '',
                    mgrEmpNo: '',
                    locations: []
                });
                setShouldNavigate(!shouldNavigate);
            }
        } else {
            const result = await addDepartment(formData);
            if (Object.keys(result).length === 0) {
                setFormData({
                    name: '',
                    number: '',
                    mgrEmpNo: '',
                    locations: []
                });
                setShouldNavigate(!shouldNavigate);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Department Name"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                {errors?.name ? <h6 className='text-start'>{errors.name}</h6> : ''}

                <InputField
                    label="Number"
                    type="number"
                    id="number"
                    value={formData.number}
                    onChange={handleInputChange}
                />
                {errors?.number ? <h6 className='text-start'>{errors.number}</h6> : ''}

                <SelectField
                    label="Select Manager"
                    id="mgrEmpNo"
                    options={employees}
                    value={formData.mgrEmpNo}
                    labelKey={["employeeName"]}
                    valueKey={'empNo'}
                    optionTitle={'Choose Manager'}
                    onChange={(e) => handleInputChange(e, 'mgrEmpNo')}
                    className="form-select"
                />
                {errors?.mgrEmpNo ? <h6 className='text-start'>{errors.mgrEmpNo}</h6> : ''}
                {!editingDepartment ?
                    <div>
                        <h4>Locations</h4>
                        {formData.locations.map((location, index) => (
                            <div key={location.id} className="d-flex align-items-center mb-2">
                                <input
                                    type="text"
                                    value={location.name}
                                    onChange={(e) => handleLocationChange(location.id, e.target.value)}
                                    placeholder={`Location ${index + 1}`}
                                    className="form-control"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeLocation(location.id)}
                                    className="btn btn-danger ms-2"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addLocation} className="btn btn-secondary mt-2">
                            Add Location
                        </button>
                    </div>

                    : ''}


                <Button type="submit" className="btn btn-primary mt-3 w-100">
                    Submit
                </Button>
            </form>
        </>
    );
};

export default DepartmentForm;
