// src/firebaseService.js
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Collection references
const rantsCollection = collection(db, "rants");
const reportedRantsCollection = collection(db, "reportedRants");

// Function to submit a rant
export const submitRant = async (content) => {
  try {
    const rant = {
      content: content,
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

// Function to report a rant
export const reportRant = async (rantId, content) => {
  try {
    const report = {
      content: content,
      timestamp: Timestamp.now(),
      originalId: rantId
    };
    await addDoc(reportedRantsCollection, report);
    console.log("Rant reported successfully!");
  } catch (error) {
    console.error("Error reporting rant:", error);
  }
};
