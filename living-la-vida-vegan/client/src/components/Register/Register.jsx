import React, { useState } from 'react';
import './Register.css';
import { registerUser } from '../../services/users';
import { Button } from 'react-bootstrap';
import RegisterCont from './RegisterCont';

export default function Register(props) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    upload_photo: '',
    about_me: '',
    likes_interests: '',
  });

  const [clicked, setClicked] = useState({
    clicked: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await registerUser(formData);
    props.setCurrentUser(userData);
    props.history.push('/');
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div>
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <h3>Make an Account</h3>
        <input
          type='text'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
        />
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <input
          type='password'
          name='confirmPassword'
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder='Confirm Password'
        />
        <button onClick={handleClick}>Next</button>
        {clicked ? (
          ''
        ) : (
          <div>
            <input
              type='text'
              name='uploadPhoto'
              value={formData.upload_photo}
              onChange={handleChange}
              placeholder='Image URL'
            />
            <input
              type='text'
              name='aboutMe'
              value={formData.about_me}
              onChange={handleChange}
              placeholder='share a few words about yourself'
            />
            <input
              type='text'
              name='likesInterests'
              value={formData.likes_interests}
              onChange={handleChange}
              placeholder='any likes or interests?'
            />
            <button>Save</button>
          </div>
        )}
      </form>
    </div>
  );
}
