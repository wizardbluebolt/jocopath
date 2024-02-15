<template>
    <h2 style="text-align: center; padding: 4px;">Review Submissions</h2>
    <Auth></Auth>
    <v-card-text v-if="userStore.getIsReviewer">
        <v-row dense no-gutters>
            <v-radio-group inline hide-details v-model="listMode">
                <v-radio label="Pending" value="Pending"></v-radio>
                <v-radio label="Approved" value="Approved"></v-radio>
            </v-radio-group>
        </v-row>
    </v-card-text>
    <v-tabs v-if="userStore.getIsReviewer" 
        v-model="viewTab" fixed-tabs 
        bg-color="primary" color="yellow" slider-color="yellow">
        <v-tab value="news">News ({{ newsList.length }})</v-tab>
        <v-tab value="events">Events ({{ eventsList.length }})</v-tab>
        <v-tab value="helpwanted">Help Wanted ({{ helpList.length }})</v-tab>
        <v-tab value="services">Services ({{ servicesList.length }})</v-tab>
    </v-tabs>
    <v-card-text v-if="userStore.getIsReviewer" class="text-body-1">
        <v-window v-model="viewTab">
            <v-window-item value="news"> 
                <v-card variant="outlined" v-for="newsItem in newsList" :key="newsItem.NewsID">
                    <v-card-title v-if="!editMode">{{ newsItem.Headline }}</v-card-title>
                    <v-card-text v-if="!editMode">
                        <p class="pa-4">{{ newsItem.Description }}</p>
                        <p class="pa-4">
                            <b>News Date: </b>{{ formatDateTime(newsItem.Date) }}
                            <b>Expires: </b>{{ formatDateTime(newsItem.ExpirationDate) }}</p>
                        <p v-if="newsItem.WebURL.length > 0">
                            <b>Web URL: </b>{{ newsItem.WebURL }}</p>
                        <p v-if="newsItem.ContactName.length > 0">
                            <b>Contact: </b>{{ newsItem.ContactName }} {{ newsItem.ContactPhone }} {{ newsItem.ContactEMail }}</p>
                    </v-card-text>
                    <v-card-actions v-if="!editMode">
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" area-label="Approve News" icon
                                    @click="doApproveNews(newsItem.NewsID)">
                                    <v-icon color="grey-lighten-1">mdi-check-decagram</v-icon>
                                </v-btn>
                            </template>
                            <span>Approve news item</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Edit News" icon
                                    @click="doEditNews(newsItem.NewsID)">
                                    <v-icon color="grey-lighten-1">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit news item</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Delete News" icon
                                    @click="doDeleteNews(newsItem.NewsID)">
                                    <v-icon color="grey-lighten-1">mdi-trash-can</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete news item</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode != 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Cancel News Approval" icon
                                    @click="doCancelNews(newsItem.NewsID)">
                                    <v-icon color="grey-lighten-1">mdi-cancel</v-icon>
                                </v-btn>
                            </template>
                            <span>Cancel news item approval</span>
                        </v-tooltip>
                    </v-card-actions>
                    <NewsForm v-if="editMode && (newsItem.NewsID === currNews.NewsID)" 
                        @formSubmitted="newsFormSubmitted"
                        @formEditCancelled="doCancelEditNews">
                    </NewsForm>                
                </v-card>
            </v-window-item>
            <v-window-item value="events">
                <v-card variant="outlined" v-for="eventItem in eventsList" :key="eventItem.EventID">
                    <v-card-title v-if="!editMode">{{ eventItem.Headline }}</v-card-title>
                    <v-card-text v-if="!editMode">
                        <p class="pa-4">{{ eventItem.Description }}</p>
                        <p class="pa-4">
                            <b>Event Date: </b>{{ formatDateTimeRange(eventItem.Date, eventItem.EndDate) }}</p>
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
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Approve Event" icon
                                    @click="doApproveEvent(eventItem.EventID)">
                                    <v-icon color="grey-lighten-1">mdi-check-decagram</v-icon>
                                </v-btn>
                            </template>
                            <span>Approve event</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Edit Event" icon
                                    @click="doEditEvent(eventItem.EventID)">
                                    <v-icon color="grey-lighten-1">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit event</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Delete Event" icon
                                    @click="doDeleteEvent(eventItem.EventID)">
                                    <v-icon color="grey-lighten-1">mdi-trash-can</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete event</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode != 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Cancel Event Approval" icon
                                    @click="doCancelEvent(eventItem.EventID)">
                                    <v-icon color="grey-lighten-1">mdi-cancel</v-icon>
                                </v-btn>
                            </template>
                            <span>Cancel event approval</span>
                        </v-tooltip>
                    </v-card-actions>
                    <EventForm v-if="editMode && (eventItem.EventID === currEvent.EventID)" 
                        @formSubmitted="eventFormSubmitted"
                        @formEditCancelled="doCancelEditEvent">
                    </EventForm>
                </v-card>
            </v-window-item>
            <v-window-item value="helpwanted">
                <v-card variant="outlined" v-for="helpItem in helpList" :key="helpItem.HelpID">
                    <v-card-title v-if="!editMode">{{ helpItem.Headline }}</v-card-title>
                    <v-card-text v-if="!editMode">
                        <p class="pa-4">{{ helpItem.Description }}</p>
                        <p class="pa-4">
                            <b>Help Date: </b>{{ formatDateTime(helpItem.Date) }}
                            <b>Expires: </b>{{ formatDateTime(helpItem.ExpirationDate) }}</p>
                        <p v-if="helpItem.WebURL.length > 0">
                            <b>Web URL: </b>{{ helpItem.WebURL }}</p>
                        <p v-if="helpItem.ContactName.length > 0">
                            <b>Contact: </b>{{ helpItem.ContactName }} {{ helpItem.ContactPhone }} {{ helpItem.ContactEMail }}</p>
                        <p><b>Publish Contact Information with Help Wanted Item: </b>{{ helpItem.PublishContact }}</p>
                    </v-card-text>
                    <v-card-actions v-if="!editMode">
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Approve Help Wanted" icon
                                    @click="doApproveHelp(helpItem.HelpID)">
                                    <v-icon color="grey-lighten-1">mdi-check-decagram</v-icon>
                                </v-btn>
                            </template>
                            <span>Approve help wanted item</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Edit Help Wanted" icon
                                    @click="doEditHelp(helpItem.HelpID)">
                                    <v-icon color="grey-lighten-1">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit help wanted item</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Delete Help Wanted" icon
                                    @click="doDeleteHelp(helpItem.HelpID)">
                                    <v-icon color="grey-lighten-1">mdi-trash-can</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete help wanted item</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode != 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Cancel Help Wanted Approval" icon
                                    @click="doCancelHelp(helpItem.HelpID)">
                                    <v-icon color="grey-lighten-1">mdi-cancel</v-icon>
                                </v-btn>
                            </template>
                            <span>Cancel help wanted item approval</span>
                        </v-tooltip>
                    </v-card-actions>
                    <HelpForm v-if="editMode && (helpItem.HelpID === currHelp.HelpID)" 
                        @formSubmitted="helpFormSubmitted"
                        @formEditCancelled="doCancelEditHelp">
                    </HelpForm>                
                </v-card>
            </v-window-item>
            <v-window-item value="services">
                <v-card variant="outlined" v-for="serviceItem in servicesList" :key="serviceItem.ServiceID">
                    <v-card-title v-if="!editMode">{{ serviceItem.ServiceName }}</v-card-title>
                    <v-card-text v-if="!editMode">
                        <p class="pa-4">{{ serviceItem.Description }}</p>
                        <p v-if="serviceItem.WebURL.length > 0">
                            <b>Web URL: </b>{{ serviceItem.WebURL }}
                        </p>
                        <p v-for="locationItem in serviceItem.LocationItems">
                            <b>Location: </b>{{ locationItem.Location }} {{ locationItem.Address }} {{ locationItem.Phone }}
                        </p>
                        <p v-if="serviceItem.ContactName.length > 0">
                            <b>Contact: </b>{{ serviceItem.ContactName }} {{ serviceItem.ContactPhone }} {{ serviceItem.ContactEMail }}
                        </p>
                    </v-card-text>
                    <v-card-actions v-if="!editMode">
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Approve Service" icon
                                    @click="doApproveService(serviceItem.ServiceID)">
                                    <v-icon color="grey-lighten-1">mdi-check-decagram</v-icon>
                                </v-btn>
                            </template>
                            <span>Approve service</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Edit Service" icon
                                    @click="doEditService(serviceItem.ServiceID)">
                                    <v-icon color="grey-lighten-1">mdi-pencil</v-icon>
                                </v-btn>
                            </template>
                            <span>Edit service</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode == 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Delete Service" icon
                                    @click="doDeleteService(serviceItem.ServiceID)">
                                    <v-icon color="grey-lighten-1">mdi-trash-can</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete service</span>
                        </v-tooltip>
                        <v-tooltip location="end" v-if="listMode != 'Pending'">
                            <template v-slot:activator="{ props }">
                                <v-btn v-bind="props" density="compact" aria-label="Cancel Service Approval" icon
                                    @click="doCancelService(serviceItem.ServiceID)">
                                    <v-icon color="grey-lighten-1">mdi-cancel</v-icon>
                                </v-btn>
                            </template>
                            <span>Cancel service approval</span>
                        </v-tooltip>
                    </v-card-actions>
                    <ServiceForm v-if="editMode && (serviceItem.ServiceID === currService.ServiceID)" 
                        @formSubmitted="serviceFormSubmitted"
                        @formEditCancelled="doCancelEditService">
                    </ServiceForm>
                </v-card>
            </v-window-item>
        </v-window>
    </v-card-text>
