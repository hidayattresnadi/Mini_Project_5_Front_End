import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/pages/homepage";
import Layout from "../components/templates/layout";
import EmployeesPage from "../components/pages/employeesPage";
import EmployeeFormPage from "../components/pages/employeeFormPage";
import EmployeeDetailPage from "../components/pages/employeeDetailPage";
import DepartmentsPage from "../components/pages/departmentsPage";
import DepartmentFormPage from "../components/pages/departmentFormPage";
import DepartmentDetailPage from "../components/pages/departmentDetailPage";
import ProjectsPage from "../components/pages/projectsPage";
import ProjectFormPage from "../components/pages/projectFormPage";
import ProjectDetailPage from "../components/pages/projectDetailPage";
import WorksOnsPage from "../components/pages/WorksOnsPage";
import WorksOnFormPage from "../components/pages/worksOnFormPage";
import WorksOnDetailPage from "../components/pages/worksOnDetailPage";
import EmployeeFormPageEdit from "../components/pages/employeeFormPageEdit";
import DeactivateEmployeeFormPage from "../components/pages/deactivateEmployeeFormPage";
import DependentsPage from "../components/pages/dependentsPage";

const columnsTableEmployees = ["Employee Name", "Department", "Job Position", "Level","Employment Type","Last Updated", "Edit", "Delete", "Detail"];
const columnsTableDepartments = ["Id", "Department Name", "Manager Name","Location", "Edit", "Delete", "Detail"];
const columnsTableProjects = ["Id", "Project Name", "Department", "Edit", "Delete", "Detail"];
const columnsTableWorksOns = ["Id", "Employee Name", "Project Name", "Date Worked", "Hours Worked", "Edit", "Delete", "Detail"];
const columnTableDependents = ["Id","Name","Relations"]
const AppRouter = () => {

    const [employees, setEmployees] = useState();
    const [departments, setDepartments] = useState();
    const [projects, setProjects] = useState();
    const [worksOns, setWorksOns] = useState();
    const [refresh, setRefresh] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [editingProject, setEditingProject] = useState(null);
    const [editingWorksOn, setEditingWorksOn] = useState(null);
    const [errors, setErrors] = useState(null);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout
                setEditingEmployee={setEditingEmployee}
                setEditingDepartment={setEditingDepartment}
                setEditingProject={setEditingProject}
                setEditingWorksOn={setEditingWorksOn}
                setErrors={setErrors}
            />,
            children: [
                {
                    path: "/",
                    element: (
                        <HomePage/>
                    )
                },
                {
                    path: "/employees",
                    element: (
                        <EmployeesPage
                            employees={employees}
                            setEmployees={setEmployees}
                            columns={columnsTableEmployees}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    )
                },
                {
                    path: "/employees/deactivate/:id",
                    element: (
                        <DeactivateEmployeeFormPage
                            setErrors={setErrors}
                            errors={errors}
                            setEditingEmployee={setEditingEmployee}
                            editingEmployee={editingEmployee}
                        />
                    ),
                },
                {
                    path: "/employees/new",
                    element: (
                        <EmployeeFormPage
                            setErrors={setErrors}
                            setDepartments={setDepartments}
                            departments={departments}
                            errors={errors}
                            employees={employees}
                            setEmployees={setEmployees}
                        />
                    ),
                },
                {
                    path: "/employees/:id",
                    element: (
                        <EmployeeFormPageEdit
                            setEditingEmployee={setEditingEmployee}
                            editingEmployee={editingEmployee}
                            setDepartments={setDepartments}
                            departments={departments}
                            errors={errors}
                            setErrors={setErrors}
                            employees={employees}
                            setEmployees={setEmployees}
                        />
                    ),
                },
                {
                    path: "/employees/detail/:id",
                    element: (
                        <EmployeeDetailPage
                            setRefresh={setRefresh}
                            refresh={refresh}
                            departments={departments}
                            worksOns={worksOns}
                            setWorksOns={setWorksOns}
                            columns={columnsTableWorksOns}
                        />
                    ),
                },
                {
                    path: "/departments",
                    element: (
                        <DepartmentsPage
                            departments={departments}
                            columns={columnsTableDepartments}
                            setDepartments={setDepartments}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/departments/new",
                    element: (
                        <DepartmentFormPage
                            employees={employees}
                            setEmployees={setEmployees}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    ),
                },
                {
                    path: "/departments/:id",
                    element: (
                        <DepartmentFormPage
                            editingDepartment={editingDepartment}
                            setEditingDepartment={setEditingDepartment}
                            employees={employees}
                            setEmployees={setEmployees}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    ),
                },
                {
                    path: "/departments/detail/:id",
                    element: (
                        <DepartmentDetailPage
                        setEmployees={setEmployees}
                        employees={employees}
                        columnsTableEmployees={columnsTableEmployees}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/projects",
                    element: (
                        <ProjectsPage
                            projects={projects}
                            setProjects={setProjects}
                            refresh={refresh}
                            setRefresh={setRefresh}
                            columns={columnsTableProjects}
                        />
                    ),
                },
                {
                    path: "/projects/new",
                    element: (
                        <ProjectFormPage
                            setDepartments={setDepartments}
                            departments={departments}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    ),
                },
                {
                    path: "/projects/:id",
                    element: (
                        <ProjectFormPage
                            setDepartments={setDepartments}
                            departments={departments}
                            editingProject={editingProject}
                            setEditingProject={setEditingProject}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    ),
                },
                {
                    path: "/projects/detail/:id",
                    element: (
                        <ProjectDetailPage
                            projects={projects}
                            worksOns={worksOns}
                            departments={departments}
                            employees={employees}
                            columns={columnsTableWorksOns}
                        />
                    ),
                },
                {
                    path: '/assignments',
                    element: (
                        <WorksOnsPage
                            worksOns={worksOns}
                            setWorksOns={setWorksOns}
                            columns={columnsTableWorksOns}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    ),
                },
                {
                    path: "/assignments/new",
                    element: (
                        <WorksOnFormPage
                            employees={employees}
                            setEmployees={setEmployees}
                            projects={projects}
                            setProjects={setProjects}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    ),
                },
                {
                    path: "/assignments/:id",
                    element: (
                        <WorksOnFormPage
                            employees={employees}
                            setEmployees={setEmployees}
                            projects={projects}
                            setProjects={setProjects}
                            editingWorksOn={editingWorksOn}
                            setEditingWorksOn={setEditingWorksOn}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    ),
                },
                {
                    path: "/assignments/:empNo/:projNo",
                    element: (
                        <WorksOnDetailPage
                            worksOns={worksOns}
                            employees={employees}
                            projects={projects}
                        />
                    ),
                },
                {
                    path: "/dependents",
                    element: (
                        <DependentsPage
                           columns={columnTableDependents}
                        />
                    ),
                },
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default AppRouter;
