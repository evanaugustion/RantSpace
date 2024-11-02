import React, { useEffect, useState } from "react";
import { anonymousSignIn } from "./firebaseConfig";
import Landing from "./Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./Chat";
import { submitRant, fetchRants, fetchNames, fetchSimilarRants } from "./firebaseService";

function App() {
  const [rant, setRant] = useState("");
  const [rants, setRants] = useState([]);
  const [similarRants, setSimilarRants] = useState([]);

  useEffect(() => {
    anonymousSignIn();
    loadRants();
  }, []);

  const loadRants = async () => {
    const fetchedRants = await fetchRants();
    setRants(fetchedRants);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { path: "/", element: <Landing /> },
        { path: "/chat", element: <Chat /> }
      ]
    }
  ]);

  return (
    <div className="bg-black w-screen min-h-screen absolute flex items-center justify-center font-bsd">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
