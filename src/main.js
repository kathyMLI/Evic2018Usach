import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Buefy from 'buefy';
import FixedHeader from 'vue-fixed-header';
import VueSVGIcon from 'vue-svgicon';
import firebase from 'firebase';
import 'buefy/lib/buefy.css';
import 'font-awesome/css/font-awesome.css';
import App from './App';
import About from './components/About';
import Competition from './components/Competition';
import LocationUsach from './components/Location';
import Program from './components/Program';
import Speakers from './components/Speakers';

Vue.use(FixedHeader);
Vue.use(Buefy);
Vue.use(VueSVGIcon);
Vue.config.productionTip = false;

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDZ0BEPY3DYe1_89JzClsBbfpLXs-I4FYY',
  authDomain: 'evic-2018.firebaseapp.com',
  databaseURL: 'https://evic-2018.firebaseio.com',
  projectId: 'evic-2018',
  storageBucket: 'evic-2018.appspot.com',
  messagingSenderId: '887009428713',
  appId: '1:887009428713:web:1e064da5360023a1',
};
firebase.initializeApp(config);


Vue.use(firebase);


const VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo);

// You can also pass in the default options
Vue.use(VueScrollTo, {
  container: 'body',
  duration: 500,
  easing: 'ease',
  offset: 0,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true,
},
);

Vue.use(VueRouter);
Vue.use(VueResource);


const routes = [
  {
    path: '/about',
    alias: '/',
    name: 'About',
    component: About,
  },
  {
    path: '/Program',
    name: 'Program',
    component: Program,
  },
  {
    path: '/Competition',
    name: 'Competition',
    component: Competition,
  },
  {
    path: '/Location',
    name: 'Location',
    component: LocationUsach,
  },
  {
    path: '/Speakers',
    name: 'Speakers',
    component: Speakers,
  },
];


// Create the router instance and pass the `routes` option
Vue.router = new VueRouter({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  routes,
});

App.router = Vue.router;
new Vue(App).$mount('#app');
