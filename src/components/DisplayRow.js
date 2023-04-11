import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import image from '../assets/placeHolder.jpg';
import { contactDelete } from '../store/contactSlice';
import Loader from './spinner/Spinner';

const DisplayRow = ({ index, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (id) => {
    navigate(`/contact/${id}`);
  };
  const handleDelete = async (id) => {
    setIsDeleting(true);
    await dispatch(contactDelete(id));
  };
  // console.log({ isDeleting });
  return (
    <tr key={index}>
      <td>{data.email}</td>
      <td>{data.name}</td>
      <td>{data.phoneNumber}</td>
      <td>
        {/* {console.log('map ', data.image)} */}
        <img
          src={!data.image ? image : data.image}
          alt="img"
          width="100px"
          height="100px"
        />
      </td>
      <td>
        <div className="actionButton">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleUpdate(data.id)}
          >
            Update
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(data.id)}
          >
            {isDeleting ? <Loader /> : 'Delete'}
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default DisplayRow;
