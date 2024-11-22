import TableHeader from '../widgets/tableHeader';
import TableDependentRow from '../widgets/tableDependentRow';


const TableDependents = ({ dependents,  columns }) => {
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {dependents.map((dependent) => (
                        <TableDependentRow
                            key={dependent.dependentId}
                            dependent={dependent}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableDependents;
