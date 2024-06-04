import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav } from './Nav';
import '../../src/App.css';

const AddSong = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
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

        try {
            const response = await fetch(`http://localhost:8080/api/v1/admin/save`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                alert('Item saved successfully');
                console.log('Item saved successfully');
                navigate('/herosection');
                window.location.reload();
            } else {
                const error = await response.text();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="background">
          <cenetr><div className='container my-4'><Nav/></div></cenetr>
            <form onSubmit={handleSubmit} className="form-group">
                <div className='row'>
                    <div className="col m-4">
                        <label className='mb-1 text-info  h3'>Song Name: </label>
                        <input className="form-control" type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="col m-4">
                        <label className='mb-1 text-info  h3'>Sinhala Song Name: </label>
                        <input className="form-control" type="text" name="sinhalaName" value={formData.sinhalaName} onChange={handleInputChange} required />
                    </div>
                    <div className="col m-4">
                        <label className='mb-1 text-info  h3'>Credits for Chrods: </label>
                        <input className="form-control" type="text" name="creditCodes" value={formData.creditCodes} onChange={handleInputChange} required />
                    </div>
                    <div className="col m-4 text-info  h3">
                        <label className='mb-1'>Credits for Notation: </label>
                        <input className="form-control" type="text" name="creditNotes" value={formData.creditNotes} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className='container'>
                <div className='row my-4'>
                    <div className='col-lg-5 my-4 border'>
                        <label className='m-4 text-info  h4'>Artist Photo (JPEG/PNG only):</label>
                        <input className='m-4' type="file" name="artistPhoto" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
                        {formData.artistPhotoPreview && (
                            <img src={formData.artistPhotoPreview} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        )}
                    </div>
                    <div className='col-lg-5 my-4 border'>
                        <label className='m-4 text-info  h4'>Lyrics Photo (JPEG/PNG only):</label>
                        <input className='m-4' type="file" name="lyricsPhoto" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
                        {formData.lyricsPhotoPreview && (
                            <img src={formData.lyricsPhotoPreview} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        )}
                    </div>
                    <div className='col-lg-5 my-4 border'>
                        <label className='m-4 text-info  h4'>Chrods Photo (JPEG/PNG only):</label>
                        <input className='m-4' type="file" name="chrodsPhoto" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
                        {formData.chrodsPhotoPreview && (
                            <img src={formData.chrodsPhotoPreview} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        )}
                    </div>
                    <div className='col-lg-5 my-4 border'>
                        <label className='m-4 text-info  h4'>Notation Photo (JPEG/PNG only):</label>
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
            </form>
        </div>
    );
}

export default AddSong;
