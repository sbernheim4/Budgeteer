(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Settings/AccountNames/accountNames.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Settings/AccountNames/accountNames.scss ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".accounts {\n  margin-top: 30px; }\n\n.account-names {\n  margin: 15px 0;\n  height: 60px;\n  border-radius: 5px;\n  display: flex;\n  align-items: center; }\n  .account-names--name {\n    margin: 0 30px;\n    width: 40%; }\n  .account-names--input {\n    margin: 0 10px;\n    width: 35%;\n    padding: 10px;\n    font-size: 18px;\n    color: black; }\n  .account-names--submit {\n    position: relative;\n    margin-bottom: 6px;\n    padding: 10px 20px;\n    background-color: #46926b;\n    border-radius: 5px;\n    font-size: 18px;\n    color: white;\n    cursor: pointer;\n    transition: background-color .1s ease;\n    box-shadow: 0 6px #357052; }\n    .account-names--submit:hover {\n      background-color: #418863;\n      box-shadow: 0 6px #31654a; }\n    .account-names--submit:active {\n      top: 3px;\n      box-shadow: 0 0 #357052; }\n\n.account-names:nth-child(2n+1) {\n  background: #365269; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Settings/settings.scss":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Settings/settings.scss ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".settings {\n  position: relative;\n  margin: 0 30px; }\n  @media all and (min-width: 801px) {\n    .settings {\n      margin: 0 60px; } }\n  .settings h1 {\n    font-size: 2em; }\n  .settings--linked-accounts {\n    margin: 20px auto;\n    max-width: 1000px;\n    width: 80%;\n    padding: 10px;\n    border-bottom: 2px solid white;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center; }\n    .settings--linked-accounts h2 {\n      margin: 5px 0; }\n    .settings--linked-accounts button {\n      padding: 15px 20px;\n      background-color: #d84545;\n      border-radius: 5px;\n      font-size: 1em;\n      cursor: pointer; }\n  .settings--monthly-budget {\n    margin-top: 60px;\n    width: 300px; }\n    .settings--monthly-budget label h1 {\n      margin-bottom: 10px; }\n    .settings--monthly-budget label input {\n      padding: 10px;\n      border-radius: 5px;\n      /*width: 150px;*/\n      /*height: 30px;*/\n      font-size: 20px;\n      color: black; }\n    .settings--monthly-budget label .submit {\n      margin-left: 5px;\n      background: #607D8B;\n      color: white;\n      cursor: pointer; }\n  .settings--rotate-tokens {\n    margin: 60px 15px 0 0; }\n    .settings--rotate-tokens button {\n      margin-top: 10px;\n      padding: 20px;\n      background-color: #46926b;\n      border-radius: 5px;\n      font-size: 1em;\n      cursor: pointer;\n      transition: background-color .3s ease; }\n      .settings--rotate-tokens button:hover {\n        background-color: #357052; }\n", ""]);



/***/ }),

/***/ "./src/Budgeteer/Settings/AccountNames/AccountNames.jsx":
/*!**************************************************************!*\
  !*** ./src/Budgeteer/Settings/AccountNames/AccountNames.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _accountNames_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accountNames.scss */ "./src/Budgeteer/Settings/AccountNames/accountNames.scss");
/* harmony import */ var _accountNames_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_accountNames_scss__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/*eslint no-undefined: 0*/




