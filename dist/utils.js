"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupBy = exports.getMin = void 0;
const moment_1 = __importDefault(require("moment"));
function getMin(bossTimer) {
    var now = (0, moment_1.default)(new Date());
    var end = (0, moment_1.default)(bossTimer?.timed);
    var duration = moment_1.default.duration(now.diff(end));
    var minutes = bossTimer.respawn - duration.asMinutes();
    return Math.round(minutes);
}
exports.getMin = getMin;
function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
exports.groupBy = groupBy;
//# sourceMappingURL=utils.js.map