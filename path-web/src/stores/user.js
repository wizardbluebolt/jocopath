import { defineStore } from 'pinia'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'

async function currentSession() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      return { accessToken, idToken }
    } catch (err) {
      console.log(err);
      return {}
    }
  }
  
  async function currentAuthenticatedUser() {
    try {
      await getCurrentUser();
      const tokens = await currentSession();
      return tokens;
    } catch (err) {
      console.log(err);
      return {}
    }
  }

export const useUserStore = defineStore('user', {
    state: () => {
      return {
        currUser: '',
        isAuthenticated: false,
        isReviewer: false,
        isAdmin: false
      }
    },
    getters: {
        getCurrUser: (state) => state.currUser,
        getIsAuthenticated: (state) => state.isAuthenticated,
        getIsReviewer: (state) => state.isReviewer,
        getIsAdmin: (state) => state.isAdmin
    },
    actions: {
        async userLoggedIn() {
            const tokens = await currentAuthenticatedUser();
            if (!tokens.idToken) {
              this.currUser = '';
              this.isAuthenticated = false;
              this.isAdmin = false;
              this.isReviewer = false;              
            } else {
            this.currUser = tokens.idToken.payload.name;
            this.isAuthenticated = true;
            this.isAdmin = false;
            this.isReviewer = false;
            if (tokens.idToken.payload['cognito:groups'].includes('admin')) {
                this.isAdmin = true;
                this.isReviewer = true;
            } else {
                if (tokens.idToken.payload['cognito:groups'].includes('reviewers')) {
                    this.isReviewer = true;
                }
              }              
            }
        },
        userLoggedOut() {
            this.currUser = '';
            this.isAuthenticated = false;
            this.isAdmin = false;
            this.isReviewer = false;
        }
    }
})