var AccountNames =
/*#__PURE__*/
function (_Component) {
  _inherits(AccountNames, _Component);

  function AccountNames(props) {
    var _this;

    _classCallCheck(this, AccountNames);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccountNames).call(this, props));
    _this.state = {
      accounts: [],
      mapOfAccountNamesToDisplayNames: new Map()
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getDisplayName = _this.getDisplayName.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.jsonToMap = _this.jsonToMap.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AccountNames, [{
    key: "mapToJson",
    value: function mapToJson(map) {
      return JSON.stringify(_toConsumableArray(map));
    }
  }, {
    key: "jsonToMap",
    value: function jsonToMap(jsonStr) {
      return new Map(JSON.parse(jsonStr));
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var names, map;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/user-info/display-names');

              case 3:
                names = _context.sent;
                names = names.data;
                map = this.jsonToMap(names);
                this.setState({
                  mapOfAccountNamesToDisplayNames: map
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.log("Error: ");
                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "getAccountIDFromAccountName",
    value: function getAccountIDFromAccountName(accountName) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.accounts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var account = _step.value;
          if (account.name === accountName) return account.account_id;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "getDisplayName",
    value: function getDisplayName(account_id) {
      return this.state.mapOfAccountNamesToDisplayNames.get(account_id) || "";
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var _this2 = this;

      var map = this.state.mapOfAccountNamesToDisplayNames !== undefined ? this.state.mapOfAccountNamesToDisplayNames : new Map();
      var vals = document.querySelectorAll(".account-names--input");
      vals.forEach(function (val) {
        var displayName = val.value || val.placeholder; // Skip the entry if there is no value

        if (displayName === "" || displayName === null || displayName === undefined) return;
        var accountName = val.parentNode.querySelector(".account-names--name").innerText;

        var accountID = _this2.getAccountIDFromAccountName(accountName);

        map.set(accountID, displayName);
      });
      axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/user-info/display-names', {
        data: {
          map: JSON.stringify(map)
        }
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(e, id) {
      this.setState(_defineProperty({}, id, e.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "accounts"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Account Display Names"), this.state.accounts.map(function (acct, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "account-names",
          key: index
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          className: "account-names--name"
        }, acct.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
          className: "account-names--display"
        }, "Display Name: "), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          className: "account-names--input",
          id: index,
          placeholder: _this3.getDisplayName(acct.account_id),
          onChange: function onChange(e) {
            return _this3.handleChange(e, acct.account_id);
          },
          type: "text"
        }));
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: function onClick(e) {
          return _this3.handleClick(e);
        },
        className: "account-names--submit"
      }, "Update"));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        accounts: props.accounts
      };
    }
  }]);

  return AccountNames;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (AccountNames);

/***/ }),

/***/ "./src/Budgeteer/Settings/AccountNames/accountNames.scss":
/*!***************************************************************!*\
  !*** ./src/Budgeteer/Settings/AccountNames/accountNames.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src!../../../../node_modules/sass-loader/lib/loader.js!./accountNames.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Settings/AccountNames/accountNames.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/Budgeteer/Settings/Settings.jsx":
/*!*********************************************!*\
  !*** ./src/Budgeteer/Settings/Settings.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AccountNames_AccountNames_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccountNames/AccountNames.jsx */ "./src/Budgeteer/Settings/AccountNames/AccountNames.jsx");
/* harmony import */ var _ErrorMessage_ErrorMessage_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ErrorMessage/ErrorMessage.jsx */ "./src/Budgeteer/ErrorMessage/ErrorMessage.jsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _settings_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings.scss */ "./src/Budgeteer/Settings/settings.scss");
/* harmony import */ var _settings_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_settings_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

/* eslint no-undefined: "off" */








