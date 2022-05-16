<script setup lang="ts">
import { onMounted } from 'vue';

const FILENAME = 'mocked_data'

type EXTENSION = 'csv' | 'json' | 'xml' | 'yaml'

type IData = {
  [key in EXTENSION]: Blob;
};

let data: IData = {
  csv: new Blob(),
  json: new Blob(),
  xml: new Blob(),
  yaml: new Blob()
}

const getBlob = async (url: string) => {
  return fetch(url)
    .then(res => res.blob())
}

const getAllBlob = async () => {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      data[key as EXTENSION] = await getBlob(`/${FILENAME}.${key}`)
    }
  }
}

onMounted(async () => {
  await getAllBlob()
  console.log(data)
  Object.keys(data).forEach(key => {
    const reader = new FileReader()
    reader.onload = () => {
      console.log(reader.result);
      if(key == 'csv') console.log(reader.result)
    }
    reader.readAsText(data[key as EXTENSION], 'UTF-8')
  })
})
</script>
<template>
  <GetData />
</template>
<style>
html {
  background-color: black;
  color: white;
  width: 100%;
  height: 100%;
}
</style>
