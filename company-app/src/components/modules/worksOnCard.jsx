import WorksOnDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const WorksOnDetailCard = ({ detailWorksOn }) => {
    return (
        <>
            <Container className="book-details">
                <WorksOnDetail label="Id" value={detailWorksOn.workNo} />
                <WorksOnDetail label="Project Name" value={detailWorksOn.projectName} />
                <WorksOnDetail label="Employee Name" value={detailWorksOn.employeeName } />
                <WorksOnDetail label="Date Worked" value={detailWorksOn.dateWorked} />
                <WorksOnDetail label="Hours Worked" value={detailWorksOn.hoursWorked} />
            </Container>
        </>

    );
};

export default WorksOnDetailCard;
