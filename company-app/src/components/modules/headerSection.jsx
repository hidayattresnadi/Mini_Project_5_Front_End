import Container from '../elements/container';
// import Text from '../elements/text';
// import GreetingMessage from '../widgets/greetingsMessage';
import '../../header.css'
import { useNavigate } from 'react-router-dom';

const Header = ({ setEditingEmployee, setEditingDepartment,setEditingProject, setEditingWorksOn, setErrors}) => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    setEditingEmployee(null);
    setEditingDepartment(null);
    setEditingProject(null);
    setEditingWorksOn(null);
    setErrors(null);
  }


  return (
    <Container className="container-fluid d-flex flex-column align-items-center bg-header mb-5 position-relative">
      {/* Overlay for Background Image */}
      <div className="overlay"></div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark w-100 px-4">
        <div className="container-fluid">
          {/* Title */}
          <span className="navbar-brand text-white fs-1 fw-bold">Company App</span>
          
          {/* Navbar Toggle Button */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* Collapsible Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-4">
              <li className="nav-item">
                <span onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Home</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/employees')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Employees</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/departments')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Departments</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/projects')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Projects</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/assignments')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">WorksOns</span>
              </li>
              <li className="nav-item">
                <span onClick={() => handleNavigation('/dependents')} style={{ cursor: 'pointer' }} className="nav-link text-white fw-bold fs-5">Dependents</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Container>
  );
};

export default Header;


