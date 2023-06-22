import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './AuthForm.module.sass';
import { ROUTES } from '../../constants/routes';
import { CustomInput } from '../CustomInput';
import { CustomButton } from '../CustomButton';

interface IAuthForm {
  title: string,
  handleClick: (email: string, password: string) => void,
  buttonName: string,
  formType: string,
}

const AuthForm: React.FC<IAuthForm> = ({ title, handleClick, buttonName, formType }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const checkEmailError = () => {
    if (!email.trim().length) {
      setEmailError('Email required');
      return true;
    }

    if (!validateEmail(email)) {
      setEmailError('Email must be valid');
      return true;
    }

    setEmailError('');
    return false;
  }

  const checkPasswordError = () => {
    if (!password.trim().length) {
      setPasswordError('Password required');
      return true;
    }

    if (password.length < 8) {
      setPasswordError('Password should be at least 8 characters');
      return true;
    }

    setPasswordError('');
    return false;
  }

  const clickButton = () => {
    const emailError = checkEmailError();
    const passwordError = checkPasswordError();

    if (!emailError && !passwordError) {
      handleClick(email, password)
    }
  }

  return (
    <div className={styles['page-wrap']}>
      <div className={styles['auth-form']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['input-row']}>
          <CustomInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmailError()}
            placeholder="Email"
            textError={emailError}
          />
        </div>
        <div className={styles['input-row']}>
          <CustomInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => checkPasswordError()}
            placeholder="Password"
            textError={passwordError}
          />
        </div>
        <div className={styles['button-row']}>
          <CustomButton
            onClick={clickButton}
            buttonText={buttonName}
            type={'confirm'}
          />
        </div>
        {
          formType === 'login' ?
            <div className={styles['redirect-box']}>
              Don't have an account yet? <NavLink to={ROUTES.Register}> Sign up </NavLink> now!
            </div> : null
        }
        {
          formType === 'register' ?
            <div className={styles['redirect-box']}>
              Already have an account? <NavLink to={ROUTES.Login}> Log in</NavLink>
            </div> : null
        }
      </div>
    </div>
  )
};

export { AuthForm };