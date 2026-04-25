import { useEffect } from "react";
import { useActivities } from "../hooks/useActivities";

const ActivityFeed = () => {
  const { activities, loadActivities, loading ,hasMore} = useActivities();

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // infinite scroll
  //const handleScroll = () => {
    //if (
      //window.innerHeight + window.scrollY >= document.body.offsetHeight - 50
    //) {
      //loadActivities();
    //}
  //};

  /*useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });*/

  useEffect(() => {
  const handleScroll = () => {
    if (loading||!hasMore) return;

    const bottom =
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100;

    if (bottom) {
      loadActivities();
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
    }, [loadActivities, loading,hasMore]);

  return (
    <div>
      <h2>Activity Feed</h2>

      {activities.map((a) => (
        <div key={a._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <p><strong>{a.actorName}</strong> did {a.type}</p>
          <p>{new Date(a.createdAt).toLocaleString()}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}

      {!loading && activities.length === 0 && <p>No activities found</p>}
      {!hasMore && <p>No more activities</p>}
    </div>
  );
};

export default ActivityFeed;