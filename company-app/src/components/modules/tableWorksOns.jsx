import TableHeader from '../widgets/tableHeader';
import { useNavigate } from 'react-router-dom';
import TableWorksOnRow from '../widgets/tableWorksOnRow';


const TableWorksOns = ({ worksOns, onDelete, columns }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {worksOns.map((worksOn) => (
                        <TableWorksOnRow
                            key={worksOn.workNo}
                            worksOn={worksOn}
                            onEdit={() => {
                                navigate(`/assignments/${worksOn.workNo}`)
                            }}
                            onDelete={() => onDelete(worksOn.workNo)}
                            onDetail={() => {
                                navigate(`/assignments/${worksOn.empNo}/${worksOn.projNo}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableWorksOns;
