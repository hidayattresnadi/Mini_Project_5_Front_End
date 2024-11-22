import { useState } from 'react';
import InputField from '../widgets/inputField';
import Button from '../elements/button';
import RadioGroup from './radioGroup';
import LabeledTextArea from '../widgets/labeledTextArea';
import SelectField from '../widgets/selectField';

const EmployeeForm = ({ addEmployee, departments, errors, shouldNavigate, setShouldNavigate, employees }) => {
    const [formData, setFormData] = useState({
        employeeName: '',
        ssn: '',
        address: '',
        sallary: '',
        birthDate: '',
        departmentId: '',
        employmentType: '',
        level: '',
        phoneNumber: '',
        emailAddress: '',
        jobPosition: '',
        superVisorId: '',
        sex:'',
        dependents: []
    });

    // Tambahkan dependent baru
    const handleAddDependent = () => {
        setFormData({
            ...formData,
            dependents: [
                ...formData.dependents,
                { name: '', sex: '', birthDate: '', relations: '' }, // Template dependent
            ],
        });
    };

    // Hapus dependent
    const handleRemoveDependent = (index) => {
        const updatedDependents = [...formData.dependents];
        updatedDependents.splice(index, 1);
        setFormData({ ...formData, dependents: updatedDependents });
    };

    // Handle perubahan dependent
    const handleDependentChange = (index, field, value) => {
        const updatedDependents = [...formData.dependents];
        updatedDependents[index][field] = value;
        setFormData({ ...formData, dependents: updatedDependents });
    };

    const handleInputChange = (e) => {
        const { id, name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [type === "radio" ? name : id]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await addEmployee(formData);
        if (Object.keys(result).length === 0) {
            setFormData({
                employeeName: '',
                ssn: '',
                address: '',
                sallary: '',
                birthDate: '',
                departmentId: '',
                employmentType: '',
                level: '',
                phoneNumber: '',
                emailAddress: '',
                jobPosition: '',
                superVisorId: '',
                sex:'',
                dependents: []
            })
            setShouldNavigate(!shouldNavigate)
        }

    };

    const options = [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" }
    ];

    return (
        <>
            <form onSubmit={handleSubmit} className="row">
                <div className="col-md-6">
                    <InputField
                        label="Employee Name"
                        type="text"
                        id="employeeName"
                        value={formData.employeeName}
                        onChange={handleInputChange}
                    />
                    {errors?.employeeName && <h6 className="text-start">{errors.employeeName}</h6>}

                    <InputField
                        label="SSN"
                        type="text"
                        id="ssn"
                        value={formData.ssn}
                        onChange={handleInputChange}
                    />
                    {errors?.ssn && <h6 className="text-start">{errors.ssn}</h6>}

                    <InputField
                        label="Salary"
                        type="number"
                        id="sallary"
                        value={formData.sallary}
                        onChange={handleInputChange}
                    />
                    {errors?.sallary && <h6 className="text-start">{errors.sallary}</h6>}

                    <InputField
                        label="Date of Birth"
                        type="date"
                        id="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                    />
                    {errors?.birthDate && <h6 className="text-start">{errors.birthDate}</h6>}

                    <LabeledTextArea
                        label="Address"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                    />
                    {errors?.address && <h6 className="text-start">{errors.address}</h6>}
                </div>

                <div className="col-md-6">
                    <SelectField
                        label="Select Department"
                        id="departmentId"
                        options={departments}
                        value={formData.departmentId}
                        labelKey={["departmentName"]}
                        valueKey={"departmentID"}
                        optionTitle={"Choose Department"}
                        onChange={(e) => handleInputChange(e, "departmentId")}
                        className="form-select"
                    />
                    {errors?.departmentId && <h6 className="text-start">{errors.departmentId}</h6>}

                    <InputField
                        label="Employment Type"
                        type="text"
                        id="employmentType"
                        value={formData.employmentType}
                        onChange={handleInputChange}
                    />
                    {errors?.employmentType && <h6 className="text-start">{errors.employmentType}</h6>}

                    <InputField
                        label="Level"
                        type="number"
                        id="level"
                        value={formData.level}
                        onChange={handleInputChange}
                    />
                    {errors?.level && <h6 className="text-start">{errors.level}</h6>}

                    <InputField
                        label="Phone Number"
                        type="text"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    {errors?.phoneNumber && <h6 className="text-start">{errors.phoneNumber}</h6>}

                    <InputField
                        label="Email Address"
                        type="text"
                        id="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                    />
                    {errors?.emailAddress && <h6 className="text-start">{errors.emailAddress}</h6>}

                    <InputField
                        label="Job Position"
                        type="text"
                        id="jobPosition"
                        value={formData.jobPosition}
                        onChange={handleInputChange}
                    />
                    {errors?.jobPosition && <h6 className="text-start">{errors.jobPosition}</h6>}
                </div>

                <div className="col-12 mt-3">
                    {/* <InputField
                        label="Supervisor Id"
                        type="number"
                        id="superVisorId"
                        value={formData.superVisorId}
                        onChange={handleInputChange}
                    /> */}
                    <SelectField
                    label="Select Supervisor"
                    id="superVisorId"
                    options={employees}
                    value={formData.superVisorId}
                    labelKey={["employeeName"]}
                    valueKey={'empNo'}
                    optionTitle={'Choose Supervisor'}
                    onChange={(e) => handleInputChange(e, 'superVisorId')}
                    className="form-select"
                />
                    <RadioGroup
                        options={options}
                        name="sex"
                        selectedValue={formData.sex}
                        onChange={handleInputChange}
                    />
                    {errors?.sex && <h6 className="text-start">{errors.sex}</h6>}
                </div>

                {/* Section for Dependents */}
                <div className="col-12 mt-3">
                    <h4>Dependents</h4>
                    {formData.dependents.map((dependent, index) => (
                        <div key={index} className="dependent-form mb-3">
                            <InputField
                                label="Dependent Name"
                                type="text"
                                value={dependent.name}
                                onChange={(e) =>
                                    handleDependentChange(index, 'name', e.target.value)
                                }
                            />
                            <InputField
                                label="Sex"
                                type="text"
                                value={dependent.sex}
                                onChange={(e) =>
                                    handleDependentChange(index, 'sex', e.target.value)
                                }
                            />
                            <InputField
                                label="Date of Birth"
                                type="date"
                                value={dependent.birthDate}
                                onChange={(e) =>
                                    handleDependentChange(index, 'birthDate', e.target.value)
                                }
                            />
                            <InputField
                                label="Relation"
                                type="text"
                                value={dependent.relations}
                                onChange={(e) =>
                                    handleDependentChange(index, 'relations', e.target.value)
                                }
                            />
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleRemoveDependent(index)}
                            >
                                Remove Dependent
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAddDependent}
                    >
                        Add Dependent
                    </button>
                </div>

                <div className="col-12 mt-3">
                    <Button type="submit" className="btn btn-primary mt-3 w-100">
                        Submit
                    </Button>
                </div>
            </form>


        </>
    );
};

export default EmployeeForm;
