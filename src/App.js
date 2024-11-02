// src/App.js
import React, { useEffect, useState } from "react";
import { anonymousSignIn } from "./firebaseConfig";
import { submitRant, fetchRants, reportRant } from "./firebaseService";


function App() {
  const [rant, setRant] = useState("sdfs"); //remove string
  const [rants, setRants] = useState([]);

  useEffect(() => {
    // Sign in anonymously when the app loads
    anonymousSignIn();

    // Fetch initial rants from Firestore
    loadRants();
  }, []);

  // Function to load rants
  const loadRants = async () => {
    const fetchedRants = await fetchRants();
    setRants(fetchedRants);
  };

  // Function to handle rant submission
  const handleRantSubmit = async () => {
    await submitRant(rant);
    setRant("");
    loadRants(); // Refresh the list of rants
  };

  // Function to handle rant reporting
  const handleReport = async (id, content) => {
    await reportRant(id, content);
    alert("Rant reported!");
  };

  return (
    <div className="App">
      <h1>RantSpace</h1>
      <textarea
        value={rant}
        onChange={(e) => setRant(e.target.value)}
        placeholder="Type your rant here..."
      />
      <button onClick={handleRantSubmit}>Submit Rant</button>

      <h2>Previous Rants</h2>
      <ul>
        {rants.map((rant) => (
          <li key={rant.id}>
            {rant.content} 
            <button onClick={() => handleReport(rant.id, rant.content)}>Report</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
