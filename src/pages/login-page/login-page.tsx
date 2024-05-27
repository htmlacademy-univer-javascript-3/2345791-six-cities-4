
import {Helmet} from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { getRandomCity } from '../../utils';
import { changeCity } from '../../store/action';

function LoginPage(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const city = getRandomCity();

  const handleCityClick = () => {
    dispatch(changeCity(city));
    navigate(AppRoute.Root);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }));
      navigate(AppRoute.Root);
    }
  };
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (<Navigate to={AppRoute.Root}/>);
  }
  return (
    <div className="page page--gray page--login" data-testid='LoginPageContainer'>
      <Helmet>
        <title>6 городов. Зайдите в аккаунт</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required ref={emailRef}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required ref={passwordRef} pattern={'.*[0-9].*[A-Za-zА-Яа-яЁё].*$|^.*[A-Za-zА-Яа-яЁё].*[0-9].*'} title={'Пароль должен содержать как минимум одну цифру и одну букву'}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" onClick={() => handleCityClick()}>
                <span>{city.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default LoginPage;
