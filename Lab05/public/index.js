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
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = require("readline-sync");
var management_1 = require("./management");
var manager = new management_1.CourseManager();
var showMenu = function () {
    console.log("\n=========== MENU ===========");
    console.log("1. Thêm khoá học");
    console.log("2. Hiển thị danh sách");
    console.log("3. Cập nhật khoá học");
    console.log("4. Xoá khoá học");
    console.log("0. Thoát");
    console.log("============================");
};
var addCourseFlow = function () {
    var readlineSync = require("readline-sync");
    var name = readlineSync.question("Tên khoá học: ");
    var lecturer = readlineSync.question("Giảng viên: ");
    var duration = Number(readlineSync.question("Thời lượng (giờ): "));
    var course = manager.addCourse(name, lecturer, duration);
    console.log("\u0110\u00E3 t\u1EA1o: ".concat(formatCourse(course)));
};
var listFlow = function () {
    var list = manager.getCourses();
    if (!list.length)
        return console.log("Chưa có khoá học nào!");
    list.forEach(function (c) { return console.log(formatCourse(c)); });
};
var updateFlow = function () {
    var readlineSync = require("readline-sync");
    var id = Number(readlineSync.questionInt("Nhập ID muốn sửa: "));
    var name = readlineSync.question("Tên mới (Enter bỏ qua): ");
    var lecturer = readlineSync.question("GV mới (Enter bỏ qua): ");
    var durationInput = readlineSync.question("Thời lượng mới (Enter bỏ qua): ");
    var duration = durationInput ? Number(durationInput) : undefined;
    var ok = manager.updateCourse(id, __assign(__assign(__assign({}, (name && { name: name })), (lecturer && { lecturer: lecturer })), (duration !== undefined && { duration: duration })));
    console.log(ok ? "Cập nhật thành công!" : "Không tìm thấy khoá học!");
};
var deleteFlow = function () {
    var id = Number(readline_sync_1.default.questionInt("Nhập ID muốn xoá: "));
    console.log(manager.removeCourse(id) ? "Đã xoá!" : "Không có khoá học đó!");
};
var formatCourse = function (c) {
    return "#".concat(c.id, " | ").concat(c.name.padEnd(25), " | GV: ").concat(c.lecturer.padEnd(15), " | ").concat(c.duration, "h");
};
while (true) {
    showMenu();
    var readlineSync_1 = require("readline-sync");
    var choice = readlineSync_1.question("Chọn chức năng: ");
    switch (choice) {
        case "1":
            addCourseFlow();
            break;
        case "2":
            listFlow();
            break;
        case "3":
            updateFlow();
            break;
        case "4":
            deleteFlow();
            break;
        case "0":
            console.log("Tạm biệt!");
            process.exit(0);
        default:
            console.log("Lựa chọn không hợp lệ!");
    }
}
