import React, { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import './contact-form/ContactForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  contactList,
  contactDelete,
  // contactUpdate,
} from '../store/contactSlice';
import { logout } from '../store/userSlice';

const ContactList = () => {
  // const { error, user, ...rest } = useSelector((state) => state.user);
  // const state = useSelector((state) => state.contacts);

  // console.log('line 14 ', state);
  // console.log("{ error, ...rest }", { error, user, ...rest });

  const { contacts, status } = useSelector((state) => state.contacts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate('/contact');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDelete = (id) => {
    dispatch(contactDelete(id));
  };

  const handleUpdate = (id) => {
    // dispatch(contactUpdate(id));
    // navigate('/contact');
    navigate(`/contact/${id}`);
  };

  useEffect(() => {
    dispatch(contactList());
  }, [dispatch]);

  if (status === 'loading') {
    return <Spinner animation="border" />;
  }

  if (status === 'succeeded') {
    return (
      <>
        <h1 className="center">Contact</h1>
        <div className="container">
          {contacts.length ? (
            <Table striped bordered hover variant="dark">
              <thead className="mb-2">
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>PhoneNumber</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleUpdate(item.id)}
                      >
                        Update
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            'contact not found '
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
