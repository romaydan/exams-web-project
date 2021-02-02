export function calculateAverageGrade(exams) {
  const grades = [];

  exams.forEach((e) => grades.push(e.grade));

  if (grades.length === 0) return 0;

  return Math.round(grades.reduce((a, c) => a + c) / grades.length);
}

export function calculateMedianGrade(exams) {
  const grades = [];

  exams.forEach((e) => grades.push(e.grade));

  if (grades.length === 0) return 0;

  grades.sort((a, b) => a - b);

  const half = Math.floor(grades.length / 2);

  if (grades.length % 2 !== 0) return grades[half];

  return (grades[half - 1] + grades[half]) / 2.0;
}
