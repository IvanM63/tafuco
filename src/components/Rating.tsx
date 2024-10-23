import IconStar from "/public/icons/star-fill.svg";
import IconStarHalf from "/public/icons/star-half-fill.svg";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        const isHalf = ratingValue - 0.5 === rating;

        return (
          <div key={index} className="relative w-6 h-6 ">
            {ratingValue <= rating ? (
              <IconStar className="w-6 h-6 text-yellow-500" />
            ) : isHalf ? (
              <IconStarHalf className="w-6 h-6 text-yellow-500" />
            ) : (
              <IconStar className="w-6 h-6 text-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
