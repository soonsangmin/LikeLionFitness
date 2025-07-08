import { Course, CourseEntity } from "./courses";

export class CourseManager {
  private courses: Course[] = [];
  private nextId: number = 1;

  addCourse(
    name: string = "Khoá học chưa đặt tên",
    lecturer: string = "Giảng viên ẩn danh",
    duration: number = 10
  ): Course {
    const course = new CourseEntity(this.nextId++, name, lecturer, duration);
    this.courses.push(course);
    return course;
  }

  //Tính năng 2
  getCourses(): Course[] {

    return [...this.courses].sort((a, b) => a.id - b.id);
  }

  //Tính năng 3
  updateCourse(id: number, data: Partial<Course>): boolean {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) return false;

    this.courses[index] = { ...this.courses[index], ...data };
    return true;
  }

  //Tính năng 4
  removeCourse(id: number): boolean {
    const oldLength = this.courses.length;
    this.courses = this.courses.filter((c) => c.id !== id); 
    return this.courses.length < oldLength;
  }
}

export default CourseManager;