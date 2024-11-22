import { useNavigate, useParams } from 'react-router-dom';
import TableLayout from '../templates/TableLayout';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../elements/loading';
import TableWorksOns from '../modules/tableWorksOns';
import axios from 'axios';
import Swal from 'sweetalert2';

function WorksOnsPage({ columns = { columns }, worksOns, setWorksOns, refresh, setRefresh }) {
    const navigate = useNavigate();
    const {id} = useParams();
    const buttonTitle = 'Add WorksOn';
    const onClick = ()=>navigate('/assignments/new')
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [totalItems, setTotalItems] = useState(5);
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };
    const handlePageSelect = (e) => {
        const selectedPageSize = e.target.value;
        setTotalItems(parseInt(selectedPageSize)); 
        setCurrentPage(1);
    };
    useEffect(() => {
        const myFetch = async () => {
            try {
                let baseUrl;
                if(id) {
                    baseUrl = `http://localhost:5227/WorksOn/employee-assignment/${id}?pageNumber=${currentPage}&pageSize=${totalItems}`
                }
                else {
                    baseUrl = `http://localhost:5227/WorksOn?pageNumber=${currentPage}&pageSize=${totalItems}`
                }
                const response = await axios.get(baseUrl);
                setWorksOns(response.data.data);
                setTotalPage(response.data.totalPages)
            } catch (error) {
                setErrorStatus(true);
                console.log("Error:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };
        myFetch();
    }, [refresh, currentPage, totalItems]);

    const handleDeleteWorksOn = (id) => {
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
                try {
                    await axios.delete(`http://localhost:5227/WorksOn/${id}`);
                    Swal.fire("Deleted!", "WorksOn Deleted successfully", "success");
                    setRefresh(!refresh);
                } catch (error) {
                    console.log("Error deleting worksOn:", error);
                    setErrorStatus(true);
                }
            }
        });
    };

    if (loading) return <LoadingSpinner />;
    if (errorStatus) return <p>Error loading workOns</p>;

    return (
        <>
        <TableLayout title="List of WorksOns" buttonTitle={buttonTitle} onClick={onClick} >
            <TableWorksOns columns={columns} worksOns={worksOns} onDelete={handleDeleteWorksOn} />
        </TableLayout>

        <nav aria-label="Page navigation" style={{ marginLeft: "150px" }}>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <span
                            className="page-link"
                            onClick={() => handlePageClick(currentPage - 1)}
                        >
                            Previous
                        </span>
                    </li>
                    
                    {[...Array(totalPage)].map((_, index) => {
                        const page = index + 1;
                        return (
                            <li
                                key={page}
                                className={`page-item ${currentPage === page ? "active" : ""}`}
                            >
                                <span
                                    className="page-link"
                                    onClick={() => handlePageClick(page)}
                                >
                                    {page}
                                </span>
                            </li>
                        );
                    })}

                    <li className={`page-item ${currentPage === totalPage ? "disabled" : ""}`}>
                        <span
                            className="page-link"
                            onClick={() => handlePageClick(currentPage + 1)}
                        >
                            Next
                        </span>
                    </li>
                </ul>
            </nav>

            <div className="mb-3" style={{ width: '100px', marginLeft: '150px' }}>
                <label htmlFor="itemsPerPage" className="form-label">Items per page</label>
                <select onChange={handlePageSelect} value={totalItems} id="itemsPerPage" className="form-select">
                    <option value="5">5</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </>
    )
}

export default WorksOnsPage;