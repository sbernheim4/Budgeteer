(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/WeekSpendingChart/weekSpendingChart.scss":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/WeekSpendingChart/weekSpendingChart.scss ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".green {\n  color: #46926b; }\n\n.red {\n  color: #f98183; }\n\n.total-spent {\n  margin-bottom: 30px;\n  text-align: center; }\n\n.week-spending-chart {\n  margin: 0 auto;\n  max-width: 900px !important; }\n  .week-spending-chart--custom-tooltip {\n    margin-right: 30px;\n    padding: 15px;\n    background: black;\n    border-radius: 5px; }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/accountsContainer.scss":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/accountsContainer.scss ***!
  \*********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "@charset \"UTF-8\";\n.accounts--search-options--icon-search--categorical-search--categories div, .accounts--search-options--icon-search--accts-search--accts div {\n  -webkit-transform: translateY(-50px);\n          transform: translateY(-50px);\n  visibility: hidden;\n  opacity: 0;\n  position: absolute;\n  padding: 20px;\n  background-color: black;\n  border-radius: 10px;\n  transition: all 0.3s ease-out; }\n\n.accounts--search-options--icon-search--categorical-search--categories:before, .accounts--search-options--icon-search--accts-search--accts:before {\n  -webkit-transform: translateY(-50px);\n          transform: translateY(-50px);\n  opacity: 0;\n  content: \"\";\n  position: absolute;\n  margin-top: 20px;\n  width: 0;\n  height: 0;\n  border-bottom: 50px solid rgba(0, 0, 0, 0.6);\n  border-left: 25px solid transparent;\n  border-right: 25px solid transparent;\n  transition: opacity .3s ease-out, -webkit-transform .3s ease-out;\n  transition: transform .3s ease-out, opacity .3s ease-out;\n  transition: transform .3s ease-out, opacity .3s ease-out, -webkit-transform .3s ease-out; }\n\n.accounts {\n  position: relative; }\n  @media all and (min-width: 801px) {\n    .accounts {\n      margin-top: 0; } }\n  .accounts .red {\n    text-align: center;\n    color: #f98183; }\n  .accounts .green {\n    text-align: center;\n    color: #46926b; }\n  .accounts--search-options {\n    margin: 0 20px 20px 20px;\n    display: flex;\n    justify-content: space-around;\n    align-items: center; }\n    @media all and (max-width: 600px) {\n      .accounts--search-options {\n        flex-direction: column; } }\n    .accounts--search-options--icon-search {\n      max-width: 300px;\n      width: 30%;\n      display: flex;\n      justify-content: space-around;\n      align-items: center; }\n      @media all and (max-width: 600px) {\n        .accounts--search-options--icon-search {\n          margin-top: 15px;\n          width: 80%; } }\n      .accounts--search-options--icon-search--categorical-search {\n        display: flex;\n        flex-direction: column;\n        align-items: center; }\n        .accounts--search-options--icon-search--categorical-search .icon {\n          font-size: 30px;\n          cursor: pointer;\n          z-index: 1; }\n          .accounts--search-options--icon-search--categorical-search .icon path {\n            transition: color .1s ease-in; }\n            .accounts--search-options--icon-search--categorical-search .icon path:hover {\n              color: #ff8484; }\n        .accounts--search-options--icon-search--categorical-search--categories {\n          display: flex;\n          justify-content: center; }\n          .accounts--search-options--icon-search--categorical-search--categories div {\n            width: 260px;\n            height: 250px;\n            overflow-y: scroll;\n            display: flex;\n            justify-content: flex-start;\n            flex-wrap: wrap;\n            z-index: 1; }\n            .accounts--search-options--icon-search--categorical-search--categories div section {\n              margin: 10px;\n              width: calc(33% - 20px);\n              display: flex;\n              flex-direction: column;\n              align-items: center; }\n              .accounts--search-options--icon-search--categorical-search--categories div section .category-icon {\n                margin-bottom: 5px;\n                font-size: 40px; }\n                .accounts--search-options--icon-search--categorical-search--categories div section .category-icon path {\n                  transition: color .1s ease-in; }\n                  .accounts--search-options--icon-search--categorical-search--categories div section .category-icon path:hover {\n                    color: #f98183; }\n              .accounts--search-options--icon-search--categorical-search--categories div section p {\n                font-size: 12px;\n                text-align: center; }\n        .accounts--search-options--icon-search--categorical-search--categories__active {\n          display: flex;\n          justify-content: center; }\n          .accounts--search-options--icon-search--categorical-search--categories__active:before {\n            -webkit-transform: translateY(0px);\n                    transform: translateY(0px);\n            opacity: 1; }\n          .accounts--search-options--icon-search--categorical-search--categories__active div {\n            margin-top: 60px;\n            -webkit-transform: translateY(0);\n                    transform: translateY(0);\n            visibility: visible;\n            opacity: 1;\n            transition: all 0.3s ease-out; }\n            @media all and (max-width: 525px) {\n              .accounts--search-options--icon-search--categorical-search--categories__active div {\n                margin-left: 50px; } }\n            .accounts--search-options--icon-search--categorical-search--categories__active div .category-icon {\n              cursor: pointer; }\n              .accounts--search-options--icon-search--categorical-search--categories__active div .category-icon:hover {\n                color: #f98183; }\n              .accounts--search-options--icon-search--categorical-search--categories__active div .category-icon path {\n                color: inherit; }\n            .accounts--search-options--icon-search--categorical-search--categories__active div button {\n              width: 0;\n              height: 0; }\n      .accounts--search-options--icon-search--date-search .icon {\n        font-size: 35px;\n        cursor: pointer; }\n        .accounts--search-options--icon-search--date-search .icon path {\n          transition: color .2s ease-in; }\n          .accounts--search-options--icon-search--date-search .icon path:hover {\n            color: #ff8484; }\n      .accounts--search-options--icon-search--accts-search {\n        display: flex;\n        flex-direction: column;\n        align-items: center; }\n        .accounts--search-options--icon-search--accts-search .icon {\n          font-size: 40px;\n          cursor: pointer;\n          z-index: 1; }\n          .accounts--search-options--icon-search--accts-search .icon path {\n            transition: color .1s ease-in; }\n            .accounts--search-options--icon-search--accts-search .icon path:hover {\n              color: #ff8484; }\n        .accounts--search-options--icon-search--accts-search--accts {\n          display: flex;\n          justify-content: center; }\n          .accounts--search-options--icon-search--accts-search--accts div {\n            width: 180px;\n            max-height: 300px;\n            padding: 20px;\n            justify-content: flex-start;\n            z-index: 1;\n            overflow-y: scroll; }\n            .accounts--search-options--icon-search--accts-search--accts div::-webkit-scrollbar {\n              width: 7px;\n              background-color: rgba(100, 100, 100, 0.7);\n              outline: 1px solid slategrey;\n              -webkit-appearance: none; }\n            .accounts--search-options--icon-search--accts-search--accts div::-webkit-scrollbar-thumb {\n              background-color: rgba(100, 100, 100, 0.7);\n              border-radius: 4px;\n              outline: 1px solid slategrey;\n              -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5); }\n            .accounts--search-options--icon-search--accts-search--accts div button {\n              margin: 15px 0;\n              width: 100%;\n              background-color: black;\n              border-radius: 5px;\n              text-align: left;\n              font-size: 1em;\n              color: white;\n              cursor: pointer; }\n              .accounts--search-options--icon-search--accts-search--accts div button:before {\n                content: \"▪ \";\n                white-space: pre; }\n        .accounts--search-options--icon-search--accts-search--accts__active {\n          display: flex;\n          justify-content: center; }\n          .accounts--search-options--icon-search--accts-search--accts__active:before {\n            -webkit-transform: translateY(0px);\n                    transform: translateY(0px);\n            opacity: 1; }\n          .accounts--search-options--icon-search--accts-search--accts__active div {\n            margin-top: 60px;\n            -webkit-transform: translateY(0) translateX(-23%);\n                    transform: translateY(0) translateX(-23%);\n            visibility: visible;\n            opacity: 1;\n            transition: all 0.3s ease-out; }\n    .accounts--search-options--keyword-search {\n      width: 90%;\n      font-size: 15px; }\n      @media all and (max-width: 600px) {\n        .accounts--search-options--keyword-search {\n          margin-top: 15px;\n          width: 100%; } }\n      .accounts--search-options--keyword-search .icon {\n        padding: 15px;\n        font-size: 30px; }\n      .accounts--search-options--keyword-search form {\n        width: 100%;\n        display: flex;\n        justify-content: center; }\n        .accounts--search-options--keyword-search form input {\n          display: block;\n          margin: 0 auto;\n          width: 85%;\n          height: 61px;\n          padding: 0 15px;\n          background-color: #253847;\n          border: 1px solid white;\n          border-radius: 6px;\n          font-size: 20px;\n          color: white;\n          transition: all .2s ease-in; }\n          .accounts--search-options--keyword-search form input:focus {\n            border: 1px solid #ff8484; }\n    .accounts--search-options--date-picker {\n      display: flex;\n      flex-direction: row;\n      justify-content: center; }\n      .accounts--search-options--date-picker input {\n        width: 100px;\n        height: 30px;\n        background-color: grey;\n        color: white;\n        align-self: center; }\n      .accounts--search-options--date-picker div {\n        margin: 10px;\n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: flex-end; }\n        .accounts--search-options--date-picker div p {\n          margin-bottom: 5px; }\n        .accounts--search-options--date-picker div label input {\n          margin-left: 10px;\n          width: 100px;\n          border: 1px solid black;\n          color: black; }\n  .accounts--chart {\n    margin: 0 10px;\n    max-width: 900px; }\n    @media all and (min-width: 600px) {\n      .accounts--chart {\n        margin: 0 auto;\n        display: flex;\n        justify-content: center;\n        align-items: flex-end; } }\n    @media all and (min-width: 600px) and (max-width: 700px) {\n      .accounts--chart {\n        width: 80vw; } }\n    @media all and (min-width: 700px) {\n      .accounts--chart {\n        width: 65vw; } }\n  .accounts--sort-options {\n    text-align: center; }\n", ""]);



