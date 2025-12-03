import React from 'react'

export default function Filters({ sort, onSortChange, minPrice, maxPrice, onMinPriceChange, onMaxPriceChange }) {
  return (
    <div className="row g-3 mb-4"> {}
      <div className="col-md-4"> {}
        <label htmlFor="sort-select" className="form-label visually-hidden">Sort:</label> {}
        <select id="sort-select" className="form-select" value={sort} onChange={e => onSortChange(e.target.value)}> {}
          <option value="newest">Newest</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
        </select>
      </div>

      <div className="col-md-8"> {}
        <label className="form-label visually-hidden">Price:</label> {}
        <div className="d-flex gap-2"> {}

          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice ?? ''}
            onChange={e => onMaxPriceChange(e.target.value)}
            aria-label="Max Price"
          />
        </div>
      </div>
    </div>
  )
}
