(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/transaction.scss":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/transaction.scss ***!
  \************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".transaction {\n  margin: 5px;\n  width: 80%;\n  background-color: #eae3d7;\n  cursor: pointer;\n  transition: background-color .5s ease; }\n  .transaction:hover {\n    background-color: #dbd1bd; }\n  @media all and (max-width: 600px) {\n    .transaction {\n      margin: 0;\n      width: 100%;\n      border-bottom: 1px solid gray; } }\n  @media all and (min-width: 1200px) {\n    .transaction {\n      margin: 5px;\n      max-width: 700px;\n      width: 45%;\n      border-bottom: none; } }\n  .transaction--map iframe {\n    margin: 0 auto;\n    width: 100%;\n    height: 300px;\n    transition: height .3s ease-in;\n    display: flex;\n    justify-content: center; }\n  .transaction .container {\n    padding: 15px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    pointer-events: none; }\n    .transaction .container .icon {\n      margin: 10px 10px 10px 10px;\n      font-size: 1.5em; }\n      @media all and (max-width: 400px) {\n        .transaction .container .icon {\n          font-size: 1em; } }\n      .transaction .container .icon path {\n        color: #253847; }\n    .transaction .container .name-info {\n      margin-left: 10px;\n      width: 50%;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: flex-start; }\n      .transaction .container .name-info--name {\n        width: 100%;\n        font-size: 22px;\n        color: black;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        overflow: hidden; }\n      .transaction .container .name-info--category {\n        width: 100%;\n        font-size: 17px;\n        color: black;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        overflow: hidden; }\n        .transaction .container .name-info--category span {\n          color: #f98183; }\n    .transaction .container .amount {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: flex-end; }\n      .transaction .container .amount--amt {\n        width: 100%;\n        color: #9f0404; }\n        .transaction .container .amount--amt__green {\n          width: 100%;\n          color: #116600; }\n      .transaction .container .amount--date {\n        color: black;\n        align-self: flex-end; }\n        @media all and (max-width: 365px) {\n          .transaction .container .amount--date {\n            font-size: .8em; } }\n  .transaction * {\n    overflow-y: hidden; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/TransactionContainer/transactionContainer.scss":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/TransactionContainer/transactionContainer.scss ***!
  \*********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".transaction-container {\n  margin: 40px auto;\n  border-top: 3px solid black;\n  background: #304e60; }\n  .transaction-container h1 {\n    margin-top: 15px;\n    display: flex;\n    justify-content: center; }\n  .transaction-container .transaction--totals {\n    padding: 20px 5px 0 5px;\n    text-align: center;\n    font-size: 1.4em; }\n    @media all and (min-width: 1000px) {\n      .transaction-container .transaction--totals {\n        font-size: 2em; } }\n  .transaction-container .transactions {\n    margin: 15px 0 30px 0;\n    border-radius: 5px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center; }\n    @media all and (min-width: 1200px) {\n      .transaction-container .transactions {\n        margin: 15px auto;\n        max-width: 1560px;\n        flex-direction: row;\n        align-items: flex-start;\n        flex-wrap: wrap; } }\n    .transaction-container .transactions button {\n      margin: 30px;\n      width: 150px;\n      height: 45px;\n      background-color: #46926b;\n      border: 1px solid black;\n      border-radius: 5px;\n      color: black;\n      cursor: pointer; }\n", ""]);



/***/ }),

/***/ "./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/Transaction.jsx":
/*!******************************************************************************************!*\
  !*** ./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/Transaction.jsx ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../helpers */ "./src/Budgeteer/helpers.js");
/* harmony import */ var _transaction_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transaction.scss */ "./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/transaction.scss");
/* harmony import */ var _transaction_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_transaction_scss__WEBPACK_IMPORTED_MODULE_5__);
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

/*eslint no-undefined: 0*/







