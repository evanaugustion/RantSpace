import React, { useEffect, useState } from "react";
import { anonymousSignIn } from "./firebaseConfig";
import { submitRant, fetchRants} from "./firebaseService";
import Landing from "./Landing";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Chat from "./Chat";
import { submitRant, fetchRants, fetchNames, findSimilarRants, addNames } from "./firebaseService";

function App() {
  const [rant, setRant] = useState("");
  const [rants, setRants] = useState([]);
  const [similarRants, setSimilarRants] = useState([]); // New state for similar rants

  useEffect(() => {
    anonymousSignIn();
    loadRants();
  }, []);

  const loadRants = async () => {
    const fetchedRants = await fetchRants();
    setRants(fetchedRants);
  };

  // Function to fetch similar rants based on the current rant input
  const fetchSimilarRants = async (input) => {
    const matches = await findSimilarRants(input);
    setSimilarRants(matches);
  };

  // Function to identify the recipient and submit rant
  const handleRantSubmit = async () => {
    const names = await fetchNames(); // Fetch the names once for comparison
    const identifiedRecipient = names.find(name => rant.toLowerCase().includes(name));

    if (identifiedRecipient) {
      const rantData = {
        content: rant,
        recipient: identifiedRecipient // Store the identified recipient
      };
      await submitRant(rantData); // Submit the rant with recipient
      setRant("");
      loadRants(); // Refresh the list of rants
      fetchSimilarRants(identifiedRecipient); // Fetch similar rants based on the identified recipient
    } else {
      alert("No recognized recipient found in your rant.");
    }
  }
  const router = createBrowserRouter([
    {
      path: "/",
      children:[
        {path:"/",
        element:<Landing/>},
        {path:"/chat",
          element:<Chat/>}
      ]
    }
  ])
  

  // Function to handle rant reporting
 
  return (
    <div className="bg-black w-screen min-h-screen absolute flex items-center justify-center font-bsd">
     {/*<Landing/>*/}
     <RouterProvider router={router}>

     </RouterProvider>
      </div>

  )
}
export default App
