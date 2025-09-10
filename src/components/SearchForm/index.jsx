import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { SearchContext } from "../../contexts/SearchContext";
import SearchIcon from "../UI/SearchIcon";
import "./SearchForm.css";

export default function SearchForm() {
  const { setSelectedCity } = useContext(GlobalContext);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSelectedCity(searchQuery.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <SearchIcon />
      <input
        type="text"
        name="searchQuery"
        placeholder="Search city..."
        value={searchQuery}
        onChange={handleSearchQueryChange}
        aria-label="Search city"
      />
    </form>
  );
}