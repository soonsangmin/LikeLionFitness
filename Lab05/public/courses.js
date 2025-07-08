"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseEntity = void 0;
var CourseEntity = /** @class */ (function () {
    function CourseEntity(id, name, lecturer, duration) {
        if (name === void 0) { name = "Unknown"; }
        if (lecturer === void 0) { lecturer = "Unknown"; }
        if (duration === void 0) { duration = -1; }
        this.id = id;
        this.name = name;
        this.lecturer = lecturer;
        this.duration = duration;
    }
    return CourseEntity;
}());
exports.CourseEntity = CourseEntity;
