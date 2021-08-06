"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 4000;
var app = (0, _express["default"])();

var cors = require("cors");

app.use(cors());
app.use(_express["default"].json());
app.use(require("./endpoints"));
app.listen(PORT, function () {
  console.log("Server listening at http://localhost:".concat(PORT, " \uD83D\uDE80"));
});
//# sourceMappingURL=index.js.map