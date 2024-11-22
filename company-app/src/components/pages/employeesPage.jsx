import { useNavigate } from 'react-router-dom';
import TableEmployees from '../modules/tableEmployees';
import TableLayout from '../templates/TableLayout';
import { useState } from 'react';
import LoadingSpinner from '../elements/loading';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import EmployeeService from '../../services/employeeService';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { successSwal } from '../../helper';
import Container from '../elements/container';
import Button from '../elements/button';
import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';
import Input from '../elements/input';

function EmployeesPage({ columns = { columns }, departmentName }) {
    const navigate = useNavigate();
    const buttonTitle = 'Add Employee';
    const onClick = () => navigate('/employees/new')
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Title');
    const [sortOrder, setSortOrder] = useState(false);
    const [filterField, setFilterField] = useState('employeeName');
    const [activeEmployee, setActiveEmployee] = useState('Active');

    const handleSizePage = (e) => {
        setPageSize(+e.target.value);
        setPage(1);
    };

    const handlePageClick = (data) => {
        const nextPage = data.selected + 1;
        setPage(nextPage);
    };

    const handleFilterField = (e) => {
        setFilterField(e.target.value);
        setPage(1);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const handleActiveEmployee = (e) => {
        setActiveEmployee(e.target.value);
        setPage(1);
    };

    const handleSort = (field) => {
        if (field === sortBy) {
            setSortOrder(sortOrder === true ? false : true)
        }
        else {
            setSortBy(field);
            setSortOrder(true);
        }
    }

    const getSortIcon = (field) => {

        if (sortBy !== field) return '↕️';

        return sortOrder === true ? '↑' : '↓';

    };

    const fetchEmployees = async ({ page, pageSize, searchQuery, sortBy, sortOrder, filterField, activeEmployee }) => {
        try {
            const queryParams = {
                pageNumber: page,
                pageSize: pageSize,
                ascending: sortOrder,
                orderBy: sortBy,
                status: activeEmployee
            };
            if (departmentName) {
                queryParams['DepartmentName'] = departmentName
            }

            if (filterField && searchQuery) {
                queryParams[filterField] = searchQuery;
            }
            let response = await EmployeeService.getAll(queryParams);
            return response.data;
        } catch (error) {
            throw new Error(error, 'Error fetching books');
        }
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['employees', page, pageSize, searchQuery, sortBy, sortOrder, filterField, activeEmployee],
        queryFn: () => fetchEmployees({ page, pageSize, searchQuery, sortBy, sortOrder, filterField, activeEmployee }),
        placeholderData: keepPreviousData,
    });

    const queryClient = useQueryClient();

    const deleteEmployeeMutation = useMutation({
        mutationFn: (id) => EmployeeService.remove(id),
        onSuccess: () => {
            successSwal('Employee Deleted successfully');
            queryClient.invalidateQueries(['employees']);
        },
        onError: () => {
            Swal.fire('Error', 'Failed to delete employee', 'error');
        },
    });


    const handleDeleteEmployee = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteEmployeeMutation.mutate(id); // Gunakan mutasi delete
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p>Error loading employees</p>;

    return (
        <>
            <TableLayout title="List of Employees" buttonTitle={buttonTitle} onClick={onClick} >
                <Container className='input-group mb-3' >
                    <span className='input-group-text'>Search</span>
                    <Input label="ISBN" type="text" placeholder='search by Title' className='form-control' value={searchQuery} onChange={handleSearch} />
                </Container>

                <Container className='mb-3'>
                    <div className="d-flex align-items-center">
                        <Button className='btn btn-dark me-3' onClick={() => handleSort('EmployeeName')}>Employee Name{getSortIcon('EmployeeName')}</Button>
                        <Button className='btn btn-dark me-3' onClick={() => handleSort('EmploymentType')}>Employment Type{getSortIcon('EmploymentType')}</Button>
                        <Button className='btn btn-dark me-3' onClick={() => handleSort('DepartmentName')}>Department{getSortIcon('Department')}</Button>
                        <Button className='btn btn-dark me-3' onClick={() => handleSort('JobPosition')}>Job Position{getSortIcon('JobPosition')}</Button>
                        <Button className='btn btn-dark me-3' onClick={() => handleSort('Level')}>Level{getSortIcon('Level')}</Button>

                        {/* Label and Select Dropdown placed together */}
                        <Label className='me-3'>Search Employee by: </Label>
                        <select className='me-3 form-select' style={{ width: '200px' }} onChange={handleFilterField}>
                            <SelectOption value="EmployeeName">Employee Name</SelectOption>
                            <SelectOption value="EmployeeType">Employment Type</SelectOption>
                            <SelectOption value="DepartmentName">Department Name</SelectOption>
                            <SelectOption value="JobPosition">Job Position</SelectOption>
                            <SelectOption value="EmployeeLevel">Level</SelectOption>
                        </select>
                    </div>


                    <div className="d-flex align-items-center mt-4">
                        <Label className='me-3 fs-7'>Total Items: </Label>
                        <select className="form-select me-3 w-50" onChange={handleSizePage}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                        <select className="form-select w-25" onChange={handleActiveEmployee}>
                            <option value="Active">Active Employee</option>
                            <option value="Not Active">Not Active Employee</option>
                        </select>
                    </div>
                    {/* <Label className='me-3'>Select Total Items: </Label>
                    <select className='form-select' onChange={handleSizePage}>
                        <SelectOption value="5">5</SelectOption>
                        <SelectOption value="10">10</SelectOption>
                        <SelectOption value="15">15</SelectOption>
                    </select>
                    <select className='form-select' onChange={handleActiveEmployee}>
                        <SelectOption value="Active">Active Employee</SelectOption>
                        <SelectOption value="Not Active">Not Active Employee</SelectOption>
                    </select> */}
                </Container>
                <TableEmployees columns={columns} employees={data?.data} onDelete={handleDeleteEmployee} />
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    breakClassName={"page-item"}
                    pageCount={data?.totalPages || 0}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName="pagination justify-content-center" // Bootstrap pagination container
                    activeClassName="active" // Bootstrap active class
                    pageClassName="page-item" // Bootstrap page item class
                    pageLinkClassName="page-link" // Bootstrap page link class
                    previousClassName="page-item" // Bootstrap previous button class
                    previousLinkClassName="page-link" // Bootstrap previous link class
                    nextClassName="page-item" // Bootstrap next button class
                    nextLinkClassName="page-link" // Bootstrap next link class
                />
            </TableLayout>
        </>
    )
}

export default EmployeesPage;