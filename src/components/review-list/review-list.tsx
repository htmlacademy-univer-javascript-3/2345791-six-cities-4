import { AuthorizationStatus, NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { TReview } from '../../types/review';
import {CommentForm} from '../comment-form/comment-form';
import Review from '../review/review';

type ReviewListProps = {
  reviews: TReview[];
};

function ReviewList ({reviews}: ReviewListProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[NameSpace.User].authorizationStatus);
  const length = reviews.length;
  const filteredReviews = reviews.slice(length - 9, length).reverse();
  return (
    <section className="offer__reviews reviews" data-testid='ReviewListContainer'>
      <h2 className="reviews__title">Reviews · <span className="reviews__amount">{length}</span></h2>
      <ul className="reviews__list">
        {filteredReviews.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </ul>
      {(authorizationStatus === AuthorizationStatus.Auth) ? <CommentForm/> : ''}
    </section>
  );
}

export default ReviewList;
