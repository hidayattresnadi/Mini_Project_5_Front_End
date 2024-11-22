import { useNavigate, useParams } from 'react-router-dom';
import EmployeeDetailCard from '../modules/employeeCard';
import DetailLayout from '../templates/detailLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import EmployeeService from '../../services/employeeService';
import Container from '../elements/container';
import Button from '../elements/button';

function EmployeeDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState();
    useEffect(() => {
        const loadData = async () => {
            try {
                const EmployeeResponse = await EmployeeService.get(id);
                setEmployeeData(EmployeeResponse.data);
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
    }, [id, setEmployeeData]);

    const onClick = () => navigate(`/employees/deactivate/${id}`)

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <DetailLayout title="Employee Details">
                <EmployeeDetailCard detailEmployee={employeeData} />
                <Container className="d-flex justify-content-center mt-4">
                    <Button className='btn btn-primary' onClick={onClick} style={{ width: "500px", padding: "12px 24px", fontSize: "18px" }}>
                        Deactivate Employee
                    </Button>
                </Container>
            </DetailLayout>
        </>
    )
}

export default EmployeeDetailPage;