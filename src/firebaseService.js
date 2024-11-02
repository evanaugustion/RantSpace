// src/firebaseService.js
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
export const findSimilarRants = async (input) => {
  const allRants = await fetchRants();
  const similarityScores = allRants.map(rant => ({
    id: rant.id,
    content: rant.content,
    score: calculateSimilarity(input, rant.content)
  }));
  
  // Sort by similarity score in descending order
  similarityScores.sort((a, b) => b.score - a.score);
  
  // Return top 5 similar rants
  return similarityScores.slice(1, 2);
};

// Function to fetch all names from Firestore
export const fetchNames = async () => {
  const namesCollection = collection(db, "names");
  const snapshot = await getDocs(namesCollection);
  return snapshot.docs.map(doc => doc.data().name.toLowerCase()); // Return an array of names in lowercase
};


