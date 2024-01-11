import { defineStore } from 'pinia'
import { getApprovedHelp, getPendingHelp, createHelp, approveHelp, deleteHelp } from "@/api/help"
import { convertObjects } from "@/api/conversions"
import { currentDateTime, defaultExpirationDate } from '@/api/datetimeops'

// Sort help wanted so that the latest appears first
function compareHelp(pHelp1, pHelp2) {
    if (pHelp1.Date > pHelp2.Date) {
        return -1;
    }
    if (pHelp1.Date < pHelp2.Date) {
        return 1;
    }
    return 0;
}

export const useHelpStore = defineStore('help', {
    state: () => ({
        approvedHelp: [],
        pendingHelp: [],
        currHelp: null
    }),
    getters: {
        getApprovedHelp: (state) => state.approvedHelp,
        getPendingHelp: (state) => state.pendingHelp,
        getCurrHelp: (state) => state.currHelp
    },
    actions: {
        async fetchApprovedHelp() {
            try {
                const response = await getApprovedHelp();
                this.approvedHelp = convertObjects(response.data).sort(compareHelp);
            } catch (error) {
                console.log("Error on fetch approved help wanted");
                console.error(error);
            }
        },
        async fetchPendingHelp(pToken) {
            try {
                const response = await getPendingHelp(pToken);
                this.pendingHelp =  convertObjects(response.data).sort(compareHelp);
            } catch(error) {
                console.log("Error on fetch pending help wanted")
                console.error(error);
            }
        },
        async saveHelp(pToken) {
            try {
                await createHelp(pToken, this.currHelp);
                this.newHelp();
                let response = await getApprovedHelp();
                this.approvedHelp = convertObjects(response.data).sort(compareHelp);
                response = await getPendingHelp(pToken);
                this.pendingHelp = convertObjects(response.data).sort(compareHelp);
            } catch (error) {
                console.log("Error on create help wanted")
                console.error(error);
            }
        },
        async approveHelp(pToken) {
            try {
                await approveHelp(pToken, this.currHelp.HelpID);
                this.currHelp = null;
            } catch (error) {
                console.log("Error on approve help wanted" + this.currHelp.HelpID)
                console.error(error);
            }
        },
        async deleteHelp(pToken) {
            try {
                await deleteHelp(pToken, this.currHelp.HelpID);
                this.currHelp = null;
            } catch (error) {
                console.log("Error on delete help wanted" + this.currHelp.HelpID)
                console.error(error);
            }
        },
        newHelp() {
            let newHelp = {
                HelpID: crypto.randomUUID(),
                Headline: "",
                Description: "",
                WebURL: "",
                Date: currentDateTime(),
                ExpirationDate: defaultExpirationDate(),
                ContactName: "",
                ContactEMail: "",
                ContactPhone: "",
                PublishContact: "N"
            };
            this.currHelp = newHelp;
        },
        selectHelp(pHelpID) {
            let tHelp = this.pendingHelp.find(tHelp => tHelp.HelpID === pHelpID );
            this.currHelp = tHelp;
        },
        selectApprovedHelp(pHelpID) {
            let tHelp = this.approvedHelp.find(tHelp => tHelp.HelpID === pHelpID);
            this.currHelp = tHelp;
        }
    }
})
