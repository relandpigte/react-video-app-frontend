import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBox({ onSearch, query }) {
  return (
    <div className="input-group flex-nowrap mb-3">
      <input
        type="text"
        onChange={onSearch}
        className="form-control"
        placeholder="Search movies"
        value={query}
      />
      <span className="input-group-text">
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </div>
  )
}

export default SearchBox
