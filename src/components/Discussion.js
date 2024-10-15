import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import InputSection from './InputSection';
import DiscussionList from './DiscussionList';
import RelatedDiscussions from './RelatedDiscussion';
import { useTheme } from './ThemeContext'; // Import the theme hook
import './css/Discussion.css';

const Discussion = () => {
  const [newDiscussion, setNewDiscussion] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [category, setCategory] = useState('general');
  const [privateDiscussion, setPrivateDiscussion] = useState(false);
  
  const { theme } = useTheme(); // Access the theme from the context

  // Fetch discussions and listen to real-time updates
  useEffect(() => {
    const discussionsRef = collection(db, 'discussions');
    const unsubscribe = onSnapshot(discussionsRef, (snapshot) => {
      const fetchedDiscussions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiscussions(fetchedDiscussions);
    });

    return () => unsubscribe();
  }, []);

  // Add a new discussion to Firestore
  const addDiscussion = async () => {
    if (newDiscussion.trim()) {
      await addDoc(collection(db, 'discussions'), {
        text: newDiscussion,
        category,
        isPrivate: privateDiscussion,
        createdAt: new Date(),
      });
      setNewDiscussion('');
      setPrivateDiscussion(false);
    }
  };

  // Filter discussions by category
  const filterByCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className={`discussion-page ${theme}`}>
      <h2 className={theme}>Discussion Forum</h2>
      <InputSection 
        newDiscussion={newDiscussion} 
        setNewDiscussion={setNewDiscussion} 
        addDiscussion={addDiscussion} 
        privateDiscussion={privateDiscussion} 
        setPrivateDiscussion={setPrivateDiscussion} 
        filterByCategory={filterByCategory}
      />
      <DiscussionList discussions={discussions} category={category} />
      <RelatedDiscussions />
    </div>
  );
};

export default Discussion;
