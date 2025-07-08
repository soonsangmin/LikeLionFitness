export interface Course {
  id: number;
  name: string;
  lecturer: string;
  duration: number;
}

export class CourseEntity implements Course {
  id: number;
  name: string;
  lecturer: string;
  duration: number;

  constructor(
    id: number,
    name: string = "Unknown",
    lecturer: string = "Unknown",
    duration: number = -1
  ) {
    this.id = id;
    this.name = name;
    this.lecturer = lecturer;
    this.duration = duration;
  }
}

export default Course
