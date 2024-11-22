import TableLayout from '../templates/TableLayout';
import LoadingSpinner from '../elements/loading';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import DependentService from '../../services/dependentService';
import TableDependents from '../modules/tableDependents';

function DependentsPage({ columns = { columns } }) {

    const fetchDependents = async () => {
        try {

            let response = await DependentService.getAll();
            return response.data;

        } catch (error) {
            throw new Error(error, 'Error fetching employees');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['dependents'],
        queryFn: () => fetchDependents(),
        placeholderData: keepPreviousData,
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error loading departments</p>;

    return (
        <>
            <TableLayout title="List of Dependents" >
                <TableDependents columns={columns} dependents={data} />
            </TableLayout>
        </>
    )
}

export default DependentsPage;