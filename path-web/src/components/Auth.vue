<template>
    <authenticator 
        :sign-up-attributes="['name']"
        :login-mechanisms="['email']"
        :social-providers="[]">
    </authenticator>
</template>

<script setup>
    import { useAuthenticator, Authenticator } from "@aws-amplify/ui-vue";
    import "@aws-amplify/ui-vue/styles.css";
    import { Hub } from 'aws-amplify/utils';
    import { useUserStore } from '@/stores/user';

    const userStore = useUserStore();

    const auth = useAuthenticator();

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

