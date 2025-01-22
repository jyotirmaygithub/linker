import React from "react";
import SearchBar from "./components/DataScraper/scraper"; // Ensure this file has .tsx extension
import MainPage from "./pages/mainPage"; // Ensure this file has .tsx extension
import LinkUpload from "./pages/linkUpload";
import LinkDetails from "./pages/linkShowcase";
import LogIn from "./pages/auth/login";
import { ToastContainer } from "react-toastify";
import Nav from "./components/navbar/nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SignIn from "./pages/auth/signIn";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/uploadLink" element={<LinkUpload />} />
          <Route
            path="/link/:id"
            element={
              <>
                <Nav />
                <LinkDetails />
              </>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
