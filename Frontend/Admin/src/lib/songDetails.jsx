import React, { useEffect, useState } from 'react';
import { Nav } from './Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../src/App.css';

const SongDetails = () => {
    const { id } = useParams();
    const token = sessionStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    

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

    return (
        <div className="background">
          <cenetr><div className='container'><Nav/></div></cenetr>
          {loading ? (
                <div>             
                    <div className=" d-flex justify-content-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="visually-hidden ">Loading...</span>
                        </div>
                    </div>
                    <div className='fw-3 d-flex justify-content-center'>Loading...</div>
                </div>                
                ) :(
                <div>
                <div className='row'>
                    <div className="col m-4">                       
                        <label className='mb-1 text-info  h3'>Song Name: {items.name} </label>
                    </div>
                    <div className="col m-4"> 
                        <label className='mb-1 text-info  h3'>Sinhala Song Name: {items.sinhalaName}</label>
                    </div>
                    <div className="col m-4">
                        <label className='mb-1 text-info  h3'>Credits for Chrods: {items.songCode ? items.songCode.credit : 'N/A'} </label>
                    </div>
                    <div className="col m-4"> 
                        <label className='mb-1 text-info  h3'>Credits for Notation: {items.songNotation ? items.songNotation.credit : 'N/A'} </label>
                    </div>
                </div>

                <div className='container-fulid mx-4 '>
                    <div className='row my-4'>
                        <div className='col-lg-5 my-4 border bg-light mx-4'>
                            <label className='m-4 text-info  h2'> Artist Photo (JPEG/PNG only):</label>
                            <img src={`data:${items.artistPhoto.photoType};base64,${items.artistPhoto.data}`} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' /> 
                        </div>
                        <div className='col-lg-5 my-4 border bg-light'>
                            <label className='m-4 text-info  h2'> Lyrics Photo (JPEG/PNG only):</label>
                            <img src={`data:${items.lyrics.photoType};base64,${items.lyrics.data}`} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        </div>
                        <div className='col-lg-5 my-4 border bg-light mx-4'>
                            <label className='m-4 text-info  h2'>Chrods Photo (JPEG/PNG only):</label>
                            <img src={`data:${items.songCode.photoType};base64,${items.songCode.data}`} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        </div>
                        <div className='col-lg-5  my-4 border bg-light'>
                            <label className='m-4 text-info  h2'>Notation Photo (JPEG/PNG only):</label>
                                <img src={`data: ${items.songNotation.photoType};base64,${items.songNotation.data}`} alt="Preview" style={{ width: '200px', maxHeight: '200px' }} className='m-3' />
                        </div>
                    </div>
                </div>
            </div>
            )}

        </div>
    );
}

export default SongDetails