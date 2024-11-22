import TableHeader from '../widgets/tableHeader';
import { useNavigate } from 'react-router-dom';
import TableProjectRow from '../widgets/tableProjectRow';


const TableProjects = ({ projects, onDelete, columns }) => {
    const navigate = useNavigate();
    return (
        <>
            <table className="table table-bordered text-center">
                <TableHeader columns={columns} />
                <tbody>
                    {projects.map((project) => (
                        <TableProjectRow
                            key={project.projNo}
                            project={project}
                            onEdit={() => {
                                navigate(`/projects/${project.projNo}`)
                            }}
                            onDelete={() => onDelete(project.projNo)}
                            onDetail={() => {
                                navigate(`/projects/detail/${project.projNo}`)
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </>

    )

};

export default TableProjects;
