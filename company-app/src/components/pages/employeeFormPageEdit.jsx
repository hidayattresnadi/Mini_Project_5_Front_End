import FormLayout from '../templates/FormLayout';
import { failedSwal, successSwal, validateEmployee } from '../../helper';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../elements/loading';
import EmployeeService from '../../services/employeeService';
import DepartmentService from '../../services/departmentService';
import EmployeeFormEdit from '../modules/employeeFormEdit';

function EmployeeFormPageEdit({employees, setEmployees, setErrors, setEditingEmployee, setDepartments, editingEmployee, departments, errors }) {
    const { id } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [shouldNavigate, setShouldNavigate] = useState();
    const [errorStatus, setErrorStatus] = useState();

    const updateEmployee = async (employee) => {
        try {
            const listErrors = validateEmployee(employee);
            setErrors(listErrors);

            if (Object.keys(listErrors).length === 0) {
                employee.departmentId = parseInt(employee.departmentId);
                await EmployeeService.update(id, employee)
                successSwal('Employee Edited successfully');
                setEditingEmployee(null);
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

                const employeeResponse = await EmployeeService.get(id);
                setEditingEmployee(employeeResponse.data);

                const EmployeeResponse = await EmployeeService.getAll();
                setEmployees(EmployeeResponse.data.data);

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
    }, [id, setDepartments, setEditingEmployee,setEmployees, setErrorStatus]);

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/employees');
        }
    }, [shouldNavigate, navigate])

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading employees</p>;

    return (
        <FormLayout title={editingEmployee ? "Form to Update Employee" : "Form to Add Employee"}>
            <EmployeeFormEdit
                departments={departments}
                updateEmployee={updateEmployee}
                editingEmployee={editingEmployee}
                errors={errors}
                shouldNavigate={shouldNavigate}
                setShouldNavigate={setShouldNavigate}
                employees={employees}
            />
        </FormLayout>
    )
}

export default EmployeeFormPageEdit;