import { defineStore } from 'pinia'
import { getApprovedNews, getPendingNews, createNews, approveNews, deleteNews } from "@/api/news"
import { convertObjects } from "@/api/conversions"
import { currentDateTime, defaultExpirationDate } from '@/api/datetimeops'

export const useNewsStore = defineStore('news', {
    state: () => ({
        approvedNews: [],
        pendingNews: [],
        currNews: null
    }),
    getters: {
        getApprovedNews: (state) => state.approvedNews,
        getPendingNews: (state) => state.pendingNews,
        getCurrNews: (state) => state.currNews
    },
    actions: {
        async fetchApprovedNews() {
            try {
                const response = await getApprovedNews();
                this.approvedNews = convertObjects(response.data);
            } catch (error) {
                console.log("Error on fetch approved news");
                console.error(error);
            }
        },
        async fetchPendingNews(pToken) {
            try {
                const response = await getPendingNews(pToken);
                this.pendingNews =  convertObjects(response.data);
            } catch(error) {
                console.log("Error on fetch pending news")
                console.error(error);
            }
        },
        async saveNews(pToken) {
            try {
                await createNews(pToken, this.currNews);
                this.newNews();
                let response = await getApprovedNews();
                this.approvedNews = convertObjects(response.data);
                response = await getPendingNews(pToken);
                this.pendingNews = convertObjects(response.data);
            } catch (error) {
                console.log("Error on create news")
                console.error(error);
            }
        },
        async approveNews(pToken) {
            try {
                await approveNews(pToken, this.currNews.NewsID);
                this.currNews = null;
            } catch (error) {
                console.log("Error on approve news " + this.currNews.NewsID)
                console.error(error);
            }
        },
        async deleteNews(pToken) {
            try {
                await deleteNews(pToken, this.currNews.NewsID);
                this.currNews = null;
            } catch (error) {
                console.log("Error on delete news " + this.currNews.NewsID)
                console.error(error);
            }
        },
        newNews() {
            let newNews = {
                NewsID: crypto.randomUUID(),
                Headline: "",
                Description: "",
                WebURL: "",
                Date: currentDateTime(),
                ExpirationDate: defaultExpirationDate(),
                ContactName: "",
                ContactEMail: "",
                ContactPhone: ""
            };
            this.currNews = newNews;
        },
        selectNews(pNewsID) {
            let tNews = this.pendingNews.find(tNews => tNews.NewsID === pNewsID );
            this.currNews = tNews;
        },
        selectApprovedNews(pNewsID) {
            let tNews = this.approvedNews.find(tNews => tNews.NewsID === pNewsID);
            this.currNews = tNews;
        }
    }
})
