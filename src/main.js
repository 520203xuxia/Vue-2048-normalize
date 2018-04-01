import Vue from 'vue'
import Game from './game.vue'

import './assets/styles/global.css'
const root=document.createElement("div");
document.body.appendChild(root);
new Vue({
	render:(h)=> h(Game)
}).$mount(root);