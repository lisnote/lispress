import { reactive } from 'vue';

export default reactive({
  article: document.createElement('div'),
} as { [key: string]: any });
