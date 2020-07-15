(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Item.vue?vue&type=template&id=039dcb3d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("\n  ItemPage: path param: "+_vm._s(_vm.$route.params.id)+"\n")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/Item.vue?vue&type=template&id=039dcb3d&scoped=true&

// CONCATENATED MODULE: ./src/store/modules/foo.js
/* harmony default export */ var foo = ({
  namespace: true,
  state: () => ({
    count: 0
  }),
  actions: {
    inc: ({
      commit
    }) => commit('inc')
  },
  mutations: {
    inc: state => state.count++
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Item.vue?vue&type=script&lang=js&
//
//
//
//
//
//

/* harmony default export */ var Itemvue_type_script_lang_js_ = ({
  asyncData({
    route,
    store
  }) {
    store.registerModule('foo', foo);
    store.dispatch('foo/inc');
    return store.dispatch('fetchItem', route.params.id);
  },

  /**
   *  当多次访问路由时, 
   *  避免在客户端重复注册模块
   */
  destroyed() {
    this.$store.unregisterModule('foo');
  }

});
// CONCATENATED MODULE: ./src/views/Item.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Itemvue_type_script_lang_js_ = (Itemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./src/views/Item.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Itemvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "039dcb3d",
  null
  
)

/* harmony default export */ var Item = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);