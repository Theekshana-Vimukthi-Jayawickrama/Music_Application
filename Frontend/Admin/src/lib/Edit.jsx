import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from './Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../src/App.css';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const[items,setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messageStatus, setMessageStatus] = useState(false);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        sinhalaName: '',
        creditCodes: '',
        creditNotes: '',
        artistPhoto: null,
        lyricsPhoto: null,
        notationPhoto: null,
        chrodsPhoto: null,
        artistPhotoPreview: null,
        lyricsPhotoPreview: null,
        notationPhotoPreview: null,
        chrodsPhotoPreview: null,
    });
    

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/admin/get/item/${id}`,              
                {headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }},);
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items', error);
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (e.target.files.length > 0) {
            const file = e.target.files[0];

            // Validate file type
            if (allowedTypes.includes(file.type)) {
                setFormData({ ...formData, [e.target.name]: file });

                // Read the image and set the preview
                const reader = new FileReader();

                reader.onload = (event) => {
                    const imagePreview = event.target.result;
                    setFormData((prevData) => ({
                        ...prevData,
                        [`${e.target.name}Preview`]: imagePreview,
                    }));
                };

                reader.readAsDataURL(file);
            } else {
                alert('Invalid file type. Please upload a JPEG or PNG image.');
            }
        } else {
            // Clear the file and the preview if the user deselects the file
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: null,
                [`${e.target.name}Preview`]: null,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('requestData', JSON.stringify(formData));
        data.append('artist', formData.artistPhoto);
        data.append('lyrics', formData.lyricsPhoto);
        data.append('notation', formData.notationPhoto);
        data.append('codes', formData.chrodsPhoto);
        data.append('id',id);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/update/song`, {
                method:'PUT',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setMessage('Item saved successfully');
                setMessageStatus(true);
            } else {
                setMessage('Item saved unsuccessfully');
                setMessageStatus(true);
                const error = await response.text();
                console.error('Error:', error);
            }
        } catch (error) {
            setMessage(error);
            setMessageStatus(true);
            console.error('Error:', error);
        }
    };

    const ModalClose=() =>{
            setMessageStatus(false);
            setMessage('');
            navigate('/herosection'); 
    }
    const handleModal=() =>{
        setMessageStatus(false);
        setMessage('');
        navigate('/herosection'); 
   
    }

    return (
        <div className="background">
          <cenetr><div className='container my-4'><Nav/></div></cenetr>
          {loading ? (
                <div>             
                    <div className=" d-flex justify-content-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div className='fw-3 d-flex justify-content-center'>Loading...</div>
                </div>

                    
                ) :(
            <form onSubmit={handleSubmit} className="form-group">
                <div className='row'>
                    <div className="col m-4">
                        <label className='mb-1 text-info  h2'>Default : {items.name}</label><br/>                        
                        <label className='mb-1 text-info  h2'>Song Name: </label>
                        <input className="form-control text-info  h2" type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="col m-4">
                        <label className='mb-1 text-info  h2'>Default : {items.sinhalaName}</label><br/>  
                        <label className='mb-1 text-info  h2'>Sinhala Song Name: </label>
                        <input className="form-control" type="text" name="sinhalaName" value={formData.sinhalaName} onChange={handleInputChange} />
                    </div>
                    <div className="col m-4">
                        <label className='mb-1 text-info  h2'>Default : {items.songCode.credit}</label><br/>  
                        <label className='mb-1 text-info  h2'>Credits for Chrods: </label>
                        <input className="form-control" type="text" name="creditCodes" value={formData.creditCodes} onChange={handleInputChange} />
                    </div>
                    <div className="col m-4">
                    <label className='mb-1 text-info  h2'>Default : {items.songNotation.credit}</label><br/>  
                        <label className='mb-1 text-info  h2'>Credits for Notation: </label>
                        <input className="form-control" type="text" name="creditNotes" value={formData.creditNotes} onChange={handleInputChange} />
                    </div>
                </div>

                <div className='container'>
                <div className='row my-4'>
                    <div className='col-lg-5 my-4 border bg-light'>
                        <label className='m-4 text-info  h2'> Default Artist Photo (JPEG/PNG only):</label>
                        <img src={`data:${items.artistPhoto.photoType};base64,${items.artistPhoto.data}`} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' /> 
                    </div>
                    <div className='col-lg-5 my-4 border bg-light'>
                        <label className='m-4 text-info  h2' text-info  h2>Default Lyrics Photo (JPEG/PNG only):</label>
                        <img src={`data:${items.lyrics.photoType};base64,${items.lyrics.data}`} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                    </div>
                    <div className='col-lg-5 my-4 border bg-light'>
                        <label className='m-4 text-info  h2'>Default Chrods Photo (JPEG/PNG only):</label>
                        <img src={`data:${items.songCode.photoType};base64,${items.songCode.data}`} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                    </div>
                    <div className='col-lg-5 my-4 border bg-light'>
                        <label className='m-4 text-info  h2'> Default Notation Photo (JPEG/PNG only):</label>
                            <img src={`data: ${items.songNotation.photoType};base64,${items.songNotation.data}`} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                    </div>
                </div>
                </div>

                <div className='container'>
                <div className='row my-4'>
                    <div className='col-lg-5 my-4 border bg-light'>
                        <label className='m-4 text-info  h2'>Artist Photo (JPEG/PNG only):</label>
                        <input className='m-4' type="file" name="artistPhoto" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
                        {formData.artistPhotoPreview && (
                            <img src={formData.artistPhotoPreview} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        )}
                    </div>
                    <div className='col-lg-5 my-4 border bg-light'>
                        <label className='m-4 text-info  h2'>Lyrics Photo (JPEG/PNG only):</label>
                        <input className='m-4' type="file" name="lyricsPhoto" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
                        {formData.lyricsPhotoPreview && (
                            <img src={formData.lyricsPhotoPreview} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        )}
                    </div>
                    <div className='col-lg-5 my-4 border bg-light'>
                        <label className='m-4 text-info  h2'>Chrods Photo (JPEG/PNG only):</label>
                        <input className='m-4' type="file" name="chrodsPhoto" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
                        {formData.chrodsPhotoPreview && (
                            <img src={formData.chrodsPhotoPreview} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        )}
                    </div>
                    <div className='col-lg-5 my-4 border bg-light'>
                        <label className='m-4 text-info  h2'>Notation Photo (JPEG/PNG only):</label>
                        <input className='m-4' type="file" name="notationPhoto" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
                        {formData.notationPhotoPreview && (
                            <img src={formData.notationPhotoPreview} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        )}
                    </div>
                </div>
                </div>
                <div className='row my-4'>
                    <button type="submit" className='btn btn-warning font-weight-bold fs-5'><b>Submit</b></button>
                </div>
            </form>)
            }
            {messageStatus && (
                <div className="modal show fade d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header close d-flex justify-content-between">
                                <h5 className="modal-title">Message</h5>
                                <button type="button" className="close d-flex justify-content-end" aria-label="Close" onClick={ModalClose}>
                                    <span aria-hidden="true" className='d-flex justify-content-end'>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {message}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary mx-4" onClick={handleModal}>OK</button>                           
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Edit