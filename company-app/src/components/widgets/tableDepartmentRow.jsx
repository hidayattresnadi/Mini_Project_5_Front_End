import TableCell from '../elements/tableCell';
import Button from '../elements/button';
import Icon from '../elements/icon';

const TableDepartmentRow = ({ department, onEdit, onDelete, onDetail }) => (
    <tr>
        <TableCell>{department.departmentID}</TableCell>
        <TableCell>{department.departmentName}</TableCell>
        <TableCell>{department ? `${department?.managerName}`: 'Not Available'}</TableCell>
        <TableCell>{department.locationNames?.map(loc => loc).join(', ')}</TableCell>
        <TableCell>
            <Button onClick={onEdit} className="btn btn-primary" ariaLabel="Edit Department">
                <Icon className="fas fa-pencil-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDelete} className="btn btn-danger" ariaLabel="Delete Department">
                <Icon className="fas fa-trash-alt" />
            </Button>
        </TableCell>
        <TableCell>
            <Button onClick={onDetail} className="btn btn-primary" aria-label="Detail Department">
                <Icon className="fas fa-eye" />
            </Button>
        </TableCell>
    </tr>
);

export default TableDepartmentRow;