import TableHeader from '../widgets/tableHeader';
import TableDepartmentRow from '../widgets/tableDepartmentRow';
import { useNavigate } from 'react-router-dom';


const TableDepartments = ({ departments, onDelete, columns }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {departments.map((department) => (
                        <TableDepartmentRow
                            key={department.deptNo}
                            department={department}
                            onEdit={() => {
                                navigate(`/departments/${department.departmentID}`)
                            }}
                            onDelete={() => onDelete(department.departmentID)}
                            onDetail={() => {
                                navigate(`/departments/detail/${department.departmentID}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableDepartments;
