import React from "react";

// Context imports
import { UserAuth } from "../context/AuthContext";

// Local component imports
import CSList from "../components/CSList";

const List = () => {
  const { user } = UserAuth();

  return (
    <div className="flex flex-col">
      <div className="p-5 sm:mt-20 sm:flex sm:flex-col sm:items-center lg:p-10">
        <h1 className="text-3xl font-semibold">Weekend BBQ</h1>
        <h2 className="text-xl font-medium text-gray-500">Today</h2>
        <p className="mt-2">User email: {user && user.email}</p>
        <CSList />
      </div>
    </div>
  );
};

export default List;
