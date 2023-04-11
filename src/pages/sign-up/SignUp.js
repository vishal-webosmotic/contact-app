import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { singUp } from '../../store/userSlice';
import './SignUp.css';
// import { getData, setStorage } from '../../services/storage';
// import { getPostsStatus } from '../../store/userSlice';
// import Loader from './../../components/spinner/Spinner';

export default function SignUp() {
  const navigate = useNavigate();
  // const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [signupLoader, setSingUpLoader] = useState();
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'abc@gmail.com',
      password: 'abcd1234',
      confirmPassword: 'abcd1234',
    },
  });

  const onSignIn = () => {
    navigate('/');
  };

  const onSubmit = async ({ email, password }) => {
    setSingUpLoader(true);
    setError('');
    const obj = { email, password };
    const status = await dispatch(singUp(obj));
    if (status.error) {
      setError(status.error.message);
    }
    if (!status.rejectedWithValue) {
      setSingUpLoader(false);
    }
    if (status.meta.requestStatus !== 'rejected') {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up Form</h1>
        <div className="inputContainer">
          <label htmlFor="email">Email</label>
          <input
            {...register('email', {
              required: 'Please Enter Your Email!',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please Enter A Valid Email!',
              },
            })}
            type="email"
            id="email"
            className={`${errors.email && 'input-error'}`}
          />
          <p className="errorMes">{errors.email?.message}</p>
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Please Enter Your Password',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long!',
              },
            })}
            type="password"
            id="password"
            className={`${errors.password && 'input-error'}`}
          />
          <p className="errorMes">{errors.password?.message}</p>
        </div>

        <div className="inputContainer">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register('confirmPassword', {
              required: 'Please Confirm Your Password',
              validate: (match) => {
                const password = getValues('password');
                return match === password || 'Passwords should match!';
              },
            })}
            type="password"
            id="confirmPassword"
            className={`${errors.confirmPassword && 'input-error'}`}
          />
          <p className="errorMes">{errors.confirmPassword?.message}</p>
        </div>
        <div className="errorMes">{error}</div>
        {/* <button>{signupLoader ? <Loader /> : ' SIGN UP'}</button> */}
        <button>
          {signupLoader ? (
            <>
              <span className="loader"></span>
            </>
          ) : (
            ' SIGN UP'
          )}
        </button>
      </form>
      <div className="singInButton">
        <h4>Already register?</h4>
        <Button variant="primary" size="lg" onClick={onSignIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
