import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { useAppDispatch } from '../hooks/reduxHook';
import { setUser } from '../store/slices/userSlice';
import { AuthForm } from '../components/AuthForm';
import { ROUTES } from '../constants/routes';
import { useNotify } from '../hooks/useNotify';

const Login: React.FC = () => {
  const { notify, setNotify } = useNotify();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { email, refreshToken, uid } = user;

        dispatch(setUser({
          email: email,
          token: refreshToken,
          id: uid,
        }));

        setNotify({isActive: false, type: '', message: ''});
        navigate(`/${ROUTES.Clients}`);

      })
      .catch((error) => {
        const errorCode = error.code;

        let message = 'Something went wrong. Please try again later';

        if (errorCode === 'auth/user-not-found') {
          message = 'User is not found'
        }

        if (errorCode === 'auth/wrong-password') {
          message = 'Authorisation error. Check your email or password'
        }

        if (errorCode === 'auth/too-many-requests') {
          message = 'Access to this account has been temporarily disabled due to many failed login attempts. You can try again later'
        }

        if (notify.message !== message) {
          setNotify({isActive: true, type: 'error', message: message});
        }
      });
  }

  return (
    <>
      <AuthForm
        title={'Log in to your account'}
        handleClick={handleLogin}
        buttonName={'Sign in'}
        formType={'login'}
      />
    </>
  )
};

export default Login;