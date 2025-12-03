import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from './PropertyCard'
import SearchBar from './SearchBar'
import Filters from './Filters'

export default function PropertyList() {
  const [properties, setProperties] = useState([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch('/api/property');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filtered = useMemo(() => {
    if (!properties || !properties.length) return []
    let out = properties.slice()

    
    if (query) {
      const q = query.toLowerCase()
      out = out.filter(p => (p.title + ' ' + p.location).toLowerCase().includes(q))
    }

    
    const min = Number(minPrice) || 0
    const max = Number(maxPrice) || Number.POSITIVE_INFINITY
    out = out.filter(p => p.price >= min && p.price <= max)

    
    if (sort === 'priceAsc') out.sort((a, b) => a.price - b.price)
    else if (sort === 'priceDesc') out.sort((a, b) => b.price - a.price)
    else out.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    }) 

    return out
  }, [properties, query, sort, minPrice, maxPrice])

  if (loading) return <div className="loading">Loading properties...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!properties.length) return <div className="empty">No properties found.</div>

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Find Your Dream Home</h1>
        <Link to="/new-property" className="btn btn-success">Add Property</Link>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Find Your Dream Home</h1>
          <p className="col-md-8 fs-4">Browse our exclusive list of properties and find the one that's right for you.</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-8">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="col-md-4">
          <Filters
            sort={sort}
            onSortChange={setSort}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </div>
      </div>

      <h2 className="mb-4">Featured Properties</h2>
      <div className="row">
        {filtered.map(p => (
          <div key={p._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <PropertyCard
              prop={p}
              interestedUsersCount={p.interestedUsersCount}
              onDelete={async (id) => {
                try {
                  const res = await fetch(`/api/property/${id}`, { method: 'DELETE' });
                  if (res.ok) {
                    setProperties(prev => prev.filter(item => item._id !== id));
                  } else {
                    alert('Failed to delete property');
                  }
                } catch (err) {
                  console.error('Error deleting property:', err);
                  alert('Error deleting property');
                }
              }}
            />
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center">No properties match your filters.</div>}
    </div>
  )
}
