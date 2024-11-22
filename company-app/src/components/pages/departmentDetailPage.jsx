import { useParams } from 'react-router-dom';
import DetailLayout from '../templates/detailLayout';
import DepartmentDetailCard from '../modules/departmentCard';
import EmployeesPage from './employeesPage';
import LoadingSpinner from '../elements/loading';
import { useEffect, useState } from 'react';
import DepartmentService from '../../services/departmentService';

function DepartmentDetailPage({ setEmployees, employees, columnsTableEmployees, refresh, setRefresh }) {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState();
    const [departmentName, setDepartmentName] = useState();

    useEffect(() => {
        const loadData = async () => {
            try {
                const DepartmentResponse = await DepartmentService.get(id);
                setDepartmentData(DepartmentResponse.data);
                setDepartmentName(DepartmentResponse.data.name);
            } catch (error) {
                setError(true);
                console.log(error);
            }
            finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }
        };
        loadData();
    }, [id, setDepartmentData]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <>
            <DetailLayout title={'Department Details'}>
                <DepartmentDetailCard detailDepartment={departmentData} />
            </DetailLayout>
            <EmployeesPage
                employees={employees}
                setEmployees={setEmployees}
                columns={columnsTableEmployees}
                refresh={refresh}
                setRefresh={setRefresh}
                departmentName ={departmentName}
            />
        </>


    )
}

export default DepartmentDetailPage;