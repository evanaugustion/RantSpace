import React, { useEffect, useState } from "react";
import { anonymousSignIn } from "./firebaseConfig";
import { submitRant, fetchRants, fetchSimilarRants, fetchNames } from "./firebaseService";
import { Link } from "react-router-dom";

function Landing() {
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
            fetchSimilarRants(identifiedRecipient).then(similar => setSimilarRants(similar));
        } else {
            alert("No recognized recipient found in your rant.");
        }
    };

    return (
        <div className="text-white text-center w-3/4 h-1/3 flex flex-col gap-12 justify-center">
            <h1 className="text-9xl">Your Safe Space for Digital Venting</h1>
            <div className="flex flex-row gap-2 w-3/4 rounded-md border border-white mx-auto">
                <input
                    value={rant}
                    onChange={(e) => setRant(e.target.value)}
                    placeholder="   Type your rant..."
                    className="w-full bg-transparent p-2 text-2xl"
                />
                <Link to="/chat" onClick={handleRantSubmit} className="rounded-md border border-white-400 bg-white px-4 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                </Link>
            </div>
            {/* Optional: Display similar rants */}
            {similarRants.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-2xl">Similar Rants:</h2>
                    <ul className="list-disc">
                        {similarRants.map(r => (
                            <li key={r.id} className="text-lg">{r.content}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Landing;
