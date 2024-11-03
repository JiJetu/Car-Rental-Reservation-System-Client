import { StarFilled, StarOutlined } from "@ant-design/icons";

const Rating = ({ rating, color }: { rating: number; color: string }) => {
  const validatedRating = Math.min(Math.max(rating ? rating : 5, 1), 5);

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-${color}-500 text-xl`}>
          {star <= validatedRating ? <StarFilled /> : <StarOutlined />}
        </span>
      ))}
    </div>
  );
};

export default Rating;
