export const calculateAverageRating = (reviews: any[]) => {
  // Extract the ratings for each review
  const totalReviews = reviews.length;
  console.log("INI ADALAH REVIEWS ", reviews);

  if (totalReviews === 0) return 0; // If no reviews, return 0

  const sum = reviews.reduce((acc, review) => {
    return (
      acc +
      review.career_path_rating +
      review.cultural_rating +
      review.facility_rating +
      review.work_balance_rating
    );
  }, 0);

  // Return the average rating
  return (sum / (totalReviews * 4)).toFixed(2); // 4 ratings per review
};

export const formatSalary = (salary: number) => {
  return `${(salary / 1000000).toFixed(1)} jt`; // Format to 1 decimal place
};
