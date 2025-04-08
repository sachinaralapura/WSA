import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getLabelsApi, updateLabelApi } from "../../utils/taskapi";
import { blueChecked, blueTagHollow, crossIcon } from "../../assets/asset";

export default function LabelSelector({
  task,
  selectedLabels,
  setSelectedLabels,
  placeholder = "Type a Label",
}) {
  const taskId = task._id;
  const [isOpen, setIsOpen] = useState(false);
  const [labels, setLabels] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [matchingLabels, setMatchingLabels] = useState([]); // Labels that matches the input;

  const dropdownRef = useRef(null);
  const toggleSelector = useCallback(() => setIsOpen((p) => !p), []);

  // A wrapper over setMatchingLabels to ensure only unselected labels get Displayed
  const handleSetMatchingLabels = useCallback(
    (matchingLabelsToSet) => {
      const filteredLabels = matchingLabelsToSet.filter(
        (label) => !selectedLabels.includes(label)
      );
      setMatchingLabels(filteredLabels);
    },
    [selectedLabels]
  );

  // store all labels in state and  display unselected one
  const handleGetLabelsResponse = useCallback(
    (responseData) => {
      setLabels(responseData.data);
      handleSetMatchingLabels(responseData.data);
    },
    [setLabels, handleSetMatchingLabels]
  );

  const handleError = useCallback((errorMessage) => {
    console.error(errorMessage);
    alert(errorMessage);
    setIsOpen(false);
  }, []);

  const handleUpdateResponse = useCallback(() => {
    // fetch all labels  again after updating labels
    getLabelsApi(handleGetLabelsResponse, handleError);
  }, [handleGetLabelsResponse, handleError]);

  // initial useEffect
  useEffect(() => {
    // handle closing  the selector when clicked outside
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Fetch labels
  useEffect(() => {
    if (isOpen) getLabelsApi(handleGetLabelsResponse, handleError);
  }, [handleGetLabelsResponse, handleError, isOpen]);

  // when label is created
  useEffect(() => {
    updateLabelApi(selectedLabels, taskId, handleUpdateResponse, handleError);
  }, [selectedLabels, taskId, handleUpdateResponse, handleError]);

  const handleInputChange = useCallback(
    (e) => {
      const inputValue = e.target.value;
      setSearchInput(inputValue);
      // filter value that contain search input
      const matching = labels.filter((label) =>
        label.toLowerCase().includes(inputValue.toLowerCase())
      );

      handleSetMatchingLabels(matching);
    },
    [handleSetMatchingLabels, labels]
  );

  const handleLabelSelect = useCallback(
    (label) => {
      // check if label already selected
      if (!selectedLabels.includes(label)) {
        setSelectedLabels((p) => [...p, label]);
      }
      setSearchInput("");
      handleSetMatchingLabels([]);
    },
    [handleSetMatchingLabels, setSearchInput, selectedLabels]
  );

  const handleLabelDeSelect = useCallback(
    (label) => {
      setSelectedLabels((p) => p.filter((i) => i != label));
      setSearchInput("");
      handleSetMatchingLabels([]);
    },
    [setSelectedLabels, handleSetMatchingLabels]
  );

  const handleCreateLabel = useCallback(() => {
    const newLabel = searchInput.trim();
    if (newLabel !== "" && !labels.includes(newLabel)) {
      setLabels((p) => [...p, newLabel]);
      setSelectedLabels((p) => [...p, newLabel]);
    }
    setSearchInput("");
    handleSetMatchingLabels([]);
  }, [setLabels, setSelectedLabels, handleSetMatchingLabels, setSearchInput]);

  const isTyping = useMemo(
    () => Boolean(searchInput.trim().length),
    [searchInput]
  );

  return (
    <div className="label-selector-container" ref={dropdownRef}>
      <div
        className="view-task-info-box clickable flex"
        onClick={toggleSelector}
      >
        <img src={blueTagHollow} alt="label-icon" />
        <p className="label-12">Labels</p>
      </div>
      {isOpen && (
        <div className="label-selector label-12">
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder={placeholder}
          />
          <div className="labels-list-overflow">
            {/* only show the selected labels when user is not typing */}
            {!isTyping && (
              <ul className="selected-labels-list">
                {selectedLabels.map((label) => (
                  <li key={`${label}-selected`} className="selected-label">
                    <img src={blueTagHollow} alt="" width={13} height={13} />
                    {label}
                    <button onClick={() => handleLabelDeSelect(label)}>
                      <img
                        src={crossIcon}
                        alt="deselect label button"
                        width={8}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <ul className="matching-labels-list">
              {matchingLabels.map((label) => (
                <li
                  key={`${label}-listed`}
                  onClick={() => handleLabelSelect(label)}
                  className="matching-label"
                >
                  <img src={blueChecked} alt="" width={13} height={13} />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* only show create button when user is typing and  typed value does not exists */}
          {isTyping && !labels.includes(searchInput) && (
            <button onClick={handleCreateLabel} className="create-lable-btn">
              Create
            </button>
          )}
        </div>
      )}
    </div>
  );
}
