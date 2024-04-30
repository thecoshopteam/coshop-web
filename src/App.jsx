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
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import List from "./pages/List";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";

// Theme imports
import { ThemeProvider } from "@mui/material";
import CoShopTheme from "./lib/CoShopTheme";

const App = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={CoShopTheme}>
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
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <AuthLayout>
                    <Onboarding />
                  </AuthLayout>
                </ProtectedRoute>
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
              path="/profile"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-us"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <AboutUs />
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
            <Route
              path="/faq"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <FAQ />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthContextProvider>
  );
};

export default App;
