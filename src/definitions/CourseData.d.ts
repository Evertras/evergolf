interface Tees {
  name: string;
  color?: string;
}

interface CourseData {
  name: string;
  tees: Tees[];
  holes: HoleData[];
}
