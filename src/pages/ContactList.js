import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
// import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import './contact-form/ContactForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import DisplayRow from '../components/DisplayRow';
import Loader from '../components/spinner/Spinner';
import { contactList } from '../store/contactSlice';
import { logout } from '../store/userSlice';
const ContactList = () => {
  const { contacts, status } = useSelector((state) => state.contacts);
  const [isLogoutLoader, setIsLogoutLoader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate('/contact');
  };

  const handleLogout = async () => {
    setIsLogoutLoader(true);
    setTimeout(async () => {
      await dispatch(logout());
    }, 1000);
  };

  useEffect(() => {
    dispatch(contactList());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="myLoader">
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
                {contacts.map((item) => (
                  <DisplayRow key={item.id} data={item} />
                ))}
              </tbody>
            </Table>
          ) : (
            'Contact not found'
          )}
        </div>
        <div className="d-flex gap-2 text-center container">
          <Button variant="primary" size="lg" onClick={handleClick}>
            Add
          </Button>
          <Button variant="danger" size="lg" onClick={handleLogout}>
            {isLogoutLoader ? <Loader /> : 'Logout'}
          </Button>
        </div>
      </>
    );
  }
};

export default ContactList;
