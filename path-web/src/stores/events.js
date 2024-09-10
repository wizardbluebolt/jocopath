import { defineStore } from 'pinia'
import { getApprovedEvents, getArchivedEvents, getPendingEvents, createEvent, approveEvent, deleteEvent } from "@/api/events"
import { convertObjects } from "@/api/conversions"
import { defaultArchiveDate } from '@/api/datetimeops'; 

// Sort events so that the earliest appears first
function compareEvents(pEvent1, pEvent2) {
    if (pEvent1.Date > pEvent2.Date) {
        return 1;
    }
    if (pEvent1.Date < pEvent2.Date) {
        return -1;
    }
    return 0;
}

export const useEventStore = defineStore('event', {
    state: () => ({
        approvedEvents: [],
        pendingEvents: [],
        archivedEvents: [],
        currEvent: null
    }),
    getters: {
        getApprovedEvents: (state) => state.approvedEvents,
        getPendingEvents: (state) => state.pendingEvents,
        getArchivedEvents: (state) => state.archivedEvents,
        getCurrEvent: (state) => state.currEvent
    },
    actions: {
        async fetchApprovedEvents() {
            try {
                const response = await getApprovedEvents();
                this.approvedEvents = convertObjects(response.data).sort(compareEvents);
            } catch (error) {
                console.log("Error on fetch approved events");
                console.error(error);
            }
        },
        async fetchArchivedEvents() {
            try {
                let expDate = defaultArchiveDate();
                const response = await(getArchivedEvents(expDate));
                this.archivedEvents = convertObjects(response.data).sort(compareEvents);
            } catch (error) {
                console.log("Error on fetch archived events");
                console.error(error);
            }
        },
        async fetchPendingEvents(pToken) {
            try {
                const response = await getPendingEvents(pToken);
                this.pendingEvents =  convertObjects(response.data).sort(compareEvents);
            } catch(error) {
                console.log("Error on fetch pending events")
                console.error(error);
            }
        },
        async saveEvent(pToken) {
            try {
                await createEvent(pToken, this.currEvent);
                this.newEvent();
                let response = await getApprovedEvents();
                this.approvedEvents = convertObjects(response.data).sort(compareEvents);
                response = await getPendingEvents(pToken);
                this.pendingEvents = convertObjects(response.data).sort(compareEvents);
                let expDate = defaultArchiveDate();
                response = await(getArchivedEvents(expDate));
                this.archivedEvents = convertObjects(response.data).sort(compareEvents);
            } catch (error) {
                console.log("Error on create event")
                console.error(error);
            }
        },
        async approveEvent(pToken) {
            try {
                await approveEvent(pToken, this.currEvent.EventID);
                this.currEvent = null;
            } catch (error) {
                console.log("Error on approve event " + this.currEvent.EventID)
                console.error(error);
            }
        },
        async deleteEvent(pToken) {
            try {
                await deleteEvent(pToken, this.currEvent.EventID);
                this.currEvent = null;
            } catch (error) {
                console.log("Error on delete event " + this.currEvent.EventID)
                console.error(error);
            }
        },
        newEvent() {
            let newEvent = {
                EventID: crypto.randomUUID(),
                Headline: "",
                Description: "",
                WebURL: "",
                Date: null,
                EndDate: null,
                Location: "",
                ContactName: "",
                ContactEMail: "",
                ContactPhone: ""
            };
            this.currEvent = newEvent;
        },
        selectEvent(pEventID) {
            let tEvent = this.pendingEvents.find(tEvent => tEvent.EventID === pEventID );
            this.currEvent = tEvent;
        },
        selectApprovedEvent(pEventID) {
            let tEvent = this.approvedEvents.find(tEvent => tEvent.EventID === pEventID);
            this.currEvent = tEvent;
        },
        selectArchivedEvent(pEventID) {
            let tEvent = this.archivedEvents.find(tEvent => tEvent.EventID === pEventID);
            this.currEvent = tEvent;
        }
    }
})
