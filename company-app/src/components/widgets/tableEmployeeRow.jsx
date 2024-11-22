import TableCell from '../elements/tableCell';
import Button from '../elements/button';
import Icon from '../elements/icon';
import { formatDateWithOrdinal } from '../../helper';

const TableEmployeeRow = ({ employee, onEdit, onDelete, onDetail }) => (
    <tr>
        <TableCell>{employee.employeeName}</TableCell>
        <TableCell>{employee.department}</TableCell>
        <TableCell>{employee.jobPosition}</TableCell>
        <TableCell>{employee.level}</TableCell>
        <TableCell>{employee.employmentType}</TableCell>
        <TableCell>{formatDateWithOrdinal(employee.lastUpdatedDate)}</TableCell>
        <TableCell>
            <Button onClick={onEdit} className="btn btn-primary" ariaLabel="Edit Employee">
                <Icon className="fas fa-pencil-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDelete} className="btn btn-danger" ariaLabel="Delete Employee">
                <Icon className="fas fa-trash-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail Employee">
                <Icon className="fas fa-eye" />
            </Button>
        </TableCell>
    </tr>
);

export default TableEmployeeRow;