/***/ }),

/***/ "./node_modules/date-fns/add_days/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/add_days/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added
 * @returns {Date} the new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * var result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays (dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate)
  var amount = Number(dirtyAmount)
  date.setDate(date.getDate() + amount)
  return date
}

module.exports = addDays


/***/ }),

/***/ "./node_modules/date-fns/add_weeks/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/add_weeks/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addDays = __webpack_require__(/*! ../add_days/index.js */ "./node_modules/date-fns/add_days/index.js")

/**
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added
 * @returns {Date} the new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * var result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  var days = amount * 7
  return addDays(dirtyDate, days)
}

module.exports = addWeeks


/***/ }),

/***/ "./node_modules/date-fns/is_after/index.js":
/*!*************************************************!*\
  !*** ./node_modules/date-fns/is_after/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|String|Number} date - the date that should be after the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter (dirtyDate, dirtyDateToCompare) {
  var date = parse(dirtyDate)
  var dateToCompare = parse(dirtyDateToCompare)
  return date.getTime() > dateToCompare.getTime()
}

module.exports = isAfter


/***/ }),

/***/ "./node_modules/date-fns/is_within_range/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/is_within_range/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(/*! ../parse/index.js */ "./node_modules/date-fns/parse/index.js")

/**
 * @category Range Helpers
 * @summary Is the given date within the range?
 *
 * @description
 * Is the given date within the range?
 *
 * @param {Date|String|Number} date - the date to check
 * @param {Date|String|Number} startDate - the start of range
 * @param {Date|String|Number} endDate - the end of range
 * @returns {Boolean} the date is within the range
 * @throws {Error} startDate cannot be after endDate
 *
 * @example
 * // For the date within the range:
 * isWithinRange(
 *   new Date(2014, 0, 3), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> true
 *
 * @example
 * // For the date outside of the range:
 * isWithinRange(
 *   new Date(2014, 0, 10), new Date(2014, 0, 1), new Date(2014, 0, 7)
 * )
 * //=> false
 */
