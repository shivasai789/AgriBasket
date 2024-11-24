import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({rating,handleRatingChange}) {
  return [1, 2, 3, 4, 5].map((star) => (
    // eslint-disable-next-line react/jsx-key
    <Button
      className={`p-0 rounded-full transition-colors ${star <= rating ? 'text-yellow-500 hover:bg-black' : 'text-black hover:bg-primary hover:text-primary-foreground'}`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon className={`w-8 h-8 ${star <= rating ? 'fill-yellow-500': 'fill-black'}`} />
    </Button>
  ));
}

export default StarRatingComponent;
