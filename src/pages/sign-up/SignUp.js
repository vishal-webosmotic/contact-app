import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './SignUp.css';
// import { getPostsStatus } from '../../store/userSlice';

export default function SignUp() {
  const navigate = useNavigate();
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

  // const { error } = useSelector((state) => state.user);
  // const status = useSelector(getPostsStatus);

  // if (status === "loading") return <div>Loading..</div>;

  const onSubmit = ({ email, password }) => {
    let obj = { email, password };
    let mainData = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : [];
    mainData.push(obj);
    localStorage.setItem('users', JSON.stringify(mainData));
    navigate('/');
  };

  // if (status === "succeeded") {
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

        <button>SIGN UP</button>
      </form>
      <Link to="/" replace="true">
        already a user?
      </Link>
    </div>
  );
  // }
  // if (status === "failed") {
  //   return error;
  // }
}