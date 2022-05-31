<template>
  <div id="cardOccupation" :class="cardOccupation.class + ' text-white cursor-pointer'">
    <div class="flex justify-center" :style="'fill:' + color + '; z-index:2;'">
      <inline-svg :src="`/icons/${label}.svg`" class="mr-2" />
    </div>
    <h1
      id="title"
      class="fit-content text-sm font-semibold px-2 rounded shadow border-gray tracking-wide glass"
      style="z-index: 2"
    >
      {{ label }}
    </h1>
  </div>
</template>

<script setup lang="ts">
defineProps(["label", "color", "route"]);

const cardOccupation = {
  class:
    "flex items-center flex-row flex-1 text-center rounded shadow relative pointer border-gray border-green-effect-index background-gradient justify-center",
  style:
    "background-image: url('backgrounds/grandes_marcas.jpg');background-repeat: no-repeat;background-size: cover;background-position: center;",
};
</script>

<style scoped>
#cardOccupation {
  height: 100%;
}

#title {
  z-index: 2;
}

.responsive-img {
  height: auto !important;
  width: 50% !important;
}

.responsive-img2 {
  height: auto !important;
  width: 25% !important;
}

#cardOccupation:before {
  border-radius: 3px;
  position: absolute;
  content: "";
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background: -moz-linear-gradient(bottom, #252525 0%, rgba(0, 0, 0, 0) 100%);
  background: -webkit-gradient(
    linear,
    left bottom,
    left bottom,
    color-stop(0%, #252525),
    color-stop(100%, rgba(0, 0, 0, 0))
  );
  background: -webkit-linear-gradient(bottom, #252525 0%, rgba(0, 0, 0, 0) 100%);
  background: -o-linear-gradient(bottom, #252525 0%, rgba(0, 0, 0, 0) 100%);
  background: -ms-linear-gradient(bottom, #252525 0%, rgba(0, 0, 0, 0) 100%);
  background: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0) 100%);
  top: -1px;
  left: -1px;
  z-index: 1;
}
</style>
