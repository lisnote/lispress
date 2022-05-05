import { createPinia } from 'pinia';
import PressStore from './PressStore';
import CommonStore from './CommonStore';

const pinia = createPinia();

export { pinia as default, PressStore, CommonStore };
