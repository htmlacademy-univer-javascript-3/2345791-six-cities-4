import { TReview } from '../types/review';
import CommentForm from './comment-form';
import Review from './review';

type ReviewListProps = {
  reviews: TReview[];
};

function ReviewList ({reviews}: ReviewListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </ul>
      <CommentForm/>
    </section>
  );
}

export default ReviewList;
