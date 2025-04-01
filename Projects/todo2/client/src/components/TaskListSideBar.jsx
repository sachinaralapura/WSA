import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import CheckBox from "../components/ui/CheckBox";
import { listView, board } from "../assets/asset";
import { fetchTaskAPI, getLabelsApi } from "../utils/taskapi";

const statusOption = [
  {
    display: "Open",
    value: "Open",
  },
  {
    display: "In Progress",
    value: "In-Progress",
  },
  {
    display: "Completed",
    value: "Completed",
  },
];

export default function TaskListSideBar({ boardView, setBoardView, setTasks }) {
  const [labels, setLabels] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [sortOption, setSortOption] = useState([]);

  // fetch All labels
  useEffect(() => {
    const handleResponse = (responseData) => {
      setLabels(responseData.labels);
    };

    const handleError = (errMsg) => {
      console.error(errMsg);
      alert(errMsg);
    };

    getLabelsApi(handleResponse, handleError);
  }, []);

  // callback

  const selectStatus = useCallback(function (statusToAdd) {
    setSelectedStatus((prev) =>
      prev.includes(statusToAdd) ? prev : [...prev, statusToAdd]
    );
  }, []);

  const removeStatus = useCallback(function (statusToRemove) {
    setSelectedStatus((prev) =>
      prev.filter((status) => status != statusToRemove)
    );
  }, []);

  const selectLabel = useCallback(function (labelToAdd) {
    setSelectedLabels((prev) =>
      prev.includes(labelToAdd) ? prev : [...prev, labelToAdd]
    );
  }, []);

  const removeLabel = useCallback(function (labelToRemove) {
    setSelectedLabels((prev) => prev.filter((label) => label != labelToRemove));
  }, []);

  const handleStatusCheckbox = (e, status) => {
    if (e.target.checked) {
      selectStatus(status);
    } else {
      removeStatus(status);
    }
  };

  const handleLabelCheckBox = (e, label) => {
    if (e.target.checked) {
      selectLabel(label);
    } else {
      removeLabel(label);
    }
  };

  const handleResponse = useCallback(
    (responseData) => {
      setTasks(responseData.data);
    },
    [setTasks]
  );

  const handleError = useCallback((msg) => {
    console.error(msg);
    alert(msg);
  }, []);

  useEffect(() => {
    const options = {
      sortOption,
      selectedStatus,
      selectedLabels,
    };
    fetchTaskAPI(handleResponse, handleError, options);
  }, [handleResponse, handleError, selectedStatus, selectedLabels, sortOption]);

  const enableBoardView = useCallback(() => {
    setBoardView(true);
  }, [setBoardView]);

  const enableListView = useCallback(() => {
    setBoardView(false);
  }, [setBoardView]);

  const sortOptions = [
    { label: "Date Added", value: "added_on" },
    { label: "Due Date", value: "due_date" },
  ];

  return (
    <aside className="task-list-left-section">
      <div>
        <p className="left-section-label">View</p>
        <div className="view-toggle-container">
          {/* list view toggle */}
          <div
            onClick={enableListView}
            className={clsx("view-toggle", !boardView && "active-toggle")}
          >
            <img src={listView} alt="List icon" />
            <p className="list-label">List</p>
          </div>

          {/* board view Toggle */}
          <div
            onClick={enableBoardView}
            className={clsx("view-toggle", boardView && "active-toggle")}
          >
            <img src={board} alt="bard Icon" />
            <p className="list-label">Board</p>
          </div>
        </div>
      </div>

      <div className="task-sidebar-child-section">
        <p className="left-section-lebel">Task Status</p>
        {/* render checkboxes for each status option */}
        {statusOption.map((status) => {
          const handleClick = (e) => handleStatusCheckbox(e, status.value);
          return (
            <CheckBox
              key={status.value + "-checkbox"}
              label={status.display}
              onClick={handleClick}
            />
          );
        })}
      </div>

      {/* sort by section */}
      <div className="task-sidebar-child-section">
        <p className="left-section">Sort By</p>
        {/* Dropdown for sorting option */}
        {/* <DropdownSortBy
          placeholder="Select"
          value={sortOptions}
          onChange={setSortOption}
          options={options}
        /> */}
      </div>
      
      {/* label section */}
      <div className="task-sidebar-child-section">
        <p className="left-section-label">Label</p>
        {!labels.length && (
          <span className="no-label-text">No Label created yet</span>
        )}

        {/* render checkboxes for each label */}
        {labels.map((label) => {
          const handleClick = (e) => handleLabelCheckBox(e, label);
          return <CheckBox key={label} label={label} onClick={handleClick} />;
        })}
      </div>
    </aside>
  );
}
