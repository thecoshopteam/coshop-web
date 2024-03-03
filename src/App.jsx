import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout imports
import AppLayout from "./layouts/AppLayout";

// Page imports
import List from "./pages/List";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
};

export default App;
