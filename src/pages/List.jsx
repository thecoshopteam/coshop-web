import React from "react";
import CSList from "../components/CSList";

const List = () => {
  return (
    <div className="flex flex-col">
      <div className="p-5 sm:mt-20 sm:flex sm:flex-col sm:items-center lg:p-10">
        <h1 className="text-3xl font-semibold">Weekend BBQ</h1>
        <h2 className="text-xl font-medium text-gray-500">Today</h2>
        <CSList />
      </div>
    </div>
  );
};

export default List;
