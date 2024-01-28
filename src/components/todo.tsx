import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../components/todo.css";
import React, { useState, useEffect } from "react";

function todo() {
  const iconStyle = {
    width: "20px",
    height: "20px",
  };

  const [inputText, setInputText] = useState("");
  const [list, setList] = useState<{ text: string; isChecked: boolean }[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleAddButtonClick = () => {
    if (inputText) {
      setList([...list, { text: inputText, isChecked: false }]);
      setInputText("");
    } else {
      console.log("FIELD IS EMPTY");
    }
  };
  const handleCheckBox = (index: number) => {
    const updatedList = list.map((item, i) =>
      i === index ? { ...item, isChecked: !item.isChecked } : item
    );

    setList(updatedList);
    console.log(updatedList[index].isChecked ? "Checked" : "Unchecked");
  };

  const handleDeleteButtonClick = () => {
    const updatedList = list.filter(
      (item, index) => !selectedItems.includes(index)
    );
    setList(updatedList);
    setSelectedItems([]);
  };

  const listFunction = () => {
    let filteredList: { text: string; isChecked: boolean }[] = [];

    if (activeFilter === "all") {
      filteredList = list;
    } else if (activeFilter === "active") {
      filteredList = list.filter((item) => !item.isChecked);
    } else if (activeFilter === "completed") {
      filteredList = list.filter((item) => item.isChecked);
    }

    return (
      <>
        {filteredList.map((item, index) => (
          <div
            key={index}
            className={`list-item ${
              selectedItems.includes(index) ? "selected" : ""
            }`}
          >
            <input
              type="checkbox"
              className="form-check-input inputCheck"
              onChange={() => handleCheckBox(index)}
              checked={item.isChecked}
            />
            <label
              htmlFor={`flexCheckChecked-${index}`}
              className={`form-check-label labelCheck ${
                selectedItems.includes(index) ? "selected" : ""
              }`}
              onClick={() => handleLabelClick(index)}
            >
              {item.text}
            </label>
            <hr></hr>
          </div>
        ))}
      </>
    );
  };

  const handleLabelClick = (index: number) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((item) => item !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const countUncheckedTasks = () =>
    list.filter((item) => !item.isChecked).length;

  return (
    <>
      <div className="container pb-5 container-main ">
        <h1 id="headertxt" className="p-3">
          THINGS TO DO
        </h1>
        <div className="input-group mb-2">
          <input
            type="text"
            aria-label="Add New"
            placeholder="Add New"
            className="form-control"
            onChange={(event) => setInputText(event.target.value)}
            value={inputText}
            id="addField"
          />
        </div>
        {list.length === 0 ? <p>No Task Available</p> : null}
        {list.length === 0 ? null : (
          <div className="form-check checkContainer">{listFunction()}</div>
        )}
      </div>

      <div className="container container-menu">
        <div className="row">
          <div className="col-auto buttonContainer mt-2 mb-1">
            <button className="btn" onClick={handleAddButtonClick}>
              <FontAwesomeIcon icon={faPlus} style={iconStyle} />
            </button>
            <button className="btn" onClick={handleDeleteButtonClick}>
              <FontAwesomeIcon icon={faTrash} style={iconStyle} />
            </button>
          </div>
          <div className="col d-flex align-items-center">
            {list.length === 0 ? (
              <span>No available task</span>
            ) : (
              <span>
                {countUncheckedTasks()} task
                {countUncheckedTasks() !== 1 ? "s" : ""} left
              </span>
            )}
          </div>
          <div className="col-auto d-flex align-items-center">
            <button
              className={`btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => handleFilterClick("all")}
            >
              All
            </button>
          </div>

          <div className="col-auto d-flex align-items-center">
            <button
              className={`btn ${activeFilter === "active" ? "active" : ""}`}
              onClick={() => handleFilterClick("active")}
            >
              Active
            </button>
          </div>

          <div className="col-auto d-flex align-items-center">
            <button
              className={`btn ${activeFilter === "completed" ? "active" : ""}`}
              onClick={() => handleFilterClick("completed")}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default todo;
