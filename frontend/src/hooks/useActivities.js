import { useState, useCallback } from "react";
import { fetchActivities,createActivity } from "../services/activityService";
//import { createActivity } from "../services/activityService";


export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadActivities = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    //const data = await fetchActivities(cursor);
    let data = [];
    try {
      data = await fetchActivities(cursor);
    } catch (err) {
      console.error("Fetch failed:", err);
      setLoading(false);
      return;
    }

    setActivities(prev => [...prev, ...data]);

    if (data.length > 0) {
      setCursor(data[data.length - 1].createdAt);
    } else {
    setHasMore(false); 
  }

    setLoading(false);
  }, [cursor, loading,hasMore]);

  const addActivityOptimistic = async (newActivity) => {
  const tempId = "temp-" + Date.now();

  // 1. Optimistically update UI
  const optimisticItem = {
    ...newActivity,
    _id: tempId,
    createdAt: new Date().toISOString()
  };

  setActivities(prev => [optimisticItem, ...prev]);

  try {
    // 2. Call API
    const saved = await createActivity(newActivity);

    // 3. Replace temp item with real one
    setActivities(prev =>
      prev.map(a => (a._id === tempId ? saved : a))
    );
  } catch (err) {
    console.error("Create activity failed:", err);
    // 4. Rollback on failure
    setActivities(prev => prev.filter(a => a._id !== tempId));
  }
};


  return {
    activities,
    loadActivities,
    loading,
    hasMore,
    addActivityOptimistic
    
  };
};