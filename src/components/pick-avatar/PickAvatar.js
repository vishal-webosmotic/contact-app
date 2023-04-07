import React, { useCallback } from 'react';

import { getBase64 } from './../../services/utils';
import './PickAvatar.css';
// eslint-disable-next-line react/prop-types
export function PickAvatar({ name, register, setImg, img }) {
  const { onChange, ref } = register(name);
  //   const [image, setImage] = useState();

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

  return (
    <div>
      <label>Profile photo : </label>
      {img && (
        <img src={img} className="avatar" alt="profile img" width="100px" />
      )}
      <input type="file" name={name} ref={ref} onChange={onAvatarChange} />
      {/* <p>{errors[name]?.message}</p> */}
    </div>
  );
}
