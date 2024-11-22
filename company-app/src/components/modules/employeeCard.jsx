import EmployeeDetail from "../widgets/dataDetail";
import '../../bookCard.css'
import Container from "../elements/container";

const EmployeeDetailCard = ({ detailEmployee}) => {
    return (
        <>
            <Container className="book-details">
                <EmployeeDetail label="Employee Name" value={detailEmployee.employeeName} />
                <EmployeeDetail label="Address" value={detailEmployee.address} />
                <EmployeeDetail label="Phone Number" value={detailEmployee.phoneNumber} />
                <EmployeeDetail label="Email Address" value={detailEmployee.emailAddress} />
                <EmployeeDetail label="Job Position" value={detailEmployee.jobPosition} />
                <EmployeeDetail label="Supervisor Name" value={detailEmployee.superVisorName} />
                <EmployeeDetail label="Employment Type" value={detailEmployee.employmentType} />
            </Container>
        </>

    );
};

export default EmployeeDetailCard;
