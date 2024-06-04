import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { Nav } from './Nav';
import '../../src/App.css';

const ITEMS_PER_PAGE = 5;

const AdminPage = () => {
    const token = sessionStorage.getItem('token');
    const adminId = sessionStorage.getItem('adminId');
    const role = sessionStorage.getItem('role');
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [reason, setReason] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [itemId, setItemId] = useState('');
    const [status, setStatus] = useState(false);
    const [id, setId] = useState('');
    const [fullName, setFullName] = useState('');
    const roleName = 'SUPERADMIN';

    useEffect(() => {
        // Fetch items from the backend API
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/admin/get/all/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setItems(data);

                const matchedItem = data.find(item => item.id === adminId);
                if (matchedItem.role === role) {
                    setStatus(true);
                } else {
                    console.log('No item found with adminId:', adminId);
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [token, adminId, role]);

    const handleAddAdmin = () => {
        navigate(`/admin/add`);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        const filteredItems = items.filter(item => {
            const cleanedTitle = item.id + item.userName.toLowerCase().replace(/[^\w\s]/gi, '');
            return cleanedTitle.includes(searchTerm.toLowerCase());
        });
        setSearchResult(filteredItems);
        setShowNoResultsMessage(filteredItems.length === 0 && searchTerm !== '');
    };

    const handleItemId = (id) => {
        setItemId(id);
    };

    const handleInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        const filteredItems = items.filter(item => {
            const cleanedTitle = item.id + item.userName.toLowerCase().replace(/[^\w\s]/gi, '');
            return cleanedTitle.includes(newSearchTerm.toLowerCase());
        });
        setSearchResult(filteredItems);
        setShowNoResultsMessage(false);
    };

    const handleEditButtonClick = (id, currentFullName) => {
        setId(id);
        setFullName(currentFullName);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleDelete = async (userId, itemRole) => {
        const role = itemRole.toString();
        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/removeUser/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ reason, role })
            });

            if (response.ok) {
                console.log('Delete operation successful');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                alert('Remove operation successful');
            } else {
                console.error('Remove operation failed');
                alert('Remove operation failed');
            }
        } catch (error) {
            console.error('Error during remove operation', error);
            alert('Error during remove operation');
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        setReason(event.target.value);
    };

    const handleUpdateFullName = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/auth/updateUser/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ fullName })
            });

            if (response.ok) {
                console.log('Update operation successful');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                alert('Update operation successful');
                closeEditModal();
            } else {
                console.error('Update operation failed');
                alert('Update operation failed');
            }
        } catch (error) {
            console.error('Error during update operation', error);
            alert('Error during update operation');
        }
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = (searchResult.length > 0 ? searchResult : items).slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const modalStyle = {
        content: {
            width: '50%',
            top: isModalOpen || isEditModalOpen ? '50%' : '-100%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'top 0.3s ease-in-out',
            zIndex: 2000,
            border: '10px solid #FFD700',
            opacity: 0.75,
            fontWeight: 'bold',
            borderRadius: '10px',
            padding: '20px',
            position: 'relative',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            transition: 'background-color 0.3s ease-in-out',
        },
    };

    const textStyle = {
        fontWeight: 'bold',
        userSelect: 'none',
    };

    return (
        <div className="background">
            <center><div className='container my-4'><Nav /></div></center>
            <div className='fs-4 text-center text-info  h3'><b>ADMIN</b></div>
            <div className='container'>
                <div className=' my-4 row '>
                    <div className='col-lg-8'>
                        <div className='input-group mb-3'>
                            <label htmlFor="search" className='d-none d-sm-block input-group-append mx-3 text-info  h4' style={textStyle}>Search by E-mail: </label>
                            <input
                                className="form-control rounded"
                                placeholder="Search"
                                aria-label="Search"
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={handleInputChange}
                            />
                            <button className="btn m-2 my-sm-0 btn-outline-secondary input-group-append mx-2 text-info  h4" type="button" onClick={handleSearch} style={textStyle}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className='col-lg-2'></div>
                    {status && (
                        <div className='col-lg-2'>
                            <button className="btn m-2 my-sm-0 btn-outline-secondary mr-4 text-info  h4" type="button" onClick={handleAddAdmin} style={textStyle}>
                                Add a New Admin
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className='m-3 btn  text-info  h4'>
                {showNoResultsMessage && (
                    <h4 style={textStyle}>No results found for "{searchTerm}".</h4>
                )}
            </div>

            <ul type='none'>
                {currentItems.length !== 0 ? currentItems.map(item => (
                    <div className='container-fluid border m-4 border-3 border-secondary text-info  h4' key={item.id}>
                        <li key={item.id}>
                            <div className='row my-2 font-weight-bold text-dark'>
                                <div className='col-lg-10'>
                                    <Link to={`/adminAllDetails/?id=${item.id}`} className=" text-decoration-none">
                                        <div className='row '>
                                            <div className='col-lg-3 col-md-6  m-3'>
                                                <div className="fs-5 text-center font-weight-bold  text-info  h4">Full Name: {item.fullName}</div>
                                            </div>
                                            <div className='col-lg-3 col-md-6  m-3'>
                                                <div className='fs-5 text-center font-weight-bold  text-info  h4'>Role: {item.role}</div>
                                            </div>
                                            <div className='col-lg-3 col-md-6  m-3 font-weight-bold '>
                                                <div className="fs-5 text-center text-info  h4">E-mail: {item.userName}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {(role == roleName ) && (
                                    <div className='col-lg-1 col-md-4 my-4'>
                                        <center><button className='btn btn-warning' onClick={() => handleEditButtonClick(item.id, item.fullName)}>Edit Full Name</button></center>
                                    </div>
                                ) }
                                <div className='col-lg-1 col-md-4 my-4'>
                                    <center>{(item.role === role) ? <div></div> : (
                                        <div>
                                            <button className='btn btn-warning' onClick={() => { handleItemId(item.id); setIsModalOpen(true); }}>Remove</button>
                                            <Modal
                                                className='bg-dark'
                                                shouldCloseOnOverlayClick={true}
                                                isOpen={isModalOpen}
                                                shouldCloseOnEsc={true}
                                                onRequestClose={closeModal}
                                                contentLabel="Example Modal"
                                                style={modalStyle}>
                                                <div className='fs-1 text-info bg-dark text-center '>Warning</div>
                                                <div className='fs-4 text-info bg-dark text-center my-3'>Are you sure to remove this user, which name is {item.fullName}?</div>
                                                <div className='row bg-dark my-3'>
                                                    <div className='col-4'></div>
                                                    <div className='col-2 '>
                                                        <button onClick={() => { handleDelete(item.id, item.role); closeModal(); }}>Yes</button>
                                                    </div>
                                                    <div className='col-2 '>
                                                        <button onClick={closeModal}>No</button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    )}
                                    </center>
                                </div>
                            </div>
                        </li>
                    </div>
                )) : <li><div className='fs-1  text-info  h4 '><center>"Currently, no any user found"</center></div></li>}
            </ul>

            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                style={modalStyle}
                contentLabel="Edit Full Name Modal">
                <h2>Edit Full Name</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleUpdateFullName(); }}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 mx-4">Update</button>
                    <button type="button" className="btn btn-secondary mt-3 mx-4" onClick={closeEditModal}>Cancel</button>
                </form>
            </Modal>

            <div className='container-fulid m-4 d-flex align-items-end'>
                <div className='row'>
                    <div className='col-5'></div>
                    <nav className='col-3'>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                                    Previous
                                </button>
                            </li>
                            {[...Array(Math.ceil((searchResult.length > 0 ? searchResult : items).length / ITEMS_PER_PAGE)).keys()].map((number) => (
                                <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(number + 1)}>
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil((searchResult.length > 0 ? searchResult : items).length / ITEMS_PER_PAGE) ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <div className='col-4'></div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
