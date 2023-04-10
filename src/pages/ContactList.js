import React, { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import './contact-form/ContactForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loader from '../components/spinner/Spinner';
import { contactList, contactDelete } from '../store/contactSlice';
import { logout } from '../store/userSlice';
import image from './../assets/placeHolder.jpg';

const ContactList = () => {
  const { contacts, status, deletingId } = useSelector(
    (state) => state.contacts
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate('/contact');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDelete = async (id) => {
    await dispatch(contactDelete(id));
  };

  const handleUpdate = async (id) => {
    navigate(`/contact/${id}`);
  };

  useEffect(() => {
    dispatch(contactList());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="myLoader">
        {console.log('line 48')}
        <Loader />
      </div>
    );
  }

  if (status === 'succeeded') {
    return (
      <>
        <h1 className="center">Contact</h1>
        <div className="container">
          {contacts.length ? (
            <Table className="center " striped bordered hover variant="dark">
              <thead className="mb-2">
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Profile Photo</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      {console.log('map ', item.image)}
                      <img
                        src={!item.image ? image : item.image}
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
                          onClick={() => handleUpdate(item.id)}
                        >
                          Update
                        </Button>
                        {deletingId === item.id ? (
                          <Loader />
                        ) : (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            'contact not found'
          )}
        </div>
        <div className="d-flex gap-2 text-center container">
          <Button variant="primary" size="lg" onClick={handleClick}>
            Add
          </Button>
          <Button variant="danger" size="lg" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </>
    );
  }
};

export default ContactList;
