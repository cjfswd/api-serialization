<template>
  <div class="flex-grow grid grid-cols-1 gap-2" ref="verify">
    <div v-for="(occupation, index) in occupations" :key="index">
      <FreestyleLinktreeAtomCard
        :label="occupation.label"
        :color="occupation.color"
        :route="occupation.route"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const occupations = [
  {
    label: "Youtube",
    color: "#FF0000",
    route: "/",
  },
  { label: "Instagram", color: "#c32aa2", route: "/" },
  { label: "Twitter", color: "#1DA1F2", route: "/" },
  { label: "Whatsapp", color: "White", route: "/" },
  { label: "Facebook", color: "#3B5998", route: "/" },
  { label: "Site", color: "grey", route: "/" },
];
</script>
