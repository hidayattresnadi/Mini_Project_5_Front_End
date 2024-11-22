import LoadingSpinner from '../elements/loading';
import FormLayout from '../templates/FormLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { failedSwal, successSwal } from '../../helper';
import EmployeeService from '../../services/employeeService';
import DeactivateEmployeeForm from '../modules/deactivateEmployeeForm';

function DeactivateEmployeeFormPage({ setErrors, setEditingEmployee, editingEmployee, errors, }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const [shouldNavigate, setShouldNavigate]=useState();

    const deactivateEmployee = async (deactivateReason) => {
        try {
            const listErrors = {};
            setErrors(listErrors);
            if (Object.keys(listErrors).length === 0) {
                await EmployeeService.deactivateEmployee(deactivateReason.empNo, deactivateReason.deleteReasoning);
                successSwal('Deactivate Employee Successfully');
            }
            return listErrors;

        } catch (error) {
            setErrors(error.response.data)
            failedSwal(error.response.data)
            return error.response.data
        }
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const EmployeeResponse = await EmployeeService.get(id);
                setEditingEmployee(EmployeeResponse.data);
                setLoading(false);
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
    }, [id, setEditingEmployee, setErrorStatus]);

    useEffect(()=>{
        if (shouldNavigate) {
            navigate('/employees');
        }
    }, [shouldNavigate, navigate])

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading employees</p>;

    return (
        <FormLayout title={"Form to Deactivate Employee"}>
            <DeactivateEmployeeForm
                editingEmployee = {editingEmployee}
                id={id}
                deactivateEmployee={deactivateEmployee}
                errors={errors}
                shouldNavigate={shouldNavigate}
                setShouldNavigate={setShouldNavigate}
            />
        </FormLayout>
    )
}

export default DeactivateEmployeeFormPage;