

import InlineSvg from 'vue-inline-svg';

import 'highlight.js/styles/base16/dracula.css'
import hljs from 'highlight.js/lib/core';
import 'highlight.js/lib/common';
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('yaml', yaml);

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp
        .vueApp
        .component('inline-svg', InlineSvg)
        .component('highlightjs', hljsVuePlugin.component)
})