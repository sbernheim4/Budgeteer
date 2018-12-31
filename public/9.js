(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Networth/networth.scss":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Networth/networth.scss ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".networth {\n  position: relative; }\n  @media all and (min-width: 801px) {\n    .networth {\n      margin-top: 0; } }\n  .networth--loading {\n    padding: 30px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center; }\n    .networth--loading h1 {\n      text-align: center; }\n    .networth--loading img {\n      margin-top: 20px;\n      border-radius: 20px; }\n  .networth table {\n    margin: 0 auto;\n    padding: 30px;\n    border-collapse: collapse; }\n    .networth table thead tr {\n      border-bottom: 1px solid #ff8484; }\n      .networth table thead tr th {\n        width: 200px;\n        padding-bottom: 10px;\n        font-size: 30px;\n        text-align: center; }\n    .networth table tbody tr td {\n      width: 300px;\n      height: 40px;\n      padding: 10px;\n      font-size: 30px;\n      text-align: center; }\n    .networth table tbody tr .acct-name {\n      text-align: center; }\n    .networth table tbody tr:nth-child(even) {\n      background: #1c2b36; }\n    .networth table tbody tr:hover {\n      background: #17232c; }\n  .networth--recurring-payments {\n    margin: 30px;\n    width: 260px; }\n    .networth--recurring-payments hr {\n      margin-bottom: 30px;\n      height: 1px;\n      background-color: gray; }\n", ""]);



/***/ }),

/***/ "./src/Budgeteer/Networth/Networth.jsx":
/*!*********************************************!*\
  !*** ./src/Budgeteer/Networth/Networth.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers.js */ "./src/Budgeteer/helpers.js");
/* harmony import */ var _networth_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./networth.scss */ "./src/Budgeteer/Networth/networth.scss");
/* harmony import */ var _networth_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_networth_scss__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Networth =
/*#__PURE__*/
function (_Component) {
  _inherits(Networth, _Component);

  function Networth(props) {
    var _this;

    _classCallCheck(this, Networth);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Networth).call(this, props));
    _this.state = {
      total: 0,
      // Keep track of total net worth
      accountBalances: [],
      // Map of account name to its balance
      recurringPayments: [],
      // Keep track of recurring costs like Spotify or Netflix etc
      loading: true
    };
    return _this;
  }

  _createClass(Networth, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var duplicates = new Set();
      nextProps.transactions.forEach(function (val) {
        var numOccurances = 0;
        nextProps.transactions.forEach(function (secondVal) {
          if (JSON.stringify(val) === JSON.stringify(secondVal)) {
            numOccurances += 1;
          }
        }); // TODO: Change the 1 to the minimum number of times you want the number of
        // occurances to be before its considered a recurring payment.
        //
        // Should also work to check that the payment has been made in the past two
        // most recent months (NOT INCLUDING THE CURRENT MONTH)

        if (numOccurances > 1) {
          duplicates.add(JSON.stringify(val));
        }
      });
      var recurringPayments = [];
      duplicates.forEach(function (payment) {
        recurringPayments.push(JSON.parse(payment));
      });
      this.setState({
        recurringPayments: recurringPayments
      });
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var data, keyAndEnv, plaid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!window.sessionStorage.getItem("balance")) {
                  _context.next = 5;
                  break;
                }

                data = window.sessionStorage.getItem("balance");
                data = JSON.parse(data);
                _context.next = 16;
                break;

              case 5:
                _context.next = 7;
                return axios__WEBPACK_IMPORTED_MODULE_0___default()({
                  method: "POST",
                  url: '/plaid-api/balance'
                });

              case 7:
                data = _context.sent;
                data = data.data;

                if (!data.Error) {
                  _context.next = 15;
                  break;
                }

                _context.next = 12;
                return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/plaid-api/key-and-env');

              case 12:
                keyAndEnv = _context.sent;
                plaid = Plaid.create({
                  apiVersion: 'v2',
                  clientName: 'Update Account',
                  env: keyAndEnv.data.env,
                  product: ['balance'],
                  key: keyAndEnv.data.publicKey,
                  token: data.publicToken,
                  onSuccess: function onSuccess(public_token) {
                    console.log("Update of Account successful");
                  }
                });
                plaid.open();

              case 15:
                window.sessionStorage.setItem("balance", JSON.stringify(data));

              case 16:
                this.setState({
                  total: data.networth,
                  accountBalances: data.maps,
                  loading: false
                });

              case 17:
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
    key: "render",
    value: function render() {
      var recurringPayments;

      if (this.state.recurringPayments.length === 0) {
        recurringPayments = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "No Recurring Payments Found");
      } else {
        recurringPayments = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null, " this.state.recurringPayments.map(val => ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null, "val.name"), ") ");
      }

      var netWorthChart;

      if (this.state.loading) {
        netWorthChart = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: "networth--loading"
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "Hang tight, getting your data from the cloud"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
          src: "/loading-gifs/loading-three.gif",
          alt: "loading"
        }));
      } else {
        netWorthChart = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Account Name"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Amount"))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, this.state.accountBalances.map(function (keyName, index) {
          return Object.keys(keyName).map(function (acctName, index) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", {
              key: index,
              className: "networth--entry"
            }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", {
              className: "acct-name"
            }, Object(_helpers_js__WEBPACK_IMPORTED_MODULE_2__["toTitleCase"])(acctName)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", {
              className: "acct-value"
            }, Object(_helpers_js__WEBPACK_IMPORTED_MODULE_2__["isNumber"])(keyName[acctName]) === true ? '$' + Object(_helpers_js__WEBPACK_IMPORTED_MODULE_2__["numberWithCommas"])(Object(_helpers_js__WEBPACK_IMPORTED_MODULE_2__["formatAmount"])(keyName[acctName])) : "N/A"));
          });
        }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", {
          className: "acct-name"
        }, "Total"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", {
          className: "acct-value"
        }, "$", Object(_helpers_js__WEBPACK_IMPORTED_MODULE_2__["numberWithCommas"])(Object(_helpers_js__WEBPACK_IMPORTED_MODULE_2__["formatAmount"])(this.state.total))))));
      }

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "networth"
      }, netWorthChart, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "networth--recurring-payments"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Recurring Payments"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null), recurringPayments));
    }
  }]);

  return Networth;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Networth);

/***/ }),

/***/ "./src/Budgeteer/Networth/networth.scss":
/*!**********************************************!*\
  !*** ./src/Budgeteer/Networth/networth.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src!../../../node_modules/sass-loader/lib/loader.js!./networth.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Networth/networth.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/Budgeteer/helpers.js":
/*!**********************************!*\
  !*** ./src/Budgeteer/helpers.js ***!
  \**********************************/
/*! exports provided: numberWithCommas, formatAmount, toTitleCase, isNumber, mapToJson, jsonToMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numberWithCommas", function() { return numberWithCommas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatAmount", function() { return formatAmount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTitleCase", function() { return toTitleCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapToJson", function() { return mapToJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsonToMap", function() { return jsonToMap; });
function numberWithCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatAmount(amt) {
	return (Math.round(amt * 100) / 100).toFixed(2);
}

function toTitleCase(str) {
	if (str === "" || str === null) return "";
	return str.toLowerCase().split(' ').map(function(word) {
		return word.replace(word[0], word[0].toUpperCase());
	}).join(' ');
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

function mapToJson(map) {
	return JSON.stringify([...map]);
}

function jsonToMap(jsonStr) {
	return new Map(JSON.parse(jsonStr));
}


/***/ })

}]);
//# sourceMappingURL=9.js.map