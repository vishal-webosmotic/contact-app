https://dev.to/akanstein/protected-routes-with-react-router-and-redux-3e62

https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/
https://www.bezkoder.com/react-redux-login-example-toolkit-hooks/

https://github1s.com/RamanSharma100/React-Redux-Contact-Book/blob/HEAD/src/components/AddContact/index.js

<!-- import React from 'react';

import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// import getCurrentUser, { getData } from '../../services/storage';
import { contactAdd } from '../../store/contactSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { contacts } = useSelector((state) => state.contacts);

  let { id } = useParams();
  let updateContacts = contacts.filter((item) => {
    return item.id === Number(id);
  });
  console.log(updateContacts);

  // {
  // defaultValues: {
  //   name: 'xyz',
  //   phoneNumber: 3232523,
  //   email: 'secret',
  // },
  // }

  const navigate = useNavigate();

  // const handleLogout = () => {
  // dispatch(logout());
  //   navigate('/');
  // };

  const onHomeClick = () => {
    navigate('/');
  };

  const onSubmit = (data, e) => {
    dispatch(contactAdd(data));
    e.target.reset();
    navigate('/');
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Add contact details</h1>
          <div className="inputContainer">
            <label htmlFor="name">Name</label>
            <input
              {...register('name', {
                required: 'Please Enter Your Name!',
                max: 20,
              })}
              type="text"
              id="name"
              className={`${errors.name && 'input-error'}`}
            />
            <p className="errorMes">{errors.name?.message}</p>
          </div>
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
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              {...register('phoneNumber', {
                required: 'Please Enter Your phone Number!',
              })}
              type="number"
              id="pNumber"
              className={`${errors.number && 'input-error'}`}
            />
            <p className="errorMes">{errors.phoneNumber?.message}</p>
          </div>
          <button>Add contact</button>
        </form>
      </div>
      <div className="d-flex gap-2 text-center container">
        <Button variant="primary" size="lg" onClick={onHomeClick}>
          Back
        </Button>
        {/* <Button variant="danger" size="lg" onClick={handleLogout}>
          Logout
        </Button> */}
      </div>
    </div>
  );
};

export default ContactForm; -->
