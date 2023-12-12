import { defineStore } from 'pinia'
import { getApprovedEvents, getPendingEvents, createEvent, approveEvent, deleteEvent } from "@/api/events"
import { convertObjects } from "@/api/conversions"

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
                this.approvedEvents = convertObjects(response.data);
            } catch (error) {
                console.log("Error on fetch approved events");
                console.error(error);
            }
        },
        async fetchPendingEvents() {
            try {
                const response = await getPendingEvents();
                this.pendingEvents =  convertObjects(response.data);
            } catch(error) {
                console.log("Error on fetch pending events")
                console.error(error);
            }
        },
        async saveEvent() {
            try {
                await createEvent(this.currEvent);
                this.newEvent();
            } catch (error) {
                console.log("Error on create event")
                console.error(error);
            }
        },
        async approveEvent() {
            try {
                await approveEvent(this.currEvent.EventID);
                this.currEvent = null;
            } catch (error) {
                console.log("Error on approve event " + state.currEvent.EventID)
                console.error(error);
            }
        },
        async deleteEvent() {
            try {
                await deleteEvent(this.currEvent.EventID);
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
                Date: new Date(),
                Location: "",
                ContactName: "",
                ContactEMail: "",
                ContactPhone: ""
            };
            this.currEvent = newEvent;
        }
    }
})
