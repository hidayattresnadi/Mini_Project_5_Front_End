import DepartmentDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const DepartmentDetailCard = ({ detailDepartment}) => {
    return (
        <>
            <Container className="book-details">
                <DepartmentDetail label="Department Name" value={detailDepartment.name} />
                <DepartmentDetail label="Manager Name" value={detailDepartment.managerName} />
                <DepartmentDetail label="Number" value={detailDepartment.number} />
                <DepartmentDetail label="Locations" value={detailDepartment.locations?.map(loc => loc).join(', ')} />
            </Container>
        </>

    );
};

export default DepartmentDetailCard;
