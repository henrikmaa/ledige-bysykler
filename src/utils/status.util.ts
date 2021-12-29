export const statusColor = (available: number, total: number) => {
  const percentage = (available / total) * 100;
  if (percentage >= 50) {
    return { r: 51, g: 217, b: 178 };
  } else if (percentage >= 1) {
    return { r: 255, g: 177, b: 66 };
  } else {
    return { r: 255, g: 82, b: 82 };
  }
};
