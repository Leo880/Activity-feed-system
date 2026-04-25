export const fetchActivities = async (cursor) => {
  let url = "http://localhost:5000/activities";

  if (cursor) {
    url += `?cursor=${cursor}`;
  }

  const res = await fetch(url, {
    headers: {
      "x-tenant-id": "tenant1"
    }
  });

  return res.json();
};

export const createActivity = async (data) => {
  const res = await fetch("http://localhost:5000/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-tenant-id": "tenant1"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};