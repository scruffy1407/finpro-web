import { useState } from "react";

interface RatingProps {
  selectedRating: number;
  onRatingChange: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ selectedRating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleRatingClick = (index: number) => {
    onRatingChange(index + 1);
  };

  return (
    <div className="flex items-center gap-4">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`cursor-pointer`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleRatingClick(index)}
        >
          <path
            d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
            fill={
              index < selectedRating || index < hoveredRating
                ? "#eab308" // Or your desired color
                : "#e4e4e7" // Or your desired default color
            }
          />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
