"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChecker = void 0;
var PasswordChecker = /** @class */ (function () {
    function PasswordChecker() {
    }
    PasswordChecker.prototype.check = function (password) {
        if (password.length < 6) {
            return "weak";
        }
        var hasUpper = /[A-Z]/.test(password);
        var hasLower = /[a-z]/.test(password);
        var hasDigit = /[0-9]/.test(password);
        if (password.length >= 8 && hasUpper && hasLower && hasDigit) {
            return "strong";
        }
        return "medium";
    };
    return PasswordChecker;
}());
exports.PasswordChecker = PasswordChecker;
