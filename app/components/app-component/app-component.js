import Vue from 'vue';
import template from './app-component-template.html';

const AppComponent = Vue.extend({
  template,
});

Vue.component('app-component', AppComponent);

export default AppComponent;
