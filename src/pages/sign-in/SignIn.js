import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../store/userSlice';

export default function SignIn() {
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // console.log("{ error, ...rest }", { error, ...rest });
  // const status = useSelector(getPostsStatus);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'abc@gmail.com',
      password: 'abcd1234',
    },
  });

  const onSignUp = () => {
    navigate('/signup');
  };
  const onSubmit = (data) => {
    // console.log('line 24', data);
    dispatch(login(data));
  };

  // if (status === "loading") return <div>Loading signIn..</div>;

  // if (status === "succeeded") {
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign In Form</h1>
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
        {error}
        <button>SIGN In</button>
      </form>
      {/* <Link to="/signup" replace={true}>
        become a user?
      </Link> */}
      <div className="signUpButton">
        <h4>become a user?</h4>
        <Button variant="primary" size="lg" onClick={onSignUp}>
          Sign Up
        </Button>
      </div>
    </div>
  );
  // }
  // if (status === "failed") {
  //   return error;
  // }
}
