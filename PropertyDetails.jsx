import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet'; 


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
  iconSize: [38, 38], 
  iconAnchor: [19, 38], 
  popupAnchor: [0, -38] 
});

export default function PropertyDetails() {
  const { id } = useParams()
  const [prop, setProp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showMap, setShowMap] = useState(false) 

  useEffect(() => {
    if (prop) {
      setShowMap(true) 
    } else {
      setShowMap(false)
    }
  }, [prop]) 

  useEffect(() => {
    console.log("PropertyDetails: useEffect triggered for ID:", id);
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true); 
        const res = await fetch(`/api/property/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log("PropertyDetails: Fetched data:", data);
        setProp(data);
      } catch (err) {
        console.error("PropertyDetails: Fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("PropertyDetails: Loading finished.");
      }
    };

    if (id) { 
      fetchPropertyDetails();
    } else {
      setError("No property ID provided.");
      setLoading(false);
    }
  }, [id])

  console.log("PropertyDetails: Render - loading:", loading, "error:", error, "prop:", prop);

  if (loading) return <div style={{ fontSize: '3em', color: 'red', textAlign: 'center', marginTop: '50px' }}>Loading property details...</div>
  if (error) return <div style={{ fontSize: '3em', color: 'red', textAlign: 'center', marginTop: '50px' }}>Error: {error}</div>
  if (!prop) return <div style={{ fontSize: '3em', color: 'red', textAlign: 'center', marginTop: '50px' }}>Property not found.</div>

  const center = {
    
    lat: Number(prop.lat) || 34.0522,
    lng: Number(prop.lng) || -118.2437,
  };

  function MapClickHandler() {
    useMapEvents({
      click: (e) => {
        console.log("Map clicked at:", e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  return (
    <div className="details">
      <Link to="/" className="back">← Back to Home</Link>
      <div className="details-top">
        <div>
          <h1>{prop.title}</h1>
          <p className="location">{prop.location}</p>
          <p className="price-large">${prop.price?.toLocaleString()}</p>
        </div>
        <div className="contact-box">
          <p><strong>Request info</strong></p>
          <Link className="btn" to="/contact" state={{ subject: `Inquiry about ${prop.title}`, propertyId: prop.id, recipientId: prop.agent?._id }}>Contact Agent</Link>
        </div>
      </div>

      <div id="propertyImagesCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {prop.images && prop.images.length > 0 ? (
            prop.images.map((src, i) => (
              <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                <img src={src} className="d-block w-100" alt={`${prop.title} ${i+1}`} />
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <img src={prop.thumbnail} className="d-block w-100" alt={`${prop.title} Thumbnail`} />
            </div>
          )}
        </div>
        {prop.images && prop.images.length > 1 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target="#propertyImagesCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#propertyImagesCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>

      <div className="desc">
        <p>{prop.description}</p>
        <div className="specs">
          <div><strong>Bedrooms</strong><div>{prop.bedrooms}</div></div>
          <div><strong>Bathrooms</strong><div>{prop.bathrooms}</div></div>
          <div><strong>Area</strong><div>{prop.area} sqft</div></div>
        </div>
        <div><strong>Latitude</strong><div>{prop.lat}</div></div>
        <div><strong>Longitude</strong><div>{prop.lng}</div></div>
        <div><strong>Agent:</strong> {prop.agent?.name} ({prop.agent?.email})</div>

        {prop.interestedUsersDetails && prop.interestedUsersDetails.length > 0 && (
          <div className="interested-users mt-4">
            <h3>Interested Users</h3>
            <ul className="list-group">
              {prop.interestedUsersDetails.map((user) => (
                <li key={user._id || user.id} className="list-group-item">
                  <strong>{user.username}</strong> ({user.email})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="map-placeholder">
        <h3>Location</h3>
        {showMap && ( 
          <MapContainer center={{ lat: Number(prop.lat) || 34.0522, lng: Number(prop.lng) || -118.2437 }} zoom={16} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={{ lat: Number(prop.lat) || 34.0522, lng: Number(prop.lng) || -118.2437 }} icon={customIcon}>
              <Popup>{prop.title}</Popup>
            </Marker>
            <MapClickHandler />
          </MapContainer>
        )}
        <p className="text-muted mt-2">Interactive map powered by OpenStreetMap.</p>
      </div>
    </div>
  )
}

