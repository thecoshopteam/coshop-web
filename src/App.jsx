import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context imports
import { AuthContextProvider } from "./context/AuthContext";

// Layout imports
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";

// Component imports
import ProtectedRoute from "./components/ProtectedRoute";

// Page imports
import Register from "./pages/Register";
import Login from "./pages/Login";
import List from "./pages/List";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <List />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <NotFound />
                </AppLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
