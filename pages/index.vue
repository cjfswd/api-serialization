<script setup lang="ts">
import { Ref } from "vue";
import { options } from "../shared/utils";

const FILENAME = "mocked-data";

type EXTENSION = "csv" | "xml" | "json" | "yaml";

type IPromised = {
  text: Ref<string>;
  created: string;
};

type IOther = IPromised;

type IData<T> = {
  [key in EXTENSION]: { blob: Blob; info: T };
};

let data: IData<IOther> = {
  csv: {
    blob: new Blob(),
    info: { text: ref(""), created: "1970s" },
  },
  xml: {
    blob: new Blob(),
    info: { text: ref(""), created: "1990s" },
  },
  json: {
    blob: new Blob(),
    info: { text: ref(""), created: "2000" },
  },
  yaml: {
    blob: new Blob(),
    info: { text: ref(""), created: "2001" },
  },
};

const getBlob = async (path: string) => {
  return fetch(path).then((res) => res.blob());
};

const getAllBlob = async () => {
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      data[key as EXTENSION].blob = await getBlob(`/${FILENAME}.${key}`);
      data[key as EXTENSION].blob
        .text()
        .then((res) => (data[key as EXTENSION].info.text.value = res));
    }
  }
};

let read = (data: Blob) => {
  const reader = new FileReader();
  reader.onload = () => {
    console.log(reader.result);
  };
  reader.readAsText(data, "UTF-8");
  data.slice;
};

onMounted(async () => {
  await getAllBlob();
  Object.keys(data).forEach((key) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
    };
    reader.readAsText(data[key as EXTENSION].blob, "UTF-8");
    read(data[key as EXTENSION].blob);
  });
});

let from = ref("json");
let to = ref("yaml");
let body = ref("");
let response = ref("");

const sendServer = async () => {
  response.value = await fetch(`/api/${from.value}/${to.value}`, {
    method: "POST",
    body: body.value,
    headers: { "Content-Type": "text/plain" },
  })
    .then((res) => res.json())
    .then((res) => res.response);
};
</script>
<template>
  <div class="flex flex-col justify-center items-center leading-tight p-4">
    <div class="flex flex-col gap-6 w-full max-w-[800px]">
      <div class="flex flex-col w-full">
        <h1 class="text-3xl">API - serialization</h1>
        <p>convert interoperable serialization formats like json, yaml, xml and csv.</p>
        <span class="text-sm"
          >by
          <NuxtLink
            to="https://github.com/cjfswd"
            target="_blank"
            class="text-[#8AB4F8] cursor-pointer hover:underline"
            >@cjfswd</NuxtLink
          ></span
        >
      </div>
      <div class="flex flex-row justify-center divide-x">
        <div class="pr-4">
          <p class="text-center mb-2">from</p>
          <div v-for="item in options">
            <input
              :id="`from${item}`"
              type="radio"
              v-model="from"
              :value="item"
              class="mb-2 mr-2"
            />
            <label :for="`from${item}`">{{ item }}</label>
          </div>
        </div>
        <div class="pl-4">
          <p class="text-center mb-2">to</p>
          <div v-for="item in options">
            <input
              :id="`from${item}`"
              type="radio"
              v-model="to"
              :value="item"
              class="mb-2 mr-2"
            />
            <label :for="`from${item}`">{{ item }}</label>
          </div>
        </div>
      </div>
      <div class="flex flex-col h-full">
        <label class="mb-1">input</label>
        <textarea class="mb-2" v-model="body"></textarea>
        <button
          class="bg-[#101010] p-2 rounded border border-[#303030] text-[#808080] hover:text-green-400 hover:border-green-400"
          @click="sendServer()"
        >
          <i class="mdi mdi-tray-arrow-down" />
        </button>
      </div>
      <div class="h-full">
        <p class="mb-1">output</p>
        <highlightjs v-if="response != ''" style="white-space: pre-wrap" autodetect :code="response" />
        <div v-else class="w-full text-center bg-[#3B3B3B] p-2 text-red-400 text-sm">
          select the serializable formats to convert, input and send to see the results
          here!
        </div>
      </div>
      <div>
        <p>check the details</p>
        <p>
          &ensp;&ensp;&ensp;of api at doc
          <NuxtLink
            to="https://github.com/cjfswd/ui-browser"
            target="_blank"
            class="text-[#8AB4F8] cursor-pointer hover:underline"
            >section</NuxtLink
          >
        </p>
        <p>
          &ensp;&ensp;&ensp;of code at github
          <NuxtLink
            to="https://github.com/cjfswd/ui-browser"
            target="_blank"
            class="text-[#8AB4F8] cursor-pointer hover:underline"
            >repository</NuxtLink
          >
        </p>
      </div>
      <hr class="border-zinc-800" />
      <div>
        <p class="mb-2 text-zinc-500">comparision of seriable formats</p>
        <div id="comparision" class="w-full overflow-x-auto pb-4 pr-4 h-[200px] rounded">
          <div class="flex gap-2">
            <div
              v-for="(item, key, itemIndex) in data"
              :key="key"
              class="flex flex-col gap-2 px-2 pt-0 pb-2 rounded bg-[#171717]"
              style="break-inside: avoid; width: fit-content; height: fit-content"
            >
              <h2 class="text-2xl font-semibold">{{ key }}</h2>
              <highlightjs
                autodetect
                :code="item.info.text.value"
                class="text-xs rounded"
              />
              <span class="text-xs text-[#575757]"
                >format made in {{ item.info.created }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
:root {
  color-scheme: dark;
}

pre code.hljs {
  @apply rounded
}

textarea {
  vertical-align: top;
  height: 100%;
  width: 100%;
  width: 100%;
  height: 100px;
  padding: 6px;

  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

#comparision::-webkit-scrollbar {
  height: 9px;
  width: 9px;
  border: 1px solid #52525b;
}
#comparision::-webkit-scrollbar-track {
  background: transparent;
}
#comparision::-webkit-scrollbar-thumb {
  background: #303030;
  background-clip: padding-box;
}

::-webkit-scrollbar {
  height: 9px;
  width: 9px;
  border-left: 1px solid #52525b;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #303030;
  background-clip: padding-box;
}
::-webkit-scrollbar-corner {
  background: #303030;
}
</style>
