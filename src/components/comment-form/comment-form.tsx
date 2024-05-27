import React, { FormEvent } from 'react';
import { postComment } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import store from '../../store';
import { NameSpace } from '../../const';

function CommentFormComponent(): JSX.Element {
  const [review, setReview] = React.useState({
    reviewText: '',
    rating: '0'
  });
  const handleFieldChange = (evt: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setReview({...review, [name]: value});
  };
  const offerId = useAppSelector((state) => state[NameSpace.Data].loadedOffer!.id);
  return (
    <form className="reviews__form form" action="#" method="post" data-testid='commentFormContainer'>
      <label className="reviews__label form__label" htmlFor="reviewText">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" defaultValue={5} id="5-stars" type="radio" onChange={handleFieldChange}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" defaultValue={4} id="4-stars" type="radio" onChange={handleFieldChange}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" defaultValue={3} id="3-stars" type="radio" onChange={handleFieldChange}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" defaultValue={2} id="2-stars" type="radio" onChange={handleFieldChange}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input className="form__rating-input visually-hidden" name="rating" defaultValue={1} id="1-star" type="radio" onChange={handleFieldChange}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>

      <textarea className="reviews__textarea form__textarea" id="reviewText" name="reviewText" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleFieldChange} value={review.reviewText} />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={review.reviewText.length < 50 || parseInt(review.rating, 10) === 0 || review.reviewText.length > 300} onClick={(evt: FormEvent<HTMLButtonElement>) => {
          evt.preventDefault();
          store.dispatch(postComment({id: offerId, comment:review.reviewText, rating:parseInt(review.rating, 10)}));
          setReview({
            reviewText: '',
            rating: '0'
          });
        }}
        >
        Submit
        </button>
      </div>
    </form>
  );
}

export const CommentForm = React.memo(CommentFormComponent);
