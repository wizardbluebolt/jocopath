import { defineStore } from 'pinia'
import { getApprovedDonations, getArchivedDonations, getPendingDonations, createDonation, approveDonation, deleteDonation } from '@/api/donations'
import { convertObjects } from '@/api/conversions'
import { currentDateTime, defaultExpirationDate } from '@/api/datetimeops'

// Sort donations so that the earliest appears first
function compareDonations(pDonation1, pDonation2) {
    if (pDonation1.StartDate > pDonation2.StartDate) {
        return 1
    }
    if (pDonation1.StartDate < pDonation2.StartDate) {
        return -1
    }
    return 0
}

export const useDonationStore = defineStore('donation', {
    state: () => ({
        approvedDonations: [],
        pendingDonations: [],
        archivedDonations: [],
        currDonation: null
    }),
    getters: {
        getApprovedDonations: (state) => state.approvedDonations,
        getPendingDonations: (state) => state.pendingDonations,
        getArchivedDonations: (state) => state.archivedDonations,
        getCurrDonation: (state) => state.currDonation
    },
    actions: {
        async fetchApprovedDonations() {
            try {
                const response = await getApprovedDonations()
                this.approvedDonations = convertObjects(response.data).sort(compareDonations)
            } catch (error) {
                console.log('Error on fetch approved donations')
                console.error(error)
            }
        },
        async fetchArchivedDonations() {
            try {
                let expDate = defaultArchiveDate()
                const response = await getArchivedDonations(expDate)
                this.archivedDonations = convertObjects(response.data).sort(compareDonations)
            } catch (error) {
                console.log('Error on fetch archived donations')
                console.error(error)
            }
        },
        async fetchPendingDonations(pToken) {
            try {
                const response = await getPendingDonations(pToken)
                this.pendingDonations = convertObjects(response.data).sort(compareDonations)
            } catch (error) {
                console.log('Error on fetch pending donations')
                console.error(error)
            }
        },
        async saveDonation(pToken) {
            try {
                await createDonation(pToken, this.currDonation)
                this.newDonation();
                let response = await getApprovedDonations();
                this.approvedDonations = convertObjects(response.data).sort(compareDonations);
                response = await getPendingDonations(pToken);
                this.pendingDonations = convertObjects(response.data).sort(compareDonations);   
                let expDate = defaultExpirationDate();
                response = await(getArchivedDonations(expDate));
                this.archivedDonations = convertObjects(response.data).sort(compareDonations);
            } catch (error) {
                console.log('Error on create donation')
                console.error(error)
            }
        },
        async approveDonation(pToken) {
            try {
                await approveDonation(pToken, this.currDonation.DonationID);
                this.currDonation = null;
            } catch (error) {
                console.log('Error on approve donation ' + this.currDonation.DonationID);
                console.error(error);
            }
        },
        async deleteDonation(pToken) {
            try {
                await deleteDonation(pToken, this.currDonation.DonationID);
                this.currDonation = null;
            } catch (error) {
                console.log('Error on delete donation ' + this.currDonation.DonationID);
                console.error(error);
            }
        },
        newDonation() {
            this.currDonation = {
                DonationID: crypto.randomUUID(),
                Headine: '',
                Description: '',
                DonationKind: '',
                HowUsed: '',
                WebURL: '',
                StartDate: currentDateTime(),
                ExpirationDate: defaultExpirationDate(),
                DonationHours: '',
                Location: '',
                PublishContact: 'N',
                ContactName: '',
                ContactEMail: '',
                ContactPhone: ''
            }
        },
        selectDonation(pDonationID) {
            let tDonation = this.pendingDonations.find(tDonation => tDonation.DonationID === pDonationID);
            this.currDonation = tDonation;
        },
        selectApprovedDonation(pDonationID) {
            let tDonation = this.approvedDonations.find(tDonation => tDonation.DonationID === pDonationID);
            this.currDonation = tDonation;
        },
        selectArchivedDonation(pDonationID) {
            let tDonation = this.archivedDonations.find(tDonation => tDonation.DonationID === pDonationID);
            this.currDonation = tDonation;
        }
    }
})