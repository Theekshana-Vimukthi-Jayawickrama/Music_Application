import React, { useEffect, useState } from 'react';
import { Nav } from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HeroSection = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [currentItem,setCurrentItem] = useState();
    const[showModal,setShowModal] = useState("");
    const[removeResponse,setRemoveResponse] = useState("");
    const[removeStatus,setRemoveStatus] = useState(false);
    const token =  sessionStorage.getItem('token');
    const navigator = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/song/get/all');
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items', error);
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    function handleRemove(item){
        setCurrentItem(item);
        setShowModal(true);
    }

    function ModalClose(){
        setShowModal(false);
        setCurrentItem(null);
    }
    const ModalClose1 = () => {
        setRemoveStatus(false);
        setRemoveResponse("");
        setCurrentItem(null);
    }

    const ModalConfirm =async () =>{   
        try{
            setShowModal(false);
                const response = await axios.delete(`http://localhost:8080/api/v1/admin/delete/song/${currentItem.id}`,{
                    
                    headers : {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if(response.status === 200){
                    setRemoveResponse("Remove operation is successful");
                    setRemoveStatus(true) ;
                }else{
                    setRemoveResponse("Remove operation is unsuccessful");
                    setRemoveStatus(true) ;
                }            

        }catch(e){
            console.log(e);
        }
    }

    const handleRemoveStatus = () => {    
        setRemoveStatus(false); 
        setRemoveResponse("");
        window.location.reload();
    }
    

    useEffect(() => {
        if (Array.isArray(items)) {
            setFilteredItems(
                items.filter(item => 
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, items]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleEdit =(item) =>{
        navigator(`/edit/${item.id}`)
    }

    return (
        <>
        <cenetr><div className='container my-4'><Nav/></div></cenetr>       
            <div className='m-4 m-md-4'>
                <form className="d-flex mx-auto mx-2" role="search" onSubmit={(e) => e.preventDefault}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={handleSearchChange}/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            <div>
                {loading ? (
                <div>             
                    <div className=" d-flex justify-content-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div className='fw-3 d-flex justify-content-center'>Loading...</div>
                </div>

                    
                ) : (
                    items === 0?(<div>Songs were not found</div>): (
                    <div className='row'>
                        {filteredItems.map(item => (
                            <div key={item.id} className=' col border m-4 shadow-lg p-3 mb-5 bg-body rounded'>
                                <div>  
                                    <div classNmae="card " style={{width: "18rem"}}>
                                       <Link to = {`/songDetails/${item.id}`}> <img className="card-img-top" src={`data:${item.artistPhoto.photoType};base64, ${item.artistPhoto.data}`} alt="Card image cap"/></Link>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.sinhalaName}</p>
                                            <div className='d-flex justify-content-between'>

                                            <button className="btn btn-primary " 
                                                onClick={() => handleRemove(item)}
                                         >Remove</button>
                                            <button  class="btn btn-success" onClick={() => handleEdit(item)} >Edit</button>  
                                            </div>                                           
                                        </div>
                                    </div>                                 
                                </div>
                            </div>
                        ))}
                    </div>)
                )}
            </div>
            {removeStatus && (
                <div className="modal show fade d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header close d-flex justify-content-between">
                                <h5 className="modal-title">Removed</h5>
                                <button type="button" className="close d-flex justify-content-end" aria-label="Close" onClick={ModalClose1}>
                                    <span aria-hidden="true" className='d-flex justify-content-end'>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {removeResponse}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary mx-4" onClick={handleRemoveStatus}>OK</button>                           
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header close d-flex justify-content-between">
                                <h5 className="modal-title">Remove {currentItem?.name}</h5>
                                <button type="button" className="close d-flex justify-content-end" aria-label="Close" onClick={ModalClose}>
                                    <span aria-hidden="true" className='d-flex justify-content-end'>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Do you want to remove this song from the database? If you want, press "YES". Otherwise, press "NO".
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary mx-4" onClick={ModalConfirm}>YES</button> 
                                <button type="button" className="btn btn-secondary mx-4" onClick={ModalClose}>NO</button>                            
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </>
    );
};

export default HeroSection;