var Transaction =
/*#__PURE__*/
function (_Component) {
  _inherits(Transaction, _Component);

  function Transaction(props) {
    var _this;

    _classCallCheck(this, Transaction);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Transaction).call(this, props));
    _this.state = {
      months: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
      displayNames: new Map()
    };
    _this.showMap = _this.showMap.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getAccountNameFromID = _this.getAccountNameFromID.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Transaction, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var displayNames, map;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return axios__WEBPACK_IMPORTED_MODULE_3___default.a.get("/user-info/display-names");

              case 3:
                displayNames = _context.sent;
                displayNames = displayNames.data;
                map = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["jsonToMap"])(displayNames);
                this.setState({
                  displayNames: map
                });
                _context.next = 13;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.log("ERROR");
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
    key: "formatDate",
    value: function formatDate(date) {
      var monthNumber = parseInt(date.slice(date.indexOf("-") + 1, date.indexOf("-") + 3));
      var day = date.slice(date.length - 3, date.length - 1);
      var year = date.slice(1, 5);
      return this.state.months[monthNumber - 1] + " " + day + " '" + year.slice(2);
    }
  }, {
    key: "showMap",
    value: function showMap(e) {
      e.persist();
      var iframe = document.createElement("iframe"); // TODO: Currently hardcoding latitude and longitude but it should come from:
      // this.props.transaction.location.lat
      // this.props.transaction.location.lon

      /*iframe.src = "https://www.google.com/maps/embed/v1/place?q=40.7828647,-73.9653551&key=AIzaSyAUsLmC72g_Z2FhkgrmgMgFbjdIx8YDPPA&zoom=15"*/
      // WITH API KEY
      // "https://www.google.com/maps/embed/v1/place?q=40.7829,73.9654&key=AIzaSyAUsLmC72g_Z2FhkgrmgMgFbjdIx8YDPPA&zoom=15"
      // WITHOUT API KEY

      if (this.props.transaction.location.lat !== null && this.props.transaction.location.lon !== null) {
        iframe.src = "https://maps.google.com/maps?q=".concat(this.props.transaction.location.lat, ",").concat(this.props.transaction.location.lon, "&z=15&output=embed");
      } else {
        iframe.src = "https://maps.google.com/maps?q=40.7828647,-73.9653551&z=15&output=embed";
      } // this.closeAllIFrames();


      var containsIFrame = !!e.target.querySelector("iframe");

      if (!containsIFrame) {
        // close any other open iframes
        document.querySelectorAll(".transaction--map").forEach(function (val) {
          val.classList.remove("transaction--map"); // Actually remove the iframe after the transition is done

          setTimeout(function () {
            val.removeChild(val.children[1]);
          }, 300);
        }); // open selected iframe

        e.target.appendChild(iframe);
        e.target.classList.toggle("transaction--map");
      } else {
        // remove the iframe from the element
        e.target.classList.remove("transaction--map"); // Actually remove the iframe after the transition is done

        setTimeout(function () {
          e.target.removeChild(e.target.children[1]);
        }, 300);
      }
    }
  }, {
    key: "getAccountDisplayName",
    value: function getAccountDisplayName(accountID, defaultName) {
      var x = this.state.displayNames;
      if (x === undefined) return defaultName;
      return x.get(accountID) || defaultName;
    }
  }, {
    key: "getAccountNameFromID",
    value: function getAccountNameFromID(accountID) {
      var x = this.state.displayNames;
      var defaultName;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.props.accounts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var acct = _step.value;

          if (acct.account_id === accountID) {
            defaultName = acct.name;
          }
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

      return x.get(accountID) || defaultName;
    }
  }, {
    key: "getCategoryIcon",
    value: function getCategoryIcon(categoryName) {
      // Determine what icon to show on the left side
      var categoryIcon;

      switch (categoryName) {
        case "Food and Drink":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faUtensils"];
          break;

        case "Travel":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faPlane"];
          break;

        case "Shops":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faShoppingBag"];
          break;

        case "Recreation":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faTape"];
          break;

        case "Service":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faWrench"];
          break;

        case "Community":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faUsers"];
          break;

        case "Healthcare":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faMedkit"];
          break;
        // case "Bank Fees":
        // 	categoryIcon = ;
        // 	break;
        // case "Cash Advance":
        // 	categoryIcon = ;
        // 	break;

        case "Interest":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faPercent"];
          break;

        case "Payment":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faMoneyBillAlt"];
          break;
        // case "Tax":
        // 	categoryIcon = ;
        // 	break;

        case "Transfer":
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faExchangeAlt"];
          break;

        default:
          categoryIcon = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faQuestion"];
      }

      return categoryIcon;
    }
  }, {
    key: "render",
    value: function render() {
      var date = this.formatDate(JSON.stringify(this.props.transaction.date));
      var amount = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatAmount"])(this.props.transaction.amount); // The below URL doesn't require an API key, might be better
      // let srcString = "https://maps.google.com/maps?q=" + this.props.location.lon + "," + this.props.location.lat + "&z=15&output=embed"
      // Get the category of the transaction or Null if unknown

      var category = this.props.transaction.category !== null && this.props.transaction.category !== undefined ? this.props.transaction.category[0] : category = "Null";
      var amt = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["formatAmount"])(this.props.transaction.amount * -1);
      amt = "$" + Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["numberWithCommas"])(amt); // Should the color for the amount be red or green based based on it being positive or negative

      var amtColor = this.props.transaction.amount > 0 ? 'amount--amt' : 'amount--amt__green';
      var name = Object(_helpers__WEBPACK_IMPORTED_MODULE_4__["toTitleCase"])(this.props.transaction.name);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "transaction",
        onClick: this.showMap
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__["FontAwesomeIcon"], {
        className: "icon",
        icon: this.getCategoryIcon(category)
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "name-info"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "name-info--name"
      }, name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "name-info--category"
      }, this.getAccountNameFromID(this.props.transaction.account_id), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.transaction.pending === true ? '- Pending' : ''))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "amount"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: amtColor
      }, amt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "amount--date"
      }, date))));
    }
  }]);

  return Transaction;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Transaction);

