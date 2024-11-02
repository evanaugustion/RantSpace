import React, { useEffect, useState } from "react";
import { anonymousSignIn } from "./firebaseConfig";
import { submitRant, fetchRants} from "./firebaseService";
import Landing from "./Landing";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Chat from "./Chat";

function App() {
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
  );
}

export default App;
