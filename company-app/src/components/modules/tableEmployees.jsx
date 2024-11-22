import TableHeader from '../widgets/tableHeader';
import TableEmployeeRow from '../widgets/tableEmployeeRow';
import { useNavigate } from 'react-router-dom';


const TableEmployees = ({ employees, columns, onDelete }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {employees.map((employee) => (
                        <TableEmployeeRow
                            key={employee.empNo}
                            employee={employee}
                            onEdit={() => {
                                navigate(`/employees/${employee.empNo}`)
                            }}
                            onDelete={() => onDelete(employee.empNo)}
                            onDetail={() => {
                                navigate(`/employees/detail/${employee.empNo}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableEmployees;
