import { TReview } from '../../types/review';
import { formatDate, formatDateForView } from '../../utils';

type ReviewProps = {
  review:TReview;
}

function Review({review}: ReviewProps): JSX.Element {
  const date = formatDate(review.date);
  return (
    <li className="reviews__item" data-testid='ReviewContainer'>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review.rating * 20}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={date}>{formatDateForView(review.date)}</time>
      </div>
    </li>
  );
}
export default Review;
