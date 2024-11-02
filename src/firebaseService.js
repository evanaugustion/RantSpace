import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Collection references
const rantsCollection = collection(db, "rants");

// Function to submit a rant
export const submitRant = async (rantData) => {
  try {
    const rant = {
      content: rantData.content,
      recipient: rantData.recipient, // Include the recipient
      timestamp: Timestamp.now()
    };
    await addDoc(rantsCollection, rant);
    console.log("Rant added successfully!");
  } catch (error) {
    console.error("Error adding rant:", error);
  }
};

// Function to fetch all rants
export const fetchRants = async () => {
  try {
    const querySnapshot = await getDocs(rantsCollection);
    const rants = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    return rants;
  } catch (error) {
    console.error("Error fetching rants:", error);
    return [];
  }
};

// Helper function to calculate similarity based on shared words
function calculateSimilarity(input, rantContent) {
  const inputWords = input.toLowerCase().split(" ");
  const rantWords = rantContent.toLowerCase().split(" ");
  const matchingWords = inputWords.filter(word => rantWords.includes(word));
  return matchingWords.length / inputWords.length;
}

// Function to find similar rants
// Function to find similar rants, excluding the current rant by content
export const findSimilarRants = async (recipient, currentRantContent) => {
  const allRants = await fetchRants();
  
  // Filter rants by recipient and exclude the current rant content
  const recipientRants = allRants.filter(
    rant => rant.recipient === recipient && rant.content !== currentRantContent
  );

  if (recipientRants.length === 0) {
    return []; // No similar rants found
  }

  // Calculate similarity scores
  const similarityScores = recipientRants.map(rant => ({
    id: rant.id,
    content: rant.content,
    score: calculateSimilarity(recipient, rant.content)
  }));

  // Sort by similarity score in descending order
  similarityScores.sort((a, b) => b.score - a.score);

  return similarityScores.slice(0, 5); // Return top 5 similar rants
};


// Function to fetch all names from Firestore
export const fetchNames = async () => {
  const namesCollection = collection(db, "names");
  const snapshot = await getDocs(namesCollection);
  return snapshot.docs.map(doc => doc.data().name.toLowerCase()); // Return an array of names in lowercase
};
