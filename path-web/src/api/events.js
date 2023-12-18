import httpClient from "./httpClient";

const client = httpClient.httpClient;

const getApprovedEvents = () => client.get("/event");

const getPendingEvents = () => client.get("/eventpending");

const createEvent = (pEvent) => client.post("/event", pEvent);

const approveEvent = (pEventID) => client.put("/event", { pEventID });

const deleteEvent = (pEventID) => client.delete("/event?eventID=" + pEventID);

export {
    getApprovedEvents,
    getPendingEvents,
    createEvent,
    approveEvent,
    deleteEvent
}