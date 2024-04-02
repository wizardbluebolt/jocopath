import { defineStore } from 'pinia'
import { getApprovedServices, getPendingServices, createService, approveService, deleteService } from "@/api/services"
import { convertObjects } from "@/api/conversions"

const separator = "%|%";

// Parse multiple location items from single strings per attribute
function decodeLocationItems(pServiceData) {
    let locList = pServiceData.Locations.split(separator);
    let addrList = pServiceData.Addresses.split(separator);
    let phoneList = pServiceData.Phones.split(separator);
    let locations = [];
    for (var idx = 0; idx < locList.length; idx++) {
        let tLocItem = {
            Location: locList[idx],
            Address: addrList[idx],
            Phone: phoneList[idx]
        };
        if (tLocItem.Location.length > 0) locations.push(tLocItem);
    };
    return locations;
}

function convertDBService(pDBService) {
    let tService = {
        "ServiceID": pDBService.ServiceID,
        "ServiceName": pDBService.ServiceName,
        "Description": pDBService.Description,
        "LocationItems": decodeLocationItems(pDBService),
        "ServiceEMail": pDBService.ServiceEMail,
        "ContactName": pDBService.ContactName,
        "ContactPhone": pDBService.ContactPhone,
        "ContactEMail": pDBService.ContactEMail,
        "WebURL": pDBService.WebURL,
        "Approved": pDBService.Approved
    };
    return tService;
}

function convertResponseData(pData) {
    let tDBItems = convertObjects(pData);
    let tServices = [];
    for (var idx = 0; idx < tDBItems.length; idx++) {
        tServices.push(convertDBService(tDBItems[idx]));
    }
    return tServices;
}

// Combine attributes for multiple location items into single strings for DB
function encodeLocationItems(pServiceData, pLocItems) {
    let locString = "";
    let addrString = "";
    let phoneString = "";
    for (var idx = 0; idx < pLocItems.length; idx++) {
        if (idx > 0) {
            locString += separator;
            addrString += separator;
            phoneString += separator;
        }
        locString += pLocItems[idx].Location;
        addrString += pLocItems[idx].Address;
        phoneString += pLocItems[idx].Phone;
    }
    pServiceData.Locations = locString;
    pServiceData.Addresses = addrString;
    pServiceData.Phones = phoneString;
    return pServiceData;
}

// Sort services so that the latest appears first
function compareService(pService1, pService2) {
    if (pService1.ServiceName < pService2.ServiceName) {
        return -1;
    }
    if (pService1.ServiceName > pService2.ServiceName) {
        return 1;
    }
    return 0;
}

export const useServiceStore = defineStore('service', {
    state: () => ({
        approvedServices: [],
        pendingServices: [],
        currService: null,
        currLocationItem: null
    }),
    getters: {
        getApprovedServices: (state) => state.approvedServices,
        getPendingServices: (state) => state.pendingServices,
        getCurrService: (state) => state.currService,
        getCurrLocationItem: (state) => state.currLocationItem
    },
    actions: {
        async fetchApprovedServices() {
            try {
                const response = await getApprovedServices();
                this.approvedServices = convertResponseData(response.data).sort(compareService);
            } catch (error) {
                console.log("Error on fetch approved services");
                console.error(error);
            }
        },
        async fetchPendingServices(pToken) {
            try {
                const response = await getPendingServices(pToken);
                this.pendingServices = convertResponseData(response.data).sort(compareService);
            } catch(error) {
                console.log("Error on fetch pending services")
                console.error(error);
            }
        },
        async saveService(pToken) {
            try {
                let dbService = {
                    "ServiceID": this.currService.ServiceID,
                    "ServiceName": this.currService.ServiceName,
                    "Description": this.currService.Description,
                    "ServiceEMail": this.currService.ServiceEMail,
                    "ContactName": this.currService.ContactName,
                    "ContactPhone": this.currService.ContactPhone,
                    "ContactEMail": this.currService.ContactEMail,
                    "WebURL": this.currService.WebURL
                }
                dbService = encodeLocationItems(dbService, this.currService.LocationItems);
                await createService(pToken, dbService);
                this.newService();
                let response = await getApprovedServices();
                this.approvedServices = convertResponseData(response.data).sort(compareService);
                response = await getPendingServices(pToken);
                this.pendingServices = convertResponseData(response.data).sort(compareService);
            } catch (error) {
                console.log("Error on create service")
                console.error(error);
            }
        },
        async approveService(pToken) {
            try {
                await approveService(pToken, this.currService.ServiceID);
                this.currService = null;
            } catch (error) {
                console.log("Error on approve service " + this.currService.ServiceID);
                console.error(error);
            }
        },
        async deleteService(pToken) {
            try {
                await deleteService(pToken, this.currService.ServiceID);
                this.currService = null;
            } catch (error) {
                console.log("Error on delete service " + this.currService.ServiceID);
                console.error(error);
            }
        },
        newService() {
            let newService = {
                ServiceID: crypto.randomUUID(),
                ServiceName: "",
                Description: "",
                ServiceEMail: "",
                LocationItems: [],
                ContactName: "",
                ContactPhone: "",
                ContactEMail: "",
                WebURL: ""
            };
            this.currService = newService;
        },
        addLocationItem() {
            let tItem = {
                Location: "",
                Address: "",
                Phone: ""
            };
            this.currService.LocationItems.push(tItem);
            this.selectLocationItem(this.currService.LocationItems.length - 1);
        },
        removeLocationItem(pIndex) {
            if (pIndex >= 0 & pIndex < this.currService.LocationItems.length) {
                this.currService.LocationItems.splice(pIndex, 1);
            }
            this.selectLocationItem(-1);
        },
        selectService(pServiceID) {
            let tService = this.pendingServices.find(tService => tService.ServiceID === pServiceID );
            this.currService = tService;
            this.selectLocationItem(-1);
        },
        selectLocationItem(pIndex) {
            if (pIndex === -1 | pIndex >= this.currService.LocationItems.length) {
                this.currLocationItem = null;
            } else {
                this.currLocationItem = 
                    this.currService.LocationItems[pIndex];
            }
        },
        selectApprovedService(pServiceID) {
            let tService = this.approvedServices.find(tService => tService.ServiceID === pServiceID);
            this.currService = tService;
            this.selectLocationItem(0);
        }
    }
})
