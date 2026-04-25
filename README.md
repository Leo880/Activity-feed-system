# Activity Feed System (MERN)

## 1) Overview

This project implements a tenant-isolated Activity Feed system using the MERN stack.
It supports high write throughput, cursor-based pagination, infinite scroll UI, and optimistic updates.

---

## 2) Tech Stack

* Backend: Node.js, Express, MongoDB (Mongoose)
* Frontend: React (Hooks only)
* Database: MongoDB
* **Tools:** Postman, Nodemon

---

## 3) Features

### Backend

* Tenant isolation using `x-tenant-id`
* Cursor-based pagination (no skip/offset)
* Compound indexing for performance
* Projection for optimized queries

### Frontend

* Infinite scroll activity feed
* Optimized rendering using hooks
* Loading and empty states

### Advanced

* Optimistic UI updates
* Error handling and rollback logic
* CORS handling

---

## 4) API Endpoints

### Create Activity

POST `/activities`

Headers:

```
x-tenant-id: tenant1
```

Body:

```json
{
  "actorId": "user1",
  "actorName": "Leo",
  "type": "LOGIN"
}
```

---

### Get Activities

GET `/activities?cursor=<ISO_DATE>&limit=20`

---

## 5) How to Run

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 6) System Design

To scale to 50M activities per tenant:

* Indexing: Compound index `{ tenantId, createdAt }` for efficient queries
* Pagination: Cursor-based pagination for high performance
* Sharding: Data partitioned by `tenantId` for horizontal scaling
* Hot Tenant Handling: Heavy tenants can be isolated to separate shards
* Data Retention: TTL index to remove old records automatically
* Real-time Updates: WebSocket preferred over polling for scalability
* Write Scalability: Queue-based async processing (e.g., Kafka, Redis)

---

## 7) Optimistic UI

* Activity is added to UI immediately before API response
* Temporary ID used for tracking
* On success → replaced with server response
* On failure → rollback removes the item

---

## 8) Debugging

### Issue:

```js
useEffect(() => {
  fetchActivities().then(setActivities);
}, [activities]);
```

### Problem:

* Causes infinite loop due to dependency on `activities`

### Fix:

```js
useEffect(() => {
  fetchActivities().then(setActivities);
}, []);
```

### Impact:

* API flooding
* UI slowdown
* Increased server load

---

## 9) Performance Considerations

* Avoided `skip()` pagination
* Used indexing and projection
* Prevented unnecessary React re-renders
* Controlled API calls using `loading` and `hasMore`

---

## 10) Notes

* MongoDB runs locally on `mongodb://127.0.0.1:27017`
* CORS configured for frontend-backend communication
* Tested using Postman and browser

---

## Author

Leo
