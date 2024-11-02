import React, { useEffect, useState } from "react";
import { anonymousSignIn } from "./firebaseConfig";
import { submitRant, fetchRants, findSimilarRants } from "./firebaseService";

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

  // Submit a new rant and fetch similar rants
  const handleRantSubmit = async () => {
    await submitRant(rant);
    setRant("");
    loadRants();
    fetchSimilarRants(rant); // Fetch similar rants after submission
  };

  // Fetch similar rants based on current rant
  const fetchSimilarRants = async (input) => {
    const matches = await findSimilarRants(input);
    setSimilarRants(matches);
  };

  return (
    <div className="App">
      <h1>RantSpace</h1>
      <textarea
        value={rant}
        onChange={(e) => {
          setRant(e.target.value);
          fetchSimilarRants(e.target.value); // Check for similar rants as you type
        }}
        placeholder="Type your rant here..."
      />
      <button onClick={handleRantSubmit}>Submit Rant</button>

      <h2>Similar Rants</h2>
      <ul>
        {similarRants.map((rant) => (
          <li key={rant.id}>
            {rant.content} - Similarity Score: {(rant.score * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
