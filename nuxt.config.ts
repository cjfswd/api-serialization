import { defineNuxtConfig } from 'nuxt'


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    target: 'server',
    css: ['@mdi/font/css/materialdesignicons.min.css', 'animate.css/animate.min.css'],
    modules: ['@nuxtjs/tailwindcss']
})
