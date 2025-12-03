import React from 'react'

export default function SearchBar({ value, onChange, placeholder = 'Search by city, street, or title' }) {
  return (
    <div className="mb-3"> {}
      <input
        type="search"
        className="form-control"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search properties"
      />
    </div>
  )
}
