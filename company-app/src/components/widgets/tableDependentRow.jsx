import TableCell from '../elements/tableCell';

const TableDependentRow = ({ dependent }) => (
    <tr>
        <TableCell>{dependent.dependentId}</TableCell>
        <TableCell>{dependent.name}</TableCell>
        <TableCell>{dependent.relations}</TableCell>
    </tr>
);

export default TableDependentRow;