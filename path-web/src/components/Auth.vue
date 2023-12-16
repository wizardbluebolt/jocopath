<template>
    <authenticator :sign-up-attributes="[
        'name'
    ]">
    </authenticator>
    <template v-if="auth.route === 'authenticated'">
        <v-btn @click="auth.signOut">Sign Out</v-btn>
    </template>
</template>

<script setup>
    import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
    import "@aws-amplify/ui-vue/styles.css";
    import { Hub } from 'aws-amplify/utils';
    import { useUserStore } from '@/stores/user';

    const auth = useAuthenticator();

    const userStore = useUserStore();

    const authListener = async (data) => {
        switch (data.payload.event) {
            case 'signedIn':
                await userStore.userLoggedIn();
                break;
            case 'signedOut':
                userStore.userLoggedOut();
            default:
        }
    }

    Hub.listen('auth', authListener);
</script>