function isWithinRange (dirtyDate, dirtyStartDate, dirtyEndDate) {
  var time = parse(dirtyDate).getTime()
  var startTime = parse(dirtyStartDate).getTime()
  var endTime = parse(dirtyEndDate).getTime()

  if (startTime > endTime) {
    throw new Error('The start of the range cannot be after the end of the range')
  }

  return time >= startTime && time <= endTime
}

module.exports = isWithinRange


/***/ }),

/***/ "./node_modules/date-fns/sub_weeks/index.js":
/*!**************************************************!*\
  !*** ./node_modules/date-fns/sub_weeks/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var addWeeks = __webpack_require__(/*! ../add_weeks/index.js */ "./node_modules/date-fns/add_weeks/index.js")

/**
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be subtracted
 * @returns {Date} the new date with the weeks subtracted
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * var result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks (dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount)
  return addWeeks(dirtyDate, -amount)
}

module.exports = subWeeks


/***/ }),

/***/ "./src/Budgeteer/AccountsContainer/AccountsContainer.jsx":
/*!***************************************************************!*\
  !*** ./src/Budgeteer/AccountsContainer/AccountsContainer.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
/* harmony import */ var _WeekSpendingChart_WeekSpendingChart_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WeekSpendingChart/WeekSpendingChart.jsx */ "./src/Budgeteer/AccountsContainer/WeekSpendingChart/WeekSpendingChart.jsx");
/* harmony import */ var _TransactionContainer_TransactionContainer_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TransactionContainer/TransactionContainer.jsx */ "./src/Budgeteer/AccountsContainer/TransactionContainer/TransactionContainer.jsx");
/* harmony import */ var _accountsContainer_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./accountsContainer.scss */ "./src/Budgeteer/AccountsContainer/accountsContainer.scss");
/* harmony import */ var _accountsContainer_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_accountsContainer_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers */ "./src/Budgeteer/helpers.js");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

