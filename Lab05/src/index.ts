
import readlineSync from "readline-sync";
import { CourseManager } from "./management";

const manager = new CourseManager();

const showMenu = (): void => {
  console.log("\n=========== MENU ===========");
  console.log("1. Thêm khoá học");
  console.log("2. Hiển thị danh sách");
  console.log("3. Cập nhật khoá học");
  console.log("4. Xoá khoá học");
  console.log("0. Thoát");
  console.log("============================");
};

const addCourseFlow = () => {
  const readlineSync = require("readline-sync");
  const name = readlineSync.question("Tên khoá học: ");
  const lecturer = readlineSync.question("Giảng viên: ");
  const duration = Number(readlineSync.question("Thời lượng (giờ): "));
  const course = manager.addCourse(name, lecturer, duration);
  console.log(`Đã tạo: ${formatCourse(course)}`);
};

const listFlow = () => {
  const list = manager.getCourses();
  if (!list.length) return console.log("Chưa có khoá học nào!");
  list.forEach((c) => console.log(formatCourse(c)));
};

const updateFlow = () => {
  const readlineSync = require("readline-sync");
  const id = Number(readlineSync.questionInt("Nhập ID muốn sửa: "));

  const name = readlineSync.question("Tên mới (Enter bỏ qua): ");
  const lecturer = readlineSync.question("GV mới (Enter bỏ qua): ");
  const durationInput = readlineSync.question(
    "Thời lượng mới (Enter bỏ qua): "
  );
  const duration = durationInput ? Number(durationInput) : undefined;

  const ok = manager.updateCourse(id, {
    ...(name && { name }),
    ...(lecturer && { lecturer }),
    ...(duration !== undefined && { duration }),
  });

  console.log(ok ? "Cập nhật thành công!" : "Không tìm thấy khoá học!");
};

const deleteFlow = () => {
  const id = Number(readlineSync.questionInt("Nhập ID muốn xoá: "));
  console.log(manager.removeCourse(id) ? "Đã xoá!" : "Không có khoá học đó!");
};


const formatCourse = (c: {
  id: number;
  name: string;
  lecturer: string;
  duration: number;
}) =>
  `#${c.id} | ${c.name.padEnd(25)} | GV: ${c.lecturer.padEnd(15)} | ${
    c.duration
  }h`;


while (true) {
  showMenu();
  const readlineSync = require("readline-sync");
  const choice = readlineSync.question("Chọn chức năng: ");
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