/***/ }),

/***/ "./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/transaction.scss":
/*!*******************************************************************************************!*\
  !*** ./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/transaction.scss ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src!../../../../../node_modules/sass-loader/lib/loader.js!./transaction.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/transaction.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/Budgeteer/AccountsContainer/TransactionContainer/TransactionContainer.jsx":
/*!***************************************************************************************!*\
  !*** ./src/Budgeteer/AccountsContainer/TransactionContainer/TransactionContainer.jsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Transaction_Transaction_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transaction/Transaction.jsx */ "./src/Budgeteer/AccountsContainer/TransactionContainer/Transaction/Transaction.jsx");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers */ "./src/Budgeteer/helpers.js");
/* harmony import */ var _transactionContainer_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transactionContainer.scss */ "./src/Budgeteer/AccountsContainer/TransactionContainer/transactionContainer.scss");
/* harmony import */ var _transactionContainer_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_transactionContainer_scss__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }






var TransactionContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(TransactionContainer, _Component);

  function TransactionContainer(props) {
    var _this;

    _classCallCheck(this, TransactionContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionContainer).call(this, props)); // let initialNum = this.props.transactions.length < 10 ? this.props.transactions.length : 10

    var transactions = _this.props.transactions.slice(-10).reverse();

    _this.state = {
      num: 10,
      transactionsToDisplay: transactions
    };
    _this.showMoreItems = _this.showMoreItems.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TransactionContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener("scroll", function () {
        if (_this2.state.transactionsToDisplay.length !== _this2.props.transactions.length) {
          var num = document.documentElement.scrollTop + document.body.scrollTop;
          var denom = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var percent = num / denom * 100;

          if (percent > .75) {
            _this2.showMoreItems();
          }
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("scroll", function () {});
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        transactionsToDisplay: nextProps.transactions.slice(-10).reverse(),
        num: 10
      });
    }
  }, {
    key: "showMoreItems",
    value: function showMoreItems() {
      if (this.state.num + 20 > this.props.transactions.length) {
        // if there are fewer than n transactions left --> Don't want to go over limit
        this.setState({
          transactionsToDisplay: this.props.transactions.reverse(),
          num: this.props.transactions.length
        });
      } else {
        // if there are n or more transactions left
        var relevent = this.props.transactions.slice(-(this.state.num + 20)).reverse();
        this.setState({
          transactionsToDisplay: relevent,
          num: this.state.num + 20
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var amtColor = this.props.categoryTotal * -1 > 0 ? 'green' : 'red';
      var transactionInfo = this.props.categoryType ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: "transaction--totals"
      }, this.props.categoryType, ": ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: amtColor
      }, "$", Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["numberWithCommas"])(this.props.categoryTotal * -1))) : '';
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: "transaction-container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Past Transactions"), transactionInfo, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "transactions"
      }, this.state.transactionsToDisplay.map(function (t, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Transaction_Transaction_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
          key: index,
          accounts: _this3.props.accounts,
          transaction: t
        });
      })));
    }
  }]);

  return TransactionContainer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (TransactionContainer);

/***/ }),

/***/ "./src/Budgeteer/AccountsContainer/TransactionContainer/transactionContainer.scss":
/*!****************************************************************************************!*\
  !*** ./src/Budgeteer/AccountsContainer/TransactionContainer/transactionContainer.scss ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src!../../../../node_modules/sass-loader/lib/loader.js!./transactionContainer.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/TransactionContainer/transactionContainer.scss");

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
//# sourceMappingURL=2.js.map