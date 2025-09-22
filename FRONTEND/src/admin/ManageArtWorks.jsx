import { table } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from "../../config";
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const ManageArtWorks = () => {
    const {userId} = useParams();
    const [artworks, setArtworks] = useState([])
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        const fetchart = async () => {
            try {
                const response = await axios.get(`${config.url}/admin/viewbyid/${userId}`)
                setArtworks(response.data)
                if(response.data.length==0)
                    setMessage("No artworks Found")
            } catch (err) {
                if(err){
                    setError(err.message)
                }
            }
        }

        fetchart()
    }, [userId]);

    const handleDelete =async (id) => {
        try {
            const response = await axios.delete(`${config.url}/admin/deleteart/${id}`)
            toast.success(response.data)

            setArtworks(prev => prev.filter(art => art.id !== id));
        } catch (err) {
             if (err.response && err.response.status === 404) {
            toast.error("Artwork not found");
        } else {
            toast.error("Failed to delete artwork");
        }
        setError(err.message); 
        }
    }

    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div>
            <h3>Manage all Artworks</h3>
            {
                error?
                (<p style={{color:"red"}}>{error}</p>):
                message?
                (<p style={{color:"#e59d37", fontWeight:"550", textAlign:"center"}}>{message}</p>):
                (
                            <div className="artwork-grid">
                                {artworks.map((art) => (
                                    <div key={art.id} className="artwork-card">
                                    <img
                                        src={art.image}
                                        alt={art.title}
                                        className="artwork-image"
                                    />
                                    <div className="artwork-card-body">
                                        <h3 className="artwork-card-title">{art.title}</h3>
                                        <p className="artwork-description">{art.description}</p>
                                        <p className="artwork-price">₹{art.price}</p>
                                        <p className="artwork-dimensions">
                                        {art.width} x {art.height} cm
                                        </p>
                                        <p className="artwork-status">
                                        Status: {art.status ? art.status : "Unavailable"}
                                        </p>
                                        
                                        <div style={{display:"flex", gap:"1rem"}}>
                                            <Button onClick={() => {handleDelete(art.id)}} sx={{backgroundColor:"black", color:"white"}} variant="contained">
                                            Delete
                                            </Button>
                                            {/* <Button variant="contained" color="primary">
                                            Edit
                                            </Button> */}
                                        </div>
                                    </div>
                        </div>
                    ))}
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default ManageArtWorks;
