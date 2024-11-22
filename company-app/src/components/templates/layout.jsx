import Footer from "../templates/footer";
import Header from "../modules/headerSection";
import { Outlet } from "react-router-dom";
import Container from "../elements/container";


const Layout = ({setEditingEmployee,setEditingDepartment,setEditingProject,setEditingWorksOn, setErrors}) => {
    return (
        <>
        <Container className="d-flex flex-column min-vh-100">
        <Header setEditingProject={setEditingProject} setEditingWorksOn={setEditingWorksOn} setEditingEmployee={setEditingEmployee} setEditingDepartment={setEditingDepartment} setErrors={setErrors} />
            <Container className="flex-grow-1">
            <Outlet />
            </Container>
            <Footer />
        </Container>
        </>
    );

};

export default Layout;