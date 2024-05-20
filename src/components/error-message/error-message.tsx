import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state[NameSpace.Data].error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
}

export default ErrorMessage;