/* eslint no-undefined: 0 */

/* eslint no-multi-spaces: 0 */







 // Font Awesome base package

 // Selective icons from Font Awesome




var AccountsContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(AccountsContainer, _Component);

  function AccountsContainer(props) {
    var _this;

    _classCallCheck(this, AccountsContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccountsContainer).call(this, props));
    _this.state = {
      // this state variable is used to keep track of transactions the
      // user wants to see
      categoryTransactions: [],
      // Stores how the user is currently sorting their transactions
      categoryType: "",
      categoryTotal: 0.00,

      /*displayNames: {},*/
      keyWord: "",
      months: ["Jan.", "Feb.", "Mar.", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
    };
    _this.getAccountTransactions = _this.getAccountTransactions.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getCategoryTransactions = _this.getCategoryTransactions.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getDate = _this.getDate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.searchByDate = _this.searchByDate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.searchByKeyword = _this.searchByKeyword.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getKeyword = _this.getKeyword.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getAccountDisplayName = _this.getAccountDisplayName.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(AccountsContainer, [{
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
                this.getAccountTransactions("all");
                _context.prev = 1;
                _context.next = 4;
                return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/user-info/display-names");

              case 4:
                displayNames = _context.sent;
                displayNames = displayNames.data;
                map = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["jsonToMap"])(displayNames);
                this.setState({
                  displayNames: map
                });
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);
                console.log("ERROR");
                console.log(_context.t0);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 10]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      // On first load show all transactions by default for the user
      this.getAccountTransactions("all");
    }
  }, {
    key: "getAccountTransactions",
    value: function getAccountTransactions(account_id) {
      var releventTransactions = [];
      var type;
      var total = 0;

      if (account_id === "all") {
        releventTransactions = this.props.transactions;
        type = "All Categories";
      } else {
        releventTransactions = this.props.transactions.filter(function (t) {
          return t.account_id === account_id;
        });
      }

      releventTransactions.forEach(function (transaction) {
        total += transaction.amount;
      });
      total = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["formatAmount"])(total); // Update the state with the relevent transactions and how the user is sorting them
      // Get the account name based on what the ID is ex: Checking Account, Savings Account, Credit Card etc.

      if (type === undefined) {
        this.props.accounts.forEach(function (account) {
          if (account.account_id === account_id) {
            type = account.name;
            return;
          }
        });
      }

      releventTransactions.sort(function (a, b) {
        var dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
        var dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
        return dateOne - dateTwo;
      });
      var now = new Date();
      var nowString = this.state.months[now.getMonth()] + "  " + now.getDate() + ".  " + now.getFullYear();
      var prevString = this.state.months[now.getMonth()] + "  " + now.getDate() + ".  " + (now.getFullYear() - 1);
      var categoryType = type === "All Categories" ? prevString + " - " + nowString : this.getAccountDisplayName(account_id, type);
      this.setState({
        categoryTransactions: releventTransactions,
        categoryType: categoryType,
        categoryTotal: total
      });
    }
  }, {
    key: "getCategoryTransactions",
    value: function getCategoryTransactions(categoryString) {
      var releventTransactions = []; // Other displays transactions with a category of null

      if (categoryString === "Other") {
        releventTransactions = this.props.transactions.filter(function (t) {
          t.category === null || t.category[0] === "Bank Fees" || t.category[0] === "Cash Advance" || t.category[0] === "Tax";
        });
      } else {
        releventTransactions = this.props.transactions.filter(function (t) {
          return t.category !== null && t.category[0] === categoryString;
        });
      } // Get the total spent for the current Category


      var total = 0;
      releventTransactions.forEach(function (transaction) {
        total += transaction.amount;
      });
      total = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["formatAmount"])(total); // this.openCategoryViewer();
      // Sort the transactions newest to oldest

      releventTransactions.sort(function (a, b) {
        var dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
        var dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
        return dateOne - dateTwo;
      }); // Update the state with the relevent transactions and how the user is sorting them

      this.setState({
        categoryTransactions: releventTransactions,
        categoryType: categoryString,
        categoryTotal: total
      });
    }
  }, {
    key: "getDate",
    value: function getDate(e, val) {
      this.setState(_defineProperty({}, val, e.target.value));
    }
  }, {
    key: "getAccountDisplayName",
    value: function getAccountDisplayName(accountID, defaultName) {
      var x = this.state.displayNames;
      if (x === undefined) return defaultName;
      return x.get(accountID) || defaultName;
    }
  }, {
    key: "searchByDate",
    value: function () {
      var _searchByDate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(e) {
        var dateOne, dateTwo, releventTransactions, total, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // TODO: Need additional validation if using forms to get data
                // Ensure month is between 1 and 12
                // Ensure the day given is between 1 - 30, 1 -31, 1 - 28 or 1 - 29 based on the month and year
                // Don't allow a range greater than 5 years or some other arbitrary amount
                e.preventDefault();
                dateOne = new Date(this.state.yearOne, this.state.monthOne - 1, this.state.dayOne);
                dateTwo = new Date(this.state.yearTwo, this.state.monthTwo - 1, this.state.dayTwo);
                releventTransactions = [];
                total = 0;
                _context2.prev = 5;
                _context2.next = 8;
                return axios__WEBPACK_IMPORTED_MODULE_0___default()({
                  method: "GET",
                  url: "/plaid-api/transactions",
                  data: {
                    startDate: dateOne,
                    endDate: dateTwo
                  }
                });

              case 8:
                data = _context2.sent;
                data.forEach(function (acct) {
                  acct.transactions.forEach(function (transaction) {
                    releventTransactions.push(transaction);
                    total += transaction.amount;
                  });
                });
                total = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["formatAmount"])(total); // Sort the transactions newest to oldest

                releventTransactions.sort(function (a, b) {
                  var dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
                  var dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
                  return dateOne - dateTwo;
                });
                this.setState({
                  categoryTransactions: releventTransactions,
                  categoryType: "".concat(this.state.months[dateOne.getMonth()], " ").concat(dateOne.getDate(), " - ").concat(this.state.months[dateTwo.getMonth()], " ").concat(dateTwo.getDate()),
                  categoryTotal: total
                });
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](5);
                console.error(_context2.t0);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 15]]);
      }));

      function searchByDate(_x) {
        return _searchByDate.apply(this, arguments);
      }

      return searchByDate;
    }()
  }, {
    key: "searchByKeyword",
    value: function () {
      var _searchByKeyword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(e) {
        var releventTransactions, keyWord, normalizedKeyWord, total;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                e.preventDefault();
                releventTransactions = [];
                keyWord = this.state.keyWord || "all";
                normalizedKeyWord = keyWord.toLowerCase();
                total = 0; // If the user doesn't enter anything, show them the default stuff

                if (!(normalizedKeyWord === "all")) {
                  _context3.next = 10;
                  break;
                }

                this.getAccountTransactions("all");
                return _context3.abrupt("return");

              case 10:
                this.props.transactions.forEach(function (t) {
                  var normalizedTransactionName = t.name.toLowerCase();

                  if (normalizedTransactionName.includes(normalizedKeyWord)) {
                    total += t.amount;
                    releventTransactions.push(t);
                  }
                });

              case 11:
                total = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["formatAmount"])(total); // Sort the transactions newest to oldest

                releventTransactions.sort(function (a, b) {
                  var dateOne = new Date(a.date.slice(0, 4), a.date.slice(5, 7) - 1, a.date.slice(8, 10));
                  var dateTwo = new Date(b.date.slice(0, 4), b.date.slice(5, 7) - 1, b.date.slice(8, 10));
                  return dateOne - dateTwo;
                });
                this.setState({
                  categoryType: Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["toTitleCase"])(keyWord),
                  categoryTransactions: releventTransactions,
                  categoryTotal: total
                });

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function searchByKeyword(_x2) {
        return _searchByKeyword.apply(this, arguments);
      }

      return searchByKeyword;
    }()
  }, {
    key: "getKeyword",
    value: function getKeyword(e) {
      e.preventDefault();
      var keyWord = e.target.value.trim(); // helpers.toTitleCase(e.target.value);

      this.setState({
        keyWord: keyWord
      });
    }
  }, {
    key: "openCategoryViewer",
    value: function openCategoryViewer() {
      var otherViewer = document.querySelector(".accounts--search-options--icon-search--accts-search--accts");
      otherViewer.classList.remove("accounts--search-options--icon-search--accts-search--accts__active");
      var elem = document.querySelector(".accounts--search-options--icon-search--categorical-search--categories");
      elem.classList.add("accounts--search-options--icon-search--categorical-search--categories__active");
    }
  }, {
    key: "closeCategoryViewer",
    value: function closeCategoryViewer() {
      var elem = document.querySelector(".accounts--search-options--icon-search--categorical-search--categories");
      elem.classList.remove("accounts--search-options--icon-search--categorical-search--categories__active");
    }
  }, {
    key: "openAccountsViewer",
    value: function openAccountsViewer() {
      var otherViewer = document.querySelector(".accounts--search-options--icon-search--categorical-search--categories");
      otherViewer.classList.remove("accounts--search-options--icon-search--categorical-search--categories__active");
      var elem = document.querySelector(".accounts--search-options--icon-search--accts-search--accts");
      elem.classList.add("accounts--search-options--icon-search--accts-search--accts__active");
    }
  }, {
    key: "closeAccountsViewer",
    value: function closeAccountsViewer() {
      var elem = document.querySelector(".accounts--search-options--icon-search--accts-search--accts");
      elem.classList.remove("accounts--search-options--icon-search--accts-search--accts__active");
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var amtColor = this.state.categoryTotal * -1 > 0 ? 'green' : 'red';
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts--search-options"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts--search-options--keyword-search"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("form", {
        onSubmit: this.searchByKeyword
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", {
        type: "text",
        placeholder: "Search by transaction name",
        value: this.state.keyWord,
        onChange: function onChange(e) {
          _this2.getKeyword(e);
        }
      }))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts--search-options--icon-search"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts--search-options--icon-search--categorical-search"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "icon",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faTags"],
        onMouseEnter: this.openCategoryViewer
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts--search-options--icon-search--categorical-search--categories",
        onMouseLeave: this.closeCategoryViewer
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Food and Drink");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faUtensils"]
      }), "     ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Food and Drink"), " "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Travel");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faPlane"]
      }), "        ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Travel"), "         "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Shops");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faShoppingBag"]
      }), "  ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Shops"), "          "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Recreation");

          _this2.closeAccountsViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faTape"]
      }), "     ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Recreation"), "     "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Service");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faWrench"]
      }), "       ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Service"), "        "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Community");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faUsers"]
      }), "        ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Community"), "      "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Healthcare");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faMedkit"]
      }), "       ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Healthcare"), "     "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Bank Fees");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faQuestion"]
      }), "     ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Bank Fees"), "      "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Cash Advance");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faQuestion"]
      }), "    ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Cash Advance"), "   "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Interest");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faPercent"]
      }), "     ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Interest"), "       "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Payment");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faMoneyBillAlt"]
      }), " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Payment"), "        "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Tax");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faQuestion"]
      }), "    ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Tax"), "            "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Transfer");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faExchangeAlt"]
      }), "  ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Transfer"), "       "), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("section", null, " ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "category-icon",
        onClick: function onClick() {
          _this2.getCategoryTransactions("Other");

          _this2.closeCategoryViewer();
        },
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faQuestion"]
      }), "     ", react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, "Other"), "          ")))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts--search-options--icon-search--date-search"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "icon",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faCalendar"]
      })), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts--search-options--icon-search--accts-search"
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_8__["FontAwesomeIcon"], {
        className: "icon",
        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faUniversity"],
        onMouseEnter: this.openAccountsViewer
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: "accounts--search-options--icon-search--accts-search--accts",
        onMouseLeave: this.closeAccountsViewer
      }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
        onClick: function onClick() {
          _this2.getAccountTransactions("all");

          _this2.closeAccountsViewer();
        }
      }, "All Transactions"), this.props.accounts.map(function (a, index) {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", {
          key: index,
          onClick: function onClick() {
            _this2.getAccountTransactions(a.account_id);

            _this2.closeAccountsViewer();
          }
        }, _this2.getAccountDisplayName(a.account_id, a.name));
      })))))), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_WeekSpendingChart_WeekSpendingChart_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
        transactions: this.state.categoryTransactions
      }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_TransactionContainer_TransactionContainer_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
        x: "hello",
        categoryType: this.state.categoryType,
        categoryTotal: this.state.categoryTotal,
        transactions: this.state.categoryTransactions,
        accounts: this.props.accounts
      }));
    }
  }]);

  return AccountsContainer;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (AccountsContainer);

