import { defineStore } from 'pinia'
import { getApprovedEvents, getPendingEvents, createEvent, approveEvent, deleteEvent } from "@/api/events"
import { convertObjects } from "@/api/conversions"
import { currentDateTime } from '@/api/datetimeops'

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
        currEvent: null
    }),
    getters: {
        getApprovedEvents: (state) => state.approvedEvents,
        getPendingEvents: (state) => state.pendingEvents,
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
        }
    }
})
