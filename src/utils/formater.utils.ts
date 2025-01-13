export function formatNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
