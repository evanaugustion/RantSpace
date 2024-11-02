import React, { useEffect, useState } from "react";
import { anonymousSignIn } from "./firebaseConfig";
import { submitRant, fetchRants, fetchNames, findSimilarRants } from "./firebaseService";
import './index.css';

function App() {
  const [rant, setRant] = useState("");
  const [rants, setRants] = useState([]);
  const [similarRants, setSimilarRants] = useState([]);
  const [similarRantsMessage, setSimilarRantsMessage] = useState("");

  useEffect(() => {
    anonymousSignIn();
    loadRants();
  }, []);

  const loadRants = async () => {
    const fetchedRants = await fetchRants();
    setRants(fetchedRants);
  };

  const handleRantSubmit = async () => {
    const names = await fetchNames();
    const identifiedRecipient = names.find(name => rant.toLowerCase().includes(name));

    if (identifiedRecipient) {
      const rantData = {
        content: rant,
        recipient: identifiedRecipient
      };
      await submitRant(rantData);
      setRant("");
      loadRants();

      const similarRants = await findSimilarRants(identifiedRecipient);
      if (similarRants.length > 0) {
        setSimilarRants(similarRants);
        setSimilarRantsMessage("");
      } else {
        setSimilarRants([]);
        setSimilarRantsMessage("That was the first rant about that person.");
      }
    } else {
      alert("No recognized recipient found in your rant.");
    }
  };

  return (
    <div className="bg-gray-800 w-screen min-h-screen flex items-center justify-center font-bsd overflow-hidden">
      <div className="text-white text-center w-3/4 h-auto p-6 flex flex-col gap-8">
        <h1 className="text-6xl md:text-8xl font-bsd">Your Safe Space for Digital Venting</h1>
        <div className="flex flex-row gap-2 w-full max-w-xl mx-auto border border-white rounded-md">
          <input
            value={rant}
            onChange={(e) => setRant(e.target.value)}
            placeholder="Vent it out..."
            className="flex-1 bg-transparent p-4 text-xl font-bsd text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleRantSubmit}
            className="bg-white rounded-md px-4 p-2 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
            </svg>
          </button>
        </div>
        {similarRantsMessage ? (
          <p className="text-lg font-bsd">{similarRantsMessage}</p>
        ) : (
          <div>
            {similarRants.length > 0 ? ( // Only show Rant Mates and the list if there are similar rants
              <>
                <h2 className="text-2xl font-bsd text-gray-400">Rant Mates!</h2>
                <ul className="text-center">
                  {similarRants.map((similarRant) => (
                    <li key={similarRant.id} className="text-4xl font-bsd">{similarRant.content}</li>
                  ))}
                </ul>
              </>
            ) : null} {/* Render nothing if there are no similar rants */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
