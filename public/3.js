(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Statistics/BudgetChart/budgetChart.scss":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Statistics/BudgetChart/budgetChart.scss ***!
  \********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".budget--tooltip--spent:before, .budget--tooltip--remaining:before {\n  content: \"\";\n  margin-right: 5px;\n  width: 12px;\n  height: 12px;\n  background-color: #46926b;\n  border: 1px solid white;\n  border-radius: 1px;\n  display: inline-block;\n  vertical-align: middle; }\n\n.budget {\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center; }\n  .budget--doughnut-chart {\n    /*width: 100vw;*/ }\n    @media all and (min-width: 930px) {\n      .budget--doughnut-chart {\n        width: 33% !important; } }\n  .budget--form {\n    /*@media all and (max-width: 930px) {\n\t\t\tmargin: 10px 0;\n\t\t}*/ }\n    .budget--form label {\n      font-size: 20px;\n      font-weight: bold;\n      display: flex;\n      flex-direction: column;\n      align-items: center; }\n      .budget--form label input {\n        max-width: 90%;\n        width: 250px;\n        padding: 10px;\n        border: 1px solid black;\n        border-radius: 5px;\n        font-size: 15px;\n        color: black;\n        box-sizing: border-box; }\n        @media all and (max-width: 930px) {\n          .budget--form label input {\n            margin-left: 0; } }\n  .budget--tooltip {\n    padding: 15px;\n    background-color: black;\n    border-radius: 5px; }\n    .budget--tooltip--spent:before {\n      background-color: #f98183; }\n    .budget--tooltip--remaining:before {\n      background-color: #46926b; }\n\n.recharts-wrapper {\n  overflow-y: hidden; }\n", ""]);



/***/ }),

/***/ "./src/Budgeteer/Statistics/BudgetChart/BudgetChart.jsx":
/*!**************************************************************!*\
  !*** ./src/Budgeteer/Statistics/BudgetChart/BudgetChart.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helpers.js */ "./src/Budgeteer/helpers.js");
/* harmony import */ var date_fns_is_same_month__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! date-fns/is_same_month */ "./node_modules/date-fns/is_same_month/index.js");
/* harmony import */ var date_fns_is_same_month__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(date_fns_is_same_month__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var date_fns_is_same_year__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! date-fns/is_same_year */ "./node_modules/date-fns/is_same_year/index.js");
/* harmony import */ var date_fns_is_same_year__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(date_fns_is_same_year__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _budgetChart_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./budgetChart.scss */ "./src/Budgeteer/Statistics/BudgetChart/budgetChart.scss");
/* harmony import */ var _budgetChart_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_budgetChart_scss__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var COLORS = ["#D46363", "#007255"];

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
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "budget--tooltip"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "budget--tooltip--spent"
        }, "Spent: $", this.props.spent), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          className: "budget--tooltip--remaining"
        }, "Remaining: $", this.props.remaining));
      }

      return null;
    }
  }]);

  return CustomTooltip;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

;

var BudgetChart =
/*#__PURE__*/
function (_Component2) {
  _inherits(BudgetChart, _Component2);

  function BudgetChart(props) {
    var _this;

    _classCallCheck(this, BudgetChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BudgetChart).call(this, props));
    _this.state = {
      monthlyBudget: "",
      spentThisMonth: 0,
      rechartsData: [{
        name: 'Spent',
        value: 0
      }, {
        name: 'Remaining',
        value: 1
      }]
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BudgetChart, [{
    key: "handleChange",
    value: function handleChange(event) {
      var newMonthlyBudget = event.target.value.trim(); // Save data to the current local store

      localStorage.setItem("monthlyBudget", newMonthlyBudget); // Update the percentage calculator

      var spent = this.state.spentThisMonth;
      var remaining = newMonthlyBudget - this.state.spentThisMonth <= 0 ? 0 : newMonthlyBudget - this.state.spentThisMonth; // Update the chart

      var amts = [{
        name: 'Spent',
        value: spent
      }, {
        name: 'Remaining',
        value: remaining
      }];
      this.setState({
        rechartsData: amts,
        monthlyBudget: newMonthlyBudget
      });
      axios__WEBPACK_IMPORTED_MODULE_2___default()({
        method: 'POST',
        url: '/user-info/monthly-budget',
        data: {
          monthlyBudget: newMonthlyBudget
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var spent = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_3__["formatAmount"])(this.state.spentThisMonth);
      spent = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_3__["numberWithCommas"])(spent);
      var remaining = this.state.monthlyBudget - this.state.spentThisMonth;
      remaining = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_3__["formatAmount"])(remaining);
      remaining = Object(_helpers_js__WEBPACK_IMPORTED_MODULE_3__["numberWithCommas"])(remaining);
      var input = this.props.displayInput === false ? "" : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: "budget--form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        placeholder: "Enter your budget",
        type: "number",
        name: "budget",
        value: this.state.monthlyBudget,
        onChange: this.handleChange
      })));
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "budget"
      }, input, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_1__["ResponsiveContainer"], {
        className: "budget--doughnut-chart",
        width: "100%",
        "min-height": 400,
        height: 400
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_1__["PieChart"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_1__["Pie"], {
        data: this.state.rechartsData,
        innerRadius: "50%",
        outerRadius: "90%",
        fill: "#8884d8",
        paddingAngle: 0
      }, this.state.rechartsData.map(function (entry, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
          key: index,
          fill: COLORS[index % COLORS.length]
        });
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], {
        content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CustomTooltip, {
          remaining: remaining,
          spent: spent
        })
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      console.log("nextProps are: ");
      console.log(nextProps);

      if (nextProps.transactions.length > 0) {
        var totalSpent = 0;
        var today = new Date(); // Calculate total spent this month

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = nextProps.transactions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var t = _step.value;
            var transactionDate = new Date(t.date.slice(0, 4), t.date.slice(5, 7) - 1, t.date.slice(8, 10));

            if (date_fns_is_same_month__WEBPACK_IMPORTED_MODULE_4___default()(transactionDate, today) && date_fns_is_same_year__WEBPACK_IMPORTED_MODULE_5___default()(transactionDate, today)) {
              totalSpent += t.amount * -1; // Spending is a negative value
            }
          } // Retrieve monthly budget from session storage

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

        var monthlyBudgetFromSessionStorage = localStorage.getItem("monthlyBudget"); // Get monthly budget from session storage
        // Calculate remaining amount left to spend

        /*let remaining = (monthlyBudgetFromSessionStorage - totalSpent) <= 0 ? 0 : (monthlyBudgetFromSessionStorage - totalSpent);*/

        var remaining = monthlyBudgetFromSessionStorage - totalSpent; // Create chart data set

        var chartData = [{
          name: 'Spent',
          value: totalSpent
        }, {
          name: 'Remaining',
          value: remaining
        }]; // Set the state

        return {
          spentThisMonth: totalSpent,
          rechartsData: chartData,
          monthlyBudget: monthlyBudgetFromSessionStorage
        };
      } else {
        console.error("Error from Budget Chart: transactions.length is <= 0");
        return null;
      }
    }
  }]);

  return BudgetChart;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (BudgetChart);

/***/ }),

/***/ "./src/Budgeteer/Statistics/BudgetChart/budgetChart.scss":
/*!***************************************************************!*\
  !*** ./src/Budgeteer/Statistics/BudgetChart/budgetChart.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/postcss-loader/src!../../../../node_modules/sass-loader/lib/loader.js!./budgetChart.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js!./node_modules/sass-loader/lib/loader.js!./src/Budgeteer/Statistics/BudgetChart/budgetChart.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

}]);
//# sourceMappingURL=3.js.map