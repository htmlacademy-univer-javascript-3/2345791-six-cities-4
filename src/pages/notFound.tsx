import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function NotFoundScreen(): JSX.Element {
  return (
    <div>
      <Helmet>
        <title>6 городов. Страница не найдена</title>
      </Helmet>
      <h1>404. Page not found</h1>
        <Link to='/'>Вернуться на главную</Link>
    </div>
  )
}

export default NotFoundScreen
