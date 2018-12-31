(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Navbar/navbar.scss":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Navbar/navbar.scss ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".navbar--desktop {\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center; }\n  @media all and (max-width: 800px) {\n    .navbar--desktop {\n      display: none; } }\n  .navbar--desktop ul {\n    display: flex;\n    flex-direction: row; }\n    .navbar--desktop ul li {\n      margin-right: 15px;\n      text-transform: uppercase; }\n      .navbar--desktop ul li:after {\n        content: '';\n        margin: auto;\n        display: block;\n        width: 0;\n        height: 3px;\n        background: #ff8484;\n        transition: all .3s ease; }\n      .navbar--desktop ul li:hover:after {\n        width: 100%; }\n      .navbar--desktop ul li a {\n        color: white;\n        text-decoration: none; }\n    .navbar--desktop ul li:first-child {\n      margin-left: 15px; }\n  .navbar--desktop div {\n    display: flex;\n    align-items: center; }\n    .navbar--desktop div button {\n      margin-top: 15px;\n      margin-right: 15px;\n      padding: 15px;\n      background-color: #346ca1;\n      border: 1px solid black;\n      border-radius: 5px;\n      font-size: 20px;\n      color: white;\n      cursor: pointer; }\n\n@media all and (min-width: 801px) {\n  .navbar--mobile {\n    display: none; } }\n\n.navbar--mobile--header {\n  width: 100vw;\n  height: 70px;\n  background-color: #253847;\n  z-index: 3;\n  display: flex;\n  justify-content: space-between;\n  align-items: center; }\n  .navbar--mobile--header .icon {\n    margin: 15px;\n    font-size: 2em;\n    cursor: pointer; }\n  .navbar--mobile--header a {\n    float: right; }\n\n.navbar--mobile--links {\n  position: absolute;\n  top: 0;\n  width: 80vw;\n  height: 0;\n  background-color: white;\n  box-shadow: 2px 8px 20px black;\n  -webkit-transform: translateX(calc(86vw * -1));\n          transform: translateX(calc(86vw * -1));\n  -webkit-animation: slideOut .4s 1;\n          animation: slideOut .4s 1;\n  z-index: 2;\n  display: flex;\n  flex-direction: column; }\n  .navbar--mobile--links--profile {\n    height: 30vw;\n    min-height: 120px;\n    background-image: url(/profile-background.png);\n    background-size: cover;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end; }\n    .navbar--mobile--links--profile img {\n      margin: 0 0 15px 15px;\n      width: 50px;\n      height: 50px;\n      border-radius: 50%; }\n    .navbar--mobile--links--profile h3 {\n      padding: 0 0 10px 10px;\n      color: white;\n      text-shadow: 0px 0px 6px black;\n      font-weight: bolder; }\n  .navbar--mobile--links a {\n    height: 60px;\n    padding-left: 20px;\n    overflow-y: hidden;\n    font-size: 1em;\n    overflow-y: hidden;\n    text-decoration: none;\n    font-weight: 400;\n    display: flex;\n    transition: background-color .1s ease-in;\n    display: flex;\n    flex-direction: row;\n    align-items: center; }\n    .navbar--mobile--links a:hover {\n      background-color: #e6e6e6;\n      cursor: pointer;\n      transition: background-color .1s ease-in; }\n    .navbar--mobile--links a .link-container {\n      color: #25323c; }\n      .navbar--mobile--links a .link-container svg {\n        padding: 0 15px; }\n        .navbar--mobile--links a .link-container svg path {\n          color: #4e4646; }\n  .navbar--mobile--links hr {\n    margin: 5px 0;\n    width: 100%;\n    height: 1px;\n    background: #d4c3c3; }\n  .navbar--mobile--links__active {\n    height: 100vh;\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw);\n    -webkit-animation: slideIn .4s 1;\n            animation: slideIn .4s 1;\n    z-index: 2; }\n\n@-webkit-keyframes slideIn {\n  0% {\n    -webkit-transform: translateX(calc(86vw * -1));\n            transform: translateX(calc(86vw * -1)); }\n  1% {\n    height: 100vh; }\n  100% {\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw); } }\n\n@keyframes slideIn {\n  0% {\n    -webkit-transform: translateX(calc(86vw * -1));\n            transform: translateX(calc(86vw * -1)); }\n  1% {\n    height: 100vh; }\n  100% {\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw); } }\n\n@-webkit-keyframes slideOut {\n  0% {\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw);\n    height: 100vh; }\n  99% {\n    height: 100vh; }\n  100% {\n    -webkit-transform: translateX(calc(86vw * -1));\n            transform: translateX(calc(86vw * -1));\n    height: 0; } }\n\n@keyframes slideOut {\n  0% {\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw);\n    height: 100vh; }\n  99% {\n    height: 100vh; }\n  100% {\n    -webkit-transform: translateX(calc(86vw * -1));\n            transform: translateX(calc(86vw * -1));\n    height: 0; } }\n", ""]);



/***/ }),

