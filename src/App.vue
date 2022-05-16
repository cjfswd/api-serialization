<script setup lang="ts">
import { onMounted, reactive, Ref, ref } from 'vue';

const FILENAME = 'mocked-data'

type EXTENSION = 'csv' | 'xml' | 'json' | 'yaml'

type IPromised = {
  text: Ref<string>
  created: string
}

type IOther = IPromised

type IData<T> = {
  [key in EXTENSION]: { blob: Blob, info: T };
};

let data: IData<IOther> = {
  csv: {
    blob: new Blob(),
    info: { text: ref(''), created: '1970s' }
  },
  xml: {
    blob: new Blob(),
    info: { text: ref(''), created: '1990s' }
  },
  json: {
    blob: new Blob(),
    info: { text: ref(''), created: '2000' }
  },
  yaml: {
    blob: new Blob(),
    info: { text: ref(''), created: '2001' }
  }
}

const getBlob = async (path: string) => {
  return fetch(path).then(res => res.blob())
}

const getAllBlob = async () => {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      data[key as EXTENSION].blob = await getBlob(`/${FILENAME}.${key}`)
      data[key as EXTENSION].blob.text().then(res => data[key as EXTENSION].info.text.value = res)
    }
  }
}

let read = (data: Blob) => {
  const reader = new FileReader()
  reader.onload = () => {
    console.log(reader.result)
  }
  reader.readAsText(data, 'UTF-8')
  data.slice
}

onMounted(async () => {
  await getAllBlob()
  Object.keys(data).forEach(key => {
    const reader = new FileReader()
    reader.onload = () => {
      console.log(reader.result);
    }
    reader.readAsText(data[key as EXTENSION].blob, 'UTF-8')
    read(data[key as EXTENSION].blob)
  })
})

// const { json, ...withoutJson } = data
</script>
<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="ml-1">
      <h2 class="text-2xl font-semibold">Comparision of serializable formats</h2>
      <span class="text-sm">by <a class="text-[#41A5EA]" href="https://github.com/cjfswd/comparision-serializable-format/" target="_blank">@cjfswd</a></span>
    </div>
    <div class="flex gap-4">
      <div v-for="(item, key, itemIndex) in data" :key="key"
        class="flex flex-col gap-2 px-2 pt-0 pb-2 rounded bg-[#171717]"
        style="break-inside: avoid; width: fit-content; height: fit-content">
        <h2 class="text-2xl font-semibold">{{ key }}</h2>
        <pre class="text-xs rounded flex" v-highlightjs="item.info.text.value">
      <code :class="`rounded ${key != 'csv' ? key : 'plaintext'}`"></code>
      </pre>
        <span class="text-xs text-[#575757]">format made in {{ item.info.created }}</span>
      </div>
    </div>
  </div>
</template>
<style>
html {
  background-color: #070707;
  color: white;
  width: 100%;
  height: 100%;
}
</style>
