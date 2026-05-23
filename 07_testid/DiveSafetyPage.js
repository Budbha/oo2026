"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiveSafetyChecker = void 0;
var DiveSafetyChecker = /** @class */ (function () {
    function DiveSafetyChecker() {
    }
    DiveSafetyChecker.prototype.check = function (depth, air) {
        if (depth > 40 || air < 100) {
            return "danger";
        }
        if (depth > 18 || air < 200) {
            return "warning";
        }
        return "safe";
    };
    return DiveSafetyChecker;
}());
exports.DiveSafetyChecker = DiveSafetyChecker;
