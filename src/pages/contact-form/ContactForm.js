import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { PickAvatar } from '../../components/pick-avatar/PickAvatar';
import Loader from '../../components/spinner/Spinner';
import { contactAdd, contactDetailsField } from '../../store/contactSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { contact, isUpdate } = useSelector((state) => state.contacts);
  const { id } = useParams();
  const [img, setImg] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (id) {
      dispatch(contactDetailsField(id));
      setValue('name', contact?.name ?? '');
      setValue('email', contact?.email ?? '');
      setValue('phoneNumber', contact?.phoneNumber ?? '');
      setImg(contact?.image);
    }
  }, [
    contact?.email,
    contact.image,
    contact?.name,
    contact?.phoneNumber,
    dispatch,
    id,
    setValue,
  ]);

  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate('/');
  };

  const onSubmit = async (data, e) => {
    data.image = img;
    await dispatch(contactAdd({ id: id, ...data }));
    e.target.reset();
    navigate('/');
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1> {id ? 'Edit' : 'Add'} contact </h1>
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
                  message: 'Please Enter a Valid Email!',
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
              type="tel"
              id="pNumber"
              className={`${errors.number && 'input-error'}`}
            />
            <p className="errorMes">{errors.phoneNumber?.message}</p>
          </div>
          <PickAvatar
            name="avatar"
            errors={errors}
            register={register}
            setImg={setImg}
            img={img}
          />
          <button>
            {isUpdate ? (
              <Loader />
            ) : (
              <>
                {' '}
                {id ? 'Edit' : 'Add'} {' contact'}
              </>
            )}
          </button>
        </form>
      </div>
      <div className="d-flex gap-2 text-center container">
        <Button variant="primary" size="lg" onClick={onHomeClick}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