var Settings =
/*#__PURE__*/
function (_Component) {
  _inherits(Settings, _Component);

  function Settings(props) {
    var _this;

    _classCallCheck(this, Settings);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Settings).call(this, props));
    _this.state = {
      linkedBanks: [],
      monthlyBudget: "Loading...",
      display: false,
      message: "",
      color: "green"
    };
    _this.updateInputValue = _this.updateInputValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateMonthlyBudget = _this.updateMonthlyBudget.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.displayMessage = _this.displayMessage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Settings, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var monthlyBudget, linkedBanks;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Try looking in local storage first for the monthlyBudget
                monthlyBudget = localStorage.getItem("monthlyBudget");

                if (monthlyBudget) {
                  _context.next = 6;
                  break;
                }

                _context.next = 4;
                return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('/user-info/monthly-budget');

              case 4:
                monthlyBudget = _context.sent;
                monthlyBudget = monthlyBudget.data.monthlyBudget;

              case 6:
                _context.next = 8;
                return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get('/plaid-api/linked-accounts');

              case 8:
                linkedBanks = _context.sent;
                this.setState({
                  linkedBanks: linkedBanks.data.accounts,
                  monthlyBudget: monthlyBudget
                });

              case 10:
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
    key: "removeAccount",
    value: function () {
      var _removeAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(e) {
        var bankName, index, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                bankName = e.target.parentNode.querySelector('h2').innerText;
                this.state.linkedBanks.map(function (bank, i) {
                  if (bank === bankName) {
                    index = i;
                  }
                });
                _context2.prev = 2;
                _context2.next = 5;
                return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/plaid-api/remove-account', {
                  data: {
                    bankIndex: index,
                    bankName: this.state.linkedBanks[index]
                  }
                });

              case 5:
                result = _context2.sent;
                this.setState({
                  linkedBanks: [].concat(_toConsumableArray(this.state.linkedBanks.slice(0, index)), _toConsumableArray(this.state.linkedBanks.slice(index + 1)))
                });
                window.localStorage.clear();
                window.sessionStorage.cleaar();
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](2);
                console.log("DISPLAY ERROR MESSAGE");
                console.log(_context2.t0.ERROR);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 11]]);
      }));

      function removeAccount(_x) {
        return _removeAccount.apply(this, arguments);
      }

      return removeAccount;
    }()
  }, {
    key: "rotateAccessTokens",
    value: function () {
      var _rotateAccessTokens = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var returnVal;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/plaid-api/rotate-access-tokens');

              case 2:
                returnVal = _context3.sent;

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function rotateAccessTokens() {
        return _rotateAccessTokens.apply(this, arguments);
      }

      return rotateAccessTokens;
    }()
  }, {
    key: "updateInputValue",
    value: function updateInputValue(e) {
      var updatedMonthlyBudget = e.target.value.trim(); // Update state value

      this.setState({
        monthlyBudget: updatedMonthlyBudget
      });
    }
  }, {
    key: "updateMonthlyBudget",
    value: function updateMonthlyBudget(e) {
      e.preventDefault();
      var updatedMonthlyBudget = document.querySelector("#monthly-budget").value; // Update local storage value

      localStorage.setItem("monthlyBudget", updatedMonthlyBudget); // Update Session/DB value

      axios__WEBPACK_IMPORTED_MODULE_3___default()({
        method: 'POST',
        url: '/user-info/monthly-budget',
        data: {
          monthlyBudget: updatedMonthlyBudget
        }
      }); // Display a success message optimistically

      this.displayMessage("Your monthly budget was updated");
    }
  }, {
    key: "displayMessage",
    value: function displayMessage(msg) {
      var _this2 = this;

      this.setState({
        message: msg,
        display: true
      });
      setTimeout(function () {
        _this2.setState({
          display: false
        });
      }, 5500);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "settings"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ErrorMessage_ErrorMessage_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        display: this.state.display,
        text: this.state.message,
        color: this.state.color
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Linked Banks"), this.state.linkedBanks.map(function (bank, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: index,
          className: "settings--linked-accounts"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, bank), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          onClick: function onClick(e) {
            return _this3.removeAccount(e);
          }
        }, "Remove"));
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: "settings--monthly-budget",
        onSubmit: this.updateMonthlyBudget
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Your Monthly Budget"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: "monthly-budget",
        placeholder: "Loading...",
        type: "number",
        name: "budget",
        value: this.state.monthlyBudget,
        onChange: this.updateInputValue
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "submit",
        type: "submit",
        value: "Update",
        onClick: this.updateMonthlyBudget
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AccountNames_AccountNames_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
        accounts: this.props.accounts
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "settings--rotate-tokens"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "If you think your account has been compromised, click the button below to delete and generate new access tokens"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.rotateAccessTokens
      }, "Rotate Access Tokens")));
    }
  }]);

  return Settings;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Settings);

/***/ }),

/***/ "./src/Budgeteer/Settings/settings.scss":
/*!**********************************************!*\
  !*** ./src/Budgeteer/Settings/settings.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src!../../../node_modules/sass-loader/lib/loader.js!./settings.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Settings/settings.scss");

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
//# sourceMappingURL=7.js.map