/***/ }),

/***/ "./src/Budgeteer/AccountsContainer/WeekSpendingChart/WeekSpendingChart.jsx":
/*!*********************************************************************************!*\
  !*** ./src/Budgeteer/AccountsContainer/WeekSpendingChart/WeekSpendingChart.jsx ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
/* harmony import */ var date_fns_sub_weeks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns/sub_weeks */ "./node_modules/date-fns/sub_weeks/index.js");
/* harmony import */ var date_fns_sub_weeks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(date_fns_sub_weeks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var date_fns_is_after__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns/is_after */ "./node_modules/date-fns/is_after/index.js");
/* harmony import */ var date_fns_is_after__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(date_fns_is_after__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var date_fns_is_within_range__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns/is_within_range */ "./node_modules/date-fns/is_within_range/index.js");
/* harmony import */ var date_fns_is_within_range__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(date_fns_is_within_range__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var date_fns_difference_in_days__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns/difference_in_days */ "./node_modules/date-fns/difference_in_days/index.js");
/* harmony import */ var date_fns_difference_in_days__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(date_fns_difference_in_days__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../helpers */ "./src/Budgeteer/helpers.js");
/* harmony import */ var _weekSpendingChart_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./weekSpendingChart.scss */ "./src/Budgeteer/AccountsContainer/WeekSpendingChart/weekSpendingChart.scss");
/* harmony import */ var _weekSpendingChart_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_weekSpendingChart_scss__WEBPACK_IMPORTED_MODULE_8__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var CustomTooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomTooltip, _Component);

  function CustomTooltip() {
    _classCallCheck(this, CustomTooltip);

    return _possibleConstructorReturn(this, _getPrototypeOf(CustomTooltip).apply(this, arguments));
  }

  _createClass(CustomTooltip, [{
    key: "render",
    value: function render() {
      var active = this.props.active;

      if (active) {
        var _this$props = this.props,
            payload = _this$props.payload,
            label = _this$props.label;

        if (payload !== null) {
          var normalizedLabel = typeof label === "string" ? label : label + " day(s) ago";
          var amount = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["numberWithCommas"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["formatAmount"])(payload[0].value));
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
            className: "week-spending-chart--custom-tooltip"
          }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, normalizedLabel), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "$", amount));
        }

        return null;
      }

      return null;
    }
  }]);

  return CustomTooltip;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

