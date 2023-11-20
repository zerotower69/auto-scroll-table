import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {setupVXETable} from "./plugins/vxetable.js";

const app=createApp(App)
setupVXETable(app)
app.mount('#app')
