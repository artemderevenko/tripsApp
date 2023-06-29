import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useAppDispatch } from '../hooks/reduxHook';
import { setUser } from '../store/slices/userSlice';
import { AuthForm } from '../components/AuthForm';
import { ROUTES } from '../constants/routes';
import { Notification } from '../components/Notification';
import { INotify } from '../types/notify';

const Register: React.FC = () => {
  const [notify, setNotify] = useState<INotify>({type: '', text: ''});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string): void => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { email, refreshToken, uid } = user;

        dispatch(setUser({
          email: email,
          token: refreshToken,
          id: uid,
        }));

        setNotify({type: '', text: ''});
        navigate(`/${ROUTES.Clients}`);

      })
      .catch((error) => {
        const errorCode = error.code;

        let message = 'Something went wrong. Please try again later';

        if (errorCode === 'auth/email-already-in-use') {
          message = 'Email already exists'
        }

        if (notify.text !== message) {
          setNotify({type: 'error', text: message});
        }
      });
  }

  return (
    <>
      <AuthForm
        title={'Sign up account'}
        handleClick={handleRegister}
        buttonName={'Sign up'}
        formType={'register'}
      />
      {
        notify && notify.text ?
          <Notification
            type={notify.type}
            message={notify.text}
            afterHide={() => setNotify({ type: '', text: '' })}
          /> : null
      }
    </>
  )
};

export default Register;