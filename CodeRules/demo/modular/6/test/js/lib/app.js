"use strict";

var _module = require("./module1");

var _module2 = require("./module2");

var _module3 = _interopRequireDefault(require("./module3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _module.foo)();
(0, _module.bar)();
(0, _module2.fun1)();
(0, _module2.fun2)();
(0, _module3["default"])();