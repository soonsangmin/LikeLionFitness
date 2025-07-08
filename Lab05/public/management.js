"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseManager = void 0;
var courses_1 = require("./courses");
var CourseManager = /** @class */ (function () {
    function CourseManager() {
        this.courses = [];
        this.nextId = 1;
    }
    CourseManager.prototype.addCourse = function (name, lecturer, duration) {
        if (name === void 0) { name = "Khoá học chưa đặt tên"; }
        if (lecturer === void 0) { lecturer = "Giảng viên ẩn danh"; }
        if (duration === void 0) { duration = 10; }
        var course = new courses_1.CourseEntity(this.nextId++, name, lecturer, duration);
        this.courses.push(course);
        return course;
    };
    //Tính năng 2
    CourseManager.prototype.getCourses = function () {
        return __spreadArray([], this.courses, true).sort(function (a, b) { return a.id - b.id; });
    };
    //Tính năng 3
    CourseManager.prototype.updateCourse = function (id, data) {
        var index = this.courses.findIndex(function (c) { return c.id === id; });
        if (index === -1)
            return false;
        this.courses[index] = __assign(__assign({}, this.courses[index]), data);
        return true;
    };
    //Tính năng 4
    CourseManager.prototype.removeCourse = function (id) {
        var oldLength = this.courses.length;
        this.courses = this.courses.filter(function (c) { return c.id !== id; });
        return this.courses.length < oldLength;
    };
    return CourseManager;
}());
exports.CourseManager = CourseManager;
exports.default = CourseManager;
