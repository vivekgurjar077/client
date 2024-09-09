import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Importing only necessary components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import MyGigs from "./pages/myGigs/MyGigs";
import Reqtutor from "./pages/reqtutor/reqtutor";
import Newuser from "./pages/newuser/newuser";
import Becometeacher from "./pages/becometeacher/Becometeacher";
import "./App.css";
function App() {
  const queryClient = new QueryClient();

  // Inline layout component to avoid creating a separate function
  const Layout = ({ children }) => (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        {children}
        <Footer />
      </QueryClientProvider>
    </div>
  );

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Using Route element directly without unnecessary nesting */}
          <Route path="/" element={<Home />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/myGigs" element={<MyGigs />} />
          <Route path="/reqtutor" element={<Reqtutor />} />
          <Route path="/add" element={<Add />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/becometeacher" element={<Becometeacher />} />
          <Route path="/newuser" element={<Newuser />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
