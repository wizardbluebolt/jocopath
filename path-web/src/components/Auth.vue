<template>
    <authenticator :sign-up-attributes="[
        'name'
    ]">
    </authenticator>
    <template v-if="auth.route === 'authenticated'">
        <h3>Greetings {{ auth.user?.name }}</h3>
        <v-btn @click="auth.signOut">Sign Out</v-btn>
    </template>
</template>

<script setup>
    import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
    import "@aws-amplify/ui-vue/styles.css";

    const auth = useAuthenticator();

</script>

