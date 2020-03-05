import React, {useState} from 'react';
import firebase from './config/firebase';

export const App: React.FC = () => {
  const [image, setImage] = useState<any | null>({preview: '', raw: ''});
  const [photo, setPhoto] = useState<any | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const image = e.target.files !== null ? e.target.files[0] : null;
    setPhoto(image);
    setImage({
      preview: URL.createObjectURL(
        e.target.files !== null ? e.target.files[0] : null,
      ),
      raw: e.target.files !== null ? e.target.files[0] : null,
    });
  };

  const handleUpload = () => {
    const storageRef = firebase.storage().ref(photo.name);
    storageRef
      .put(photo)
      .then(snapshot => {
        console.log('upload file');
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="file" id="upload-button" onChange={handleChange} />
      {image.preview ? (
        <img src={image.preview} alt="ユーザーアバター" />
      ) : (
        <img src={photo} alt="ユーザーアバター" />
      )}
      <button onClick={handleUpload}>画像を投稿</button>
    </div>
  );
};
