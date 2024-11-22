import ProjectDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const ProjectDetailCard = ({ detailProject}) => {
    return (
        <>
            <Container className="book-details">
                <ProjectDetail label="Id" value={detailProject.projNo} />
                <ProjectDetail label="Project Name" value={detailProject.projectName} />
                <ProjectDetail label="Department" value={detailProject.departmentName} />
            </Container>
        </>

    );
};

export default ProjectDetailCard;
