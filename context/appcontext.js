import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [likedJobs, setLikedJobs] = useState([]);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) {
        setUser(savedUser);
        const jobs = await AsyncStorage.getItem(`likedJobs_${savedUser}`);
        if (jobs) setLikedJobs(JSON.parse(jobs));
      }
    };
    loadData();
  }, []);

  // Save jobs whenever they change
  useEffect(() => {
    if (user) {
      AsyncStorage.setItem(`likedJobs_${user}`, JSON.stringify(likedJobs));
    }
  }, [likedJobs, user]);

  const likeJob = (job) => {
    if (!likedJobs.some((j) => j.id === job.id)) {
      setLikedJobs([...likedJobs, job]);
    }
  };

  const removeJob = (id) => {
    setLikedJobs(likedJobs.filter((j) => j.id !== id));
  };

  const clearAll = async () => {
    if (user) {
      await AsyncStorage.removeItem(`likedJobs_${user}`);
    }
    await AsyncStorage.removeItem("user");
    setUser(null);
    setLikedJobs([]);
  };

  return (
    <AppContext.Provider value={{ user, setUser, likedJobs, likeJob, removeJob, clearAll }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);