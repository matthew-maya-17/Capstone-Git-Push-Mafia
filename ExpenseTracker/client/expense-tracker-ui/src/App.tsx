import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import React from "react";
import LoginPage from "./LoginPage";
import { JSX } from "react";
function AppContent(): JSX.Element {
  const location = useLocation();

  // Define which routes should HIDE the navbar
  const hideNavbarRoutes = ["/", "/login", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {/* {!shouldHideNavbar && <Navbar />} */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

function App(): JSX.Element {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