/***/ "./src/Budgeteer/Navbar/Navbar.jsx":
/*!*****************************************!*\
  !*** ./src/Budgeteer/Navbar/Navbar.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _navbar_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navbar.scss */ "./src/Budgeteer/Navbar/navbar.scss");
/* harmony import */ var _navbar_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_navbar_scss__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }



 // Font Awesome base package

 // Selective icons from Font Awesome




var Navbar =
/*#__PURE__*/
function (_Component) {
  _inherits(Navbar, _Component);

  function Navbar(props) {
    var _this;

    _classCallCheck(this, Navbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Navbar).call(this, props));
    _this.state = {
      handler: {
        user: "..."
      }
    };
    _this.addAccount = _this.addAccount.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Navbar, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var keyAndEnv, plaid, name;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/plaid-api/key-and-env');

              case 2:
                keyAndEnv = _context.sent;
                plaid = Plaid.create({
                  apiVersion: 'v2',
                  clientName: 'Plaid Walkthrough Demo',
                  env: keyAndEnv.data.env,
                  product: ['transactions'],
                  key: keyAndEnv.data.publicKey,
                  onSuccess: function onSuccess(public_token) {
                    axios__WEBPACK_IMPORTED_MODULE_2___default()({
                      method: "POST",
                      url: "/plaid-api/get-access-token",
                      data: {
                        public_token: public_token,
                        client_id: '5a24ca6a4e95b836d37e37fe',
                        secret: 'f07a761a591de3cbbc5ac3ba2f4301'
                      }
                    });
                  }
                });
                _context.next = 6;
                return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("/user-info/name");

              case 6:
                name = _context.sent;
                name = name.data;
                this.setState({
                  handler: plaid,
                  name: name
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "addAccount",
    value: function addAccount() {
      this.state.handler.open(); // Clear out local and session storage --> Storing networth info

      window.localStorage.clear();
      window.sessionStorage.clear();
      console.log("LOCAL AND SESSION STORAGE CLEARED");
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      var navbarLinks = document.querySelector(".navbar--mobile--links");
      navbarLinks.classList.toggle("navbar--mobile--links__active"); // Control the height of the body if the navbar is opened or closed

      if (navbarLinks.classList.contains("navbar--mobile--links__active")) {
        document.querySelector("body").style.maxHeight = "100vh";
        document.querySelector("body").style.overflowY = "hidden";
        document.querySelector(".navbar--mobile--header").style.filter = "brightness(.8)";
        /*document.querySelector(".main").style.filter = "brightness(.8)";*/
      } else {
        document.querySelector("body").style.maxHeight = null;
        document.querySelector("body").style.overflowY = null;
        document.querySelector(".navbar--mobile--header").style.filter = null;
        document.querySelector(".main").style.filter = null;
      }
    }
  }, {
    key: "closeMenu",
    value: function closeMenu() {
      var navbarMenu = document.querySelector(".navbar--mobile--links");

      if (navbarMenu.classList.contains("navbar--mobile--links__active")) {
        navbarMenu.classList.remove("navbar--mobile--links__active");
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
        className: "navbar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "navbar--desktop"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/"
      }, "Home")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/transactions"
      }, "Transactions")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/statistics"
      }, "Statistics")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/networth"
      }, "Networth")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/settings"
      }, "Settings"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.addAccount
      }, "Add Accounts"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "navbar--mobile"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "navbar--mobile--header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/",
        onClick: this.closeMenu
      }, " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
        className: "icon",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faHome"]
      }), " "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Budgeteer"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
        className: "icon",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faBars"],
        onClick: this.toggleMenu
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "navbar--mobile--links"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "navbar--mobile--links--profile"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "https://via.placeholder.com/50x50"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.state.name)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/transactions",
        className: "first",
        onClick: this.toggleMenu
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "link-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faExchangeAlt"]
      }), "Your Transactions")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/statistics",
        className: "second",
        onClick: this.toggleMenu
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "link-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faChartPie"]
      }), "Your Statistics")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/networth",
        className: "third",
        onClick: this.toggleMenu
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "link-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faMoneyBillAlt"]
      }), "Your Networth")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/settings",
        className: "fourth",
        onClick: this.toggleMenu
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "link-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faCogs"]
      }), "Your Settings")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "fifth",
        onClick: this.addAccount
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "link-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FontAwesomeIcon"], {
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__["faPlus"]
      }), "Add Account")))));
    }
  }]);

  return Navbar;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Navbar);

/***/ }),

/***/ "./src/Budgeteer/Navbar/navbar.scss":
/*!******************************************!*\
  !*** ./src/Budgeteer/Navbar/navbar.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src!../../../node_modules/sass-loader/lib/loader.js!./navbar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Navbar/navbar.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

}]);
//# sourceMappingURL=13.js.map