</template>

<script setup>
    import { ref, computed, onMounted } from "vue";
    import EventForm from "./EventForm.vue";
    import { useEventStore } from "@/stores/events";
    import NewsForm from './NewsForm.vue';
    import { useNewsStore } from "@/stores/news";
    import HelpForm from "./HelpForm.vue";
    import { useHelpStore } from "@/stores/help";
    import ServiceForm from "./ServiceForm.vue";
    import { useServiceStore } from "@/stores/services";
    import { useUserStore } from "@/stores/user";
    import Auth from "./Auth.vue";
    import { formatDateTime, formatDateTimeRange } from '@/api/datetimeops';


    const eventStore = useEventStore();
    const newsStore = useNewsStore();
    const helpStore = useHelpStore();
    const serviceStore = useServiceStore();
    const userStore = useUserStore();

    const viewTab = ref(null);
    const editMode = ref(false);
    const listMode = ref("Pending");

    const eventsList = computed(() => {
        if (listMode.value == "Pending") {
            return eventStore.pendingEvents;
        } else {
            return eventStore.approvedEvents;
        }
    });
    const currEvent = computed(() => eventStore.currEvent);

    const newsList = computed(() => {
        if (listMode.value == "Pending") {
            return newsStore.pendingNews;
        } else {
            return newsStore.approvedNews;
        }
    });
    const currNews = computed(() => newsStore.currNews);

    const helpList = computed(() => {
        if (listMode.value == "Pending") {
            return helpStore.pendingHelp;
        } else {
            return helpStore.approvedHelp;
        }
    });
    const currHelp = computed(() => helpStore.currHelp);

    const servicesList = computed(() => {
        if (listMode.value == "Pending") {
            return serviceStore.pendingServices;
        } else {
            return serviceStore.approvedServices;
        }
    });
    const currService = computed(() => serviceStore.currService);

    const components = {
        EventForm,
        NewsForm,
        HelpForm,
        ServiceForm,
        Auth,
    };

    async function doApproveEvent(pEventID) {
        eventStore.selectEvent(pEventID);
        await eventStore.approveEvent(userStore.getAccessToken);
        await eventStore.fetchPendingEvents(userStore.getAccessToken);
        await eventStore.fetchApprovedEvents();
    }

    async function doApproveNews(pNewsID) {
        newsStore.selectNews(pNewsID);
        await newsStore.approveNews(userStore.getAccessToken);
        await newsStore.fetchPendingNews(userStore.getAccessToken);
        await newsStore.fetchApprovedNews();
    }

    async function doApproveHelp(pHelpID) {
        helpStore.selectHelp(pHelpID);
        await helpStore.approveHelp(userStore.getAccessToken);
        await helpStore.fetchPendingHelp(userStore.getAccessToken);
        await helpStore.fetchApprovedHelp();
    }

    async function doApproveService(pServiceID) {
        serviceStore.selectService(pServiceID);
        await serviceStore.approveService(userStore.getAccessToken);
        await serviceStore.fetchPendingServices(userStore.getAccessToken);
        await serviceStore.fetchApprovedServices();
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

    async function doDeleteNews(pNewsID) {
        let confMessage = "Are you sure you want to delete this news item?";
        let confResult = window.confirm(confMessage);
        if (confResult) {
            newsStore.selectNews(pNewsID);
            await newsStore.deleteNews(userStore.getAccessToken);
            await newsStore.fetchPendingNews(userStore.getAccessToken);
        }
    }

    async function doDeleteHelp(pHelpID) {
        let confMessage = "Are you sure you want to delete this help wanted item?";
        let confResult = window.confirm(confMessage);
        if (confResult) {
            helpStore.selectHelp(pHelpID);
            await helpStore.deleteHelp(userStore.getAccessToken);
            await helpStore.fetchPendingHelp(userStore.getAccessToken);
        }
    }

    async function doDeleteService(pServiceID) {
        let confMessage = "Are you sure you want to delete this service?";
        let confResult = window.confirm(confMessage);
        if (confResult) {
            serviceStore.selectService(pServiceID);
            await serviceStore.deleteService(userStore.getAccessToken);
            await serviceStore.fetchPendingServices(userStore.getAccessToken);
        }
    }

    function doEditEvent(pEventID) {
        editMode.value = true;
        eventStore.selectEvent(pEventID);
    } 

    function doEditNews(pNewsID) {
        editMode.value = true;
        newsStore.selectNews(pNewsID);
    }

    function doEditHelp(pHelpID) {
        editMode.value = true;
        helpStore.selectHelp(pHelpID);
    }

    function doEditService(pServiceID) {
        editMode.value = true;
        serviceStore.selectService(pServiceID);
    } 

    async function doCancelEvent(pEventID) {
        if (listMode.value == "Pending") {
            eventStore.selectEvent(pEventID);
        } else {
            eventStore.selectApprovedEvent(pEventID);
        }
        await eventStore.saveEvent(userStore.getAccessToken);
        await eventStore.fetchPendingEvents(userStore.getAccessToken);
        await eventStore.fetchApprovedEvents();
    }

    async function doCancelNews(pNewsID) {
        if (listMode.value == "Pending") {
            newsStore.selectNews(pNewsID);
        } else {
            newsStore.selectApprovedNews(pNewsID);
        }
        await newsStore.saveNews(userStore.getAccessToken);
        await newsStore.fetchPendingNews(userStore.getAccessToken);
        await newsStore.fetchApprovedNews();
    }

    async function doCancelHelp(pHelpID) {
        if (listMode.value == "Pending") {
            helpStore.selectHelp(pHelpID);
        } else {
            helpStore.selectApprovedHelp(pHelpID);
        }
        await helpStore.saveHelp(userStore.getAccessToken);
        await helpStore.fetchPendingHelp(userStore.getAccessToken);
        await helpStore.fetchApprovedHelp();
    }

    async function doCancelService(pServiceID) {
        if (listMode.value == "Pending") {
            serviceStore.selectService(pServiceID);
        } else {
            serviceStore.selectApprovedService(pServiceID);
        }
        await serviceStore.saveService(userStore.getAccessToken);
        await serviceStore.fetchPendingServices(userStore.getAccessToken);
        await serviceStore.fetchApprovedServices();
    }

    async function doCancelEditEvent() {
        await eventStore.fetchPendingEvents(userStore.getAccessToken);
        setTimeout(() => {
            editMode.value = false;
        }, 1000);
    }

    async function doCancelEditNews() {
        await newsStore.fetchPendingNews(userStore.getAccessToken);
        setTimeout(() => {
            editMode.value = false;
        }, 1000)
    }

    async function doCancelEditHelp() {
        await helpStore.fetchPendingHelp(userStore.getAccessToken);
        setTimeout(() => {
            editMode.value = false;
        }, 1000)
    }

    async function doCancelEditService() {
        await serviceStore.fetchPendingServices(userStore.getAccessToken);
        setTimeout(() => {
            editMode.value = false;
        }, 1000);
    }

    async function eventFormSubmitted() {
        setTimeout(() => {
            editMode.value = false;
        }, 1000);
    }

    async function newsFormSubmitted() {
        setTimeout(() => {
            editMode.value = false;
        }, 1000);
    }

    async function helpFormSubmitted() {
        setTimeout(() => {
            editMode.value = false;
        }, 1000);
    }

    async function serviceFormSubmitted() {
        setTimeout(() => {
            editMode.value = false;
        }, 1000);
    }

    onMounted(async function () {
        await userStore.userLoggedIn();
        if (eventStore.getPendingEvents.length === 0) {
            await eventStore.fetchPendingEvents(userStore.getAccessToken);
            await eventStore.fetchApprovedEvents();
        };
        if (newsStore.getPendingNews.length === 0) {
            await newsStore.fetchPendingNews(userStore.getAccessToken);
            await newsStore.fetchApprovedNews();
        };
        if (helpStore.getPendingHelp.length === 0) {
            await helpStore.fetchPendingHelp(userStore.getAccessToken);
            await helpStore.fetchApprovedHelp();
        };
        if (serviceStore.getPendingServices.length === 0) {
            await serviceStore.fetchPendingServices(userStore.getAccessToken);
            await serviceStore.fetchApprovedServices();
        };
    });
</script>
