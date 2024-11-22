import { useParams } from 'react-router-dom';
import DetailLayout from '../templates/detailLayout';
import WorksOnDetailCard from '../modules/worksOnCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';

function WorksOnDetailPage() {
    const { empNo, projNo } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [worksOnData,setWorksOnData] = useState();
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const worksOnResponse = await axios.get(`http://localhost:5227/WorksOn/detail/${empNo}/${projNo}`);
                setWorksOnData(worksOnResponse.data);
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
    }, [empNo,projNo, setWorksOnData]);

    if (loading) {
        return <LoadingSpinner/>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }
    return (
        <DetailLayout title={'WorksOn Details'}>
            <WorksOnDetailCard
            detailWorksOn={worksOnData}
        />
        </DetailLayout>
    )
}

export default WorksOnDetailPage;