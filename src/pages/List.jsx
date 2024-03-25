import React from "react";

// Local component imports
import CSList from "../components/CSList";

const List = () => {
  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-3xl font-semibold">Weekend BBQ</h1>
      <h2 className="text-xl font-medium text-gray-500">Today</h2>
      <CSList />
    </div>
  );
};

export default List;
