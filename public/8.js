(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/home/home.scss":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/home/home.scss ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".home * {\n  overflow-y: hidden; }\n\n.home h1 {\n  margin-bottom: 30px;\n  text-align: center; }\n\n.home h2 {\n  text-align: center; }\n\n.home--loading img {\n  margin: 0 auto;\n  width: 80vw;\n  padding: 10px;\n  display: block;\n  border: 5px solid #6490b7;\n  border-radius: 50%; }\n", ""]);



/***/ }),

/***/ "./node_modules/date-fns/is_same_month/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/is_same_month/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameMonth (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear() &&
    dateLeft.getMonth() === dateRight.getMonth()
}

module.exports = isSameMonth


/***/ }),

/***/ "./node_modules/date-fns/is_same_year/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/date-fns/is_same_year/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param {Date|String|Number} dateLeft - the first date to check
 * @param {Date|String|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(
 *   new Date(2014, 8, 2),
 *   new Date(2014, 8, 25)
 * )
 * //=> true
 */
function isSameYear (dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft)
  var dateRight = parse(dirtyDateRight)
  return dateLeft.getFullYear() === dateRight.getFullYear()
}

module.exports = isSameYear


/***/ }),

/***/ "./src/Budgeteer/home/home.jsx":
/*!*************************************!*\
  !*** ./src/Budgeteer/home/home.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Statistics_BudgetChart_BudgetChart_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Statistics/BudgetChart/BudgetChart.jsx */ "./src/Budgeteer/Statistics/BudgetChart/BudgetChart.jsx");
/* harmony import */ var _AccountsContainer_TransactionContainer_TransactionContainer_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../AccountsContainer/TransactionContainer/TransactionContainer.jsx */ "./src/Budgeteer/AccountsContainer/TransactionContainer/TransactionContainer.jsx");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers */ "./src/Budgeteer/helpers.js");
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home.scss */ "./src/Budgeteer/home/home.scss");
/* harmony import */ var _home_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_home_scss__WEBPACK_IMPORTED_MODULE_5__);
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








var Home =
/*#__PURE__*/
function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    var _this;

    _classCallCheck(this, Home);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Home).call(this, props));
    _this.state = {
      total: window.sessionStorage.getItem("total") || "...",
      transactions: []
    };
    return _this;
  }

  _createClass(Home, [{
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
                console.log("Making call to balance now: ");
                _context.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_0___default()({
                  method: "POST",
                  url: '/plaid-api/balance'
                });

              case 3:
                data = _context.sent;
                data = data.data;

                if (!data.Error) {
                  _context.next = 16;
                  break;
                }

                _context.next = 8;
                return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/plaid-api/key-and-env');

              case 8:
                keyAndEnv = _context.sent;
                keyAndEnv = keyAndEnv.data;
                console.log("keyAndEnv");
                console.log(keyAndEnv); // Open plaid in Link Mode

                plaid = Plaid.create({
                  key: keyAndEnv.publicKey,
                  env: keyAndEnv.env,
                  apiVersion: 'v2',
                  clientName: 'Update Account',
                  product: ['transactions'],
                  token: data.publicToken,
                  onSuccess: function onSuccess(public_token, metadata) {
                    console.log("Update of Account successful");
                    console.log("public_token:", public_token);
                    console.log("Metadata:", metadata);
                  },
                  onExit: function onExit(err, metadata) {
                    console.log("err:", err);
                    console.log("metadata:", metadata);
                  }
                });
                plaid.open();
                _context.next = 19;
                break;

              case 16:
                data = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["numberWithCommas"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatAmount"])(data.networth));
                this.setState({
                  total: data
                });
                window.sessionStorage.setItem("total", data);

              case 19:
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
      var text;

      if (this.props.loading) {
        text = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: "home--loading"
        }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "Loading..."), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
          src: "./loading-gifs/loading-one.gif",
          alt: "loading"
        }));
      } else {
        text = "";
      }

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "home"
      }, text, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, "Your Snapshot"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "home--monthly-budget"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Monthly Budget"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Statistics_BudgetChart_BudgetChart_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
        displayInput: false,
        transactions: this.props.transactions
      })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "home--transactions"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AccountsContainer_TransactionContainer_TransactionContainer_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
        transactions: this.state.transactions,
        accounts: this.props.accounts
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var sortedTransactions = props.transactions.sort(function (a, b) {
        var dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
        var dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
        return dateTwo - dateOne;
      });
      return {
        transactions: sortedTransactions.slice(0, 3)
      };
    }
  }]);

  return Home;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./src/Budgeteer/home/home.scss":
/*!**************************************!*\
  !*** ./src/Budgeteer/home/home.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src!../../../node_modules/sass-loader/lib/loader.js!./home.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/home/home.scss");

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
//# sourceMappingURL=8.js.map