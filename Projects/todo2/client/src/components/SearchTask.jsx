import React, { useCallback, useEffect, useRef } from "react";
import { searchIcon } from "../assets/asset";

export default function SearchTask({
  tasks,
  placeholder,
  setFilteredTask,
  searchQuery,
  setSearchQuery,
}) {
  const timerIdRef = useRef(null);

  // Debounce the search input change
  const handleSearchInputChange = useCallback(
    (event) => {
      const query = event.target.value;

      // Clear any existing timeout
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }

      // set a new Timeout and update the ref
      timerIdRef.current = setTimeout(() => {
        setSearchQuery(query);
      }, 300);
    },
    [setSearchQuery]
  );

  useEffect(() => {
    const filteredTasks = tasks.filter((task) => {
      const case1 = task?.title.toLowerCase().includes(searchQuery.toLowerCase());
      const case2 = task.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return case1 || case2;
    });
    setFilteredTask(filteredTasks);
  }, [searchQuery, setFilteredTask, tasks]);
  return (
    <div className="search-box-container">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleSearchInputChange}
      />
      <img src={searchIcon} alt="Search Icon" />
    </div>
  );
}
