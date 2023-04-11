import React, { useCallback } from 'react';

import deleteIcon from './../../assets/deleteicon.svg';
import image from './../../assets/placeHolder.jpg';
import { getBase64 } from './../../services/utils';
import './PickAvatar.css';
// eslint-disable-next-line react/prop-types
export function PickAvatar({ name, register, setImg, img }) {
  const { onChange, ref } = register(name);

  const onAvatarChange = useCallback(
    async (event) => {
      if (event.target.files?.[0]) {
        const base64 = await getBase64(event.target.files[0]);
        setImg(base64);
        onChange(event);
      }
    },
    [onChange, setImg]
  );

  const handleDelete = () => {
    setImg('');
  };

  return (
    <div>
      <label>Profile photo </label>
      <div className="container">
        <img src={img ? img : image} alt="profile img" width="100px" />
        <img
          src={deleteIcon}
          className="avatar"
          alt="profile img"
          width="10px"
          onClick={handleDelete}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        name={name}
        ref={ref}
        onChange={onAvatarChange}
      />
      {/* <p>{errors[name]?.message}</p> */}
    </div>
  );
}
