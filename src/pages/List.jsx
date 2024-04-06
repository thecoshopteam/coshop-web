import React from "react";

// Local component imports
import CSList from "../components/CSList";

const List = () => {
  // Get the current date
  const currentDate = new Date();

  // Format the date as "Month, day"
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long", // full name of the month
    day: "numeric", // numeric day
  });

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-3xl font-semibold">Weekend BBQ</h1>
      <h2 className="text-xl font-medium text-gray-500">
        {formattedDate}
      </h2>{" "}
      <CSList />
    </div>
  );
};

export default List;
