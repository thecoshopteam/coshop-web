import React, { useState, useEffect } from "react";

const AllLists = () => {
  const [lists, setLists] = useState([]);

  // Load lists from local storage on component mount
  useEffect(() => {
    const savedLists = localStorage.getItem("lists");
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);

  // Function to add a new list
  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      const newList = {
        id: Date.now(),
        title: newListTitle,
        items: [],
      };
      // Update the lists state and save to local storage
      setLists(prevLists => {
        const updatedLists = [...prevLists, newList];
        localStorage.setItem("lists", JSON.stringify(updatedLists));
        return updatedLists;
      });
      setNewListTitle("");
    }
  };

  const [newListTitle, setNewListTitle] = useState("");

  useEffect(() => {
    // Load lists from local storage on component mount
    const savedLists = localStorage.getItem("lists");
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-3xl font-semibold">Lists</h1>
      <div className="mt-10 space-y-4">
        {lists.map(list => (
          <div key={list.id} className="rounded-lg border border-gray-200 p-4">
            <h2 className="text-xl font-medium">{list.title}</h2>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <input
          type="text"
          placeholder="Enter list title"
          value={newListTitle}
          onChange={e => setNewListTitle(e.target.value)}
          className="mr-2 rounded-md border border-gray-300 p-2"
        />
        <button
          onClick={handleAddList}
          className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
        >
          Add List
        </button>
      </div>
    </div>
  );
};

export default AllLists;
