<template>
    <h3 style="text-align: center">Review Submissions</h3>
    <Auth></Auth>
    <v-tabs v-if="userStore.getIsReviewer" v-model="viewTab" fixed-tabs bg-color="primary" slider-color="red">
        <v-tab value="news">News</v-tab>
        <v-tab value="events">Events ({{ pendingEvents.length }})</v-tab>
        <v-tab value="archive">Help Wanted</v-tab>
    </v-tabs>
    <v-card-text v-if="userStore.getIsReviewer">
        <v-window v-model="viewTab">
            <v-window-item value="news"> </v-window-item>
            <v-window-item value="events">
                <v-card variant="outlined" v-for="eventItem in pendingEvents" :key="eventItem.EventID">
                    <v-card-title v-if="!editMode">{{ eventItem.Headline }}</v-card-title>
                    <v-card-text v-if="!editMode">
                        <p class="pa-4">{{ eventItem.Description }}</p>
                        <p class="pa-4">
                            <b>Event Date: </b>{{ formatDateTime(eventItem.Date) }}</p>
                        <p v-if="eventItem.Location.length > 0">
                            <b>Location: </b>{{ eventItem.Location }}
                        </p>
                        <p v-if="eventItem.WebURL.length > 0">
                            <b>Web URL: </b>{{ eventItem.WebURL }}
                        </p>
                        <p v-if="eventItem.ContactName.length > 0">
                            <b>Contact: </b>{{ eventItem.ContactName }} {{ eventItem.ContactPhone }} {{ eventItem.ContactEMail }}
                        </p>
                    </v-card-text>
                    <v-card-actions v-if="!editMode">
                        <v-tooltip location="end">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Approve Event" icon
                                    @click="doApproveEvent(eventItem.EventID)">
                                    <v-icon color="grey-lighten-1">mdi-check-decagram</v-icon>
                                </v-btn>
                            </template>
                            <span>Approve event</span>
                        </v-tooltip>
                        <v-tooltip location="end">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Edit Event" icon
                                    @click="doEditEvent(eventItem.EventID)">
                                    <v-icon color="grey-lighten-1">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit event</span>
                        </v-tooltip>
                        <v-tooltip location="end">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Delete Event" icon
                                    @click="doDeleteEvent(eventItem.EventID)">
                                    <v-icon color="grey-lighten-1">mdi-trash-can</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete event</span>
                        </v-tooltip>
                    </v-card-actions>
                    <EventForm v-if="editMode && (eventItem.EventID === currEvent.EventID)" 
                        @formSubmitted="eventFormSubmitted"
                        @formEditCancelled="doCancelEditEvent">
                    </EventForm>
                </v-card>
            </v-window-item>
            <v-window-item value="archive">
                <v-card>
                    <v-card-text> News and Event Archive </v-card-text>
                </v-card>
            </v-window-item>
        </v-window>
    </v-card-text>
</template>

<script setup>
    import { ref, computed, onMounted } from "vue";
    import EventForm from "./EventForm.vue";
    import { useEventStore } from "@/stores/events";
    import { useUserStore } from "@/stores/user";
    import Auth from "./Auth.vue";
    import { formatDateTime } from '@/api/datetimeops';


    const eventStore = useEventStore();
    const userStore = useUserStore();

    const pendingEvents = computed(() => eventStore.pendingEvents);
    const currEvent = computed(() => eventStore.currEvent);

    const viewTab = ref(null);
    const editMode = ref(false);

    const components = {
        EventForm,
        Auth,
    };

    async function doApproveEvent(pEventID) {
        eventStore.selectEvent(pEventID);
        await eventStore.approveEvent(userStore.getAccessToken);
        await eventStore.fetchPendingEvents(userStore.getAccessToken);
    }

    async function doDeleteEvent(pEventID) {
        let confMessage = "Are you sure you want to delete this event?";
        let confResult = window.confirm(confMessage);
        if (confResult) {
            eventStore.selectEvent(pEventID);
            await eventStore.deleteEvent(userStore.getAccessToken);
            await eventStore.fetchPendingEvents(userStore.getAccessToken);
        }
    }

    function doEditEvent(pEventID) {
        editMode.value = true;
        eventStore.selectEvent(pEventID);
    }

    async function doCancelEditEvent() {
        await eventStore.fetchPendingEvents(userStore.getAccessToken);
        setTimeout(() => {
            editMode.value = false;
        }, 1000);
    }

    async function eventFormSubmitted() {
        setTimeout(() => {
            editMode.value = false;
        }, 1000);
    }

    onMounted(async function () {
        await userStore.userLoggedIn();
        if (eventStore.getPendingEvents.length === 0) {
            await eventStore.fetchPendingEvents(userStore.getAccessToken);
        }
    });
</script>
