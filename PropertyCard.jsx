import React from 'react'
import { Link } from 'react-router-dom'

export default function PropertyCard({ prop, interestedUsersCount, onDelete }) {
  return (
    <Link to={`/property/${prop._id}`} className="card-link">
      <div className="card h-100">
        <img src={prop.thumbnail} className="card-img-top" alt={prop.title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{prop.title}</h5>
          <p className="card-text text-muted">{prop.location}</p>
          <div className="d-flex justify-content-between my-3">
            <span><i className="bi bi-fullscreen"></i> {prop.area} sqft</span>
            <span><i className="bi bi-droplet"></i> {prop.bathrooms} baths</span>
            <span><i className="bi bi-door-open"></i> {prop.bedrooms} beds</span>
          </div>
          {interestedUsersCount > 0 && (
            <p className="card-text"><strong>{interestedUsersCount}</strong> interested user(s)</p>
          )}
          <p className="card-text fs-4 fw-bold">${prop.price.toLocaleString()}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <Link to={`/property/${prop._id}`} className="btn btn-primary">View Details</Link>
            <button
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault(); 
                if (window.confirm('Are you sure you want to delete this property?')) {
                  onDelete(prop._id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
