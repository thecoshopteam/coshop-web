import React from "react";

// Context imports
import { UserAuth } from "../context/AuthContext";

// Local component imports
import CSList from "../components/CSList";

const List = () => {
  const { user } = UserAuth();

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-3xl font-semibold">Weekend BBQ</h1>
      <h2 className="text-xl font-medium text-gray-500">Today</h2>
      <p className="mt-2">User email: {user.email}</p>
      <CSList />
    </div>
  );
};

export default List;
