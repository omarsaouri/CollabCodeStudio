import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./index.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Room from "./pages/Room/Room";
import RoomAccess from "./pages/RoomAccess/RoomAccess";
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <body className="flex flex-col h-screen w-screen">
      <header className="bg-background ">
        <Navbar />
      </header>
      <main className="bg-background flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<RoomAccess />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Toaster
        toastOptions={{
          style: {
            background: "#7c3aed",
            color: "#fff",
          },
        }}
        position="bottom-right"
      />
      <footer className="bg-background mt-auto w-full border-t-2 border-copy-lighter z-30">
        <Footer />
      </footer>
    </body>
  );
}

export default App;
