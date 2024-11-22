import EmployeeForm from '../modules/employeeForm'
import FormLayout from '../templates/FormLayout';
import { failedSwal, successSwal, validateEmployee } from '../../helper';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../elements/loading';
import EmployeeService from '../../services/employeeService';
import DepartmentService from '../../services/departmentService';

function EmployeeFormPage({ setErrors, setDepartments, departments, employees, setEmployees, errors }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [shouldNavigate, setShouldNavigate] = useState();
    const [errorStatus, setErrorStatus] = useState();

    const addEmployee = async (employee) => {
        try {
            const listErrors = validateEmployee(employee)
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                employee.departmentId = parseInt(employee.departmentId)
                employee.superVisorId = parseInt(employee.departmentId)
                await EmployeeService.create(employee)
                successSwal('Employee Added successfully');
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
                const DepartmentResponse = await DepartmentService.getAll();
                setDepartments(DepartmentResponse.data.data);

                const EmployeeResponse = await EmployeeService.getAll();
                setEmployees(EmployeeResponse.data.data);
                setLoading(false);
                return;
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
    }, [setDepartments, setErrorStatus, setEmployees]);

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/employees');
        }
    }, [shouldNavigate, navigate])

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading employees</p>;

    return (
        <FormLayout title="Form to Add Employee">
            <EmployeeForm
                addEmployee={addEmployee}
                employees= {employees}
                departments={departments}
                errors={errors}
                shouldNavigate={shouldNavigate}
                setShouldNavigate={setShouldNavigate}
            />
        </FormLayout>
    )
}

export default EmployeeFormPage;