;

var WeekSpendingChart =
/*#__PURE__*/
function (_Component2) {
  _inherits(WeekSpendingChart, _Component2);

  function WeekSpendingChart(props) {
    var _this;

    _classCallCheck(this, WeekSpendingChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WeekSpendingChart).call(this, props));
    _this.state = {
      weekData: [],
      totalSpent: '...'
    };
    return _this;
  }

  _createClass(WeekSpendingChart, [{
    key: "render",
    value: function render() {
      var totalSpent = Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["isNumber"])(this.state.totalSpent) ? this.state.totalSpent.toFixed(2) : 'Loading...';
      var amtColor = totalSpent <= 0 && Object(_helpers__WEBPACK_IMPORTED_MODULE_7__["isNumber"])(totalSpent) ? 'red' : 'green';
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
        className: "total-spent"
      }, "This Week's Bottom Line: ", react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
        className: amtColor
      }, "$", totalSpent)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["ResponsiveContainer"], {
        className: "week-spending-chart",
        width: "90%",
        height: 200
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["ComposedChart"], {
        data: this.state.weekData
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["CartesianGrid"], {
        vertical: false,
        horizontal: true
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["XAxis"], {
        dataKey: "name",
        tick: {
          stroke: 'white'
        }
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["YAxis"], {
        tick: {
          stroke: 'white'
        }
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], {
        content: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CustomTooltip, null)
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["Bar"], {
        barSize: 8,
        dataKey: "value",
        stackId: "a",
        fill: "rgb(78,  153, 114)"
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.transactions.length > 0) {
        // this is off, need to get all the transactions in the past 7 days
        // sum up the total spent for each day
        var endDate = new Date();
        var startDate = date_fns_sub_weeks__WEBPACK_IMPORTED_MODULE_3___default()(endDate, 1);
        var startingIndex = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = nextProps.transactions.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                index = _step$value[0],
                t = _step$value[1];

            var transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10)); // Get the index of the first transaction to fall inside the range

            if (date_fns_is_within_range__WEBPACK_IMPORTED_MODULE_5___default()(transactionDate, startDate, endDate)) {
              startingIndex = index;
              break;
            } // If we get through the whole array and haven't yet returned it means there
            // are no transactions which fall within our range


            if (index === nextProps.transactions.length - 1) {
              startingIndex = 0;
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

        var amts = new Array(7).fill(0);

        if (startingIndex !== 0) {
          var pastWeekTransactions = nextProps.transactions.slice(startingIndex);
          pastWeekTransactions.forEach(function (t) {
            var transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));
            var index = date_fns_difference_in_days__WEBPACK_IMPORTED_MODULE_6___default()(endDate, transactionDate);
            amts[index] += t.amount;
          });
          amts.reverse();
        }

        var week = ["Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat.", "Sun."];
        var data = [];
        var today = new Date().getDay();
        var pastWeekTotal = 0;

        for (var i = 0; i < 7; i++) {
          data.push({
            name: i === 6 ? "Today" : week[(today + i) % 7],
            value: amts[i] * -1 // Multiple by -1 since spending is viewed as positive and income as negative

          });
          pastWeekTotal += amts[i];
        }

        return {
          weekData: data,
          totalSpent: pastWeekTotal * -1
        };
      }

      return null;
    }
  }]);

  return WeekSpendingChart;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (WeekSpendingChart);

/***/ }),

/***/ "./src/Budgeteer/AccountsContainer/WeekSpendingChart/weekSpendingChart.scss":
/*!**********************************************************************************!*\
  !*** ./src/Budgeteer/AccountsContainer/WeekSpendingChart/weekSpendingChart.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src!../../../../node_modules/sass-loader/lib/loader.js!./weekSpendingChart.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/WeekSpendingChart/weekSpendingChart.scss");

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

/***/ "./src/Budgeteer/AccountsContainer/accountsContainer.scss":
/*!****************************************************************!*\
  !*** ./src/Budgeteer/AccountsContainer/accountsContainer.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/src!../../../node_modules/sass-loader/lib/loader.js!./accountsContainer.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/AccountsContainer/accountsContainer.scss");

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
//# sourceMappingURL=6.js.map