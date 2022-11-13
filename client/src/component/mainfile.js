import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stor } from '../firebase/firebase';
import { Navigate } from "react-router-dom";
import { ref, uploadBytesResumable, getStorage, deleteObject, getDownloadURL } from "firebase/storage";
import { uploadpic, getimgall, deleteacc } from '../redux--appli/action/mainfll';
import { logout } from '../redux--appli/action/auth';
import { logoutt, serch } from '../redux--appli/action/mainfll';
import uuid from 'react-uuid';

const Mainfile = ({ userget: { load }, imgall: { imgss, imgnm }, getimgall, deleteacc, uploadpic, logout, logoutt, serch }) => {

  // file upload
  const [photo, setphoto] = useState();
  const [opt, setopt] = useState('');
  const [imgname, setimgname] = useState('');

  useEffect(() => {

    getimgall(opt);
  }, [getimgall, opt]);

  function handlephotos(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setphoto(image);
    }
  }



  function photos() {

    const imageRef = ref(stor, `imgs/img-${uuid()}`);

    if (photo) {
      // using uploadBytesResumable
      if (imgname === '') {
        alert('Plz enter name of your img below choose file ');
        return;
      }

      const uploadTask = uploadBytesResumable(imageRef, photo);
      uploadTask.on("state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            uploadpic({ img: downloadURL, imgnm: imgname });
          });
        }
      );
    }
    else {
      alert('error occured while uploading images');
    }
  }

  function dels(url, keys) {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      const storage = getStorage();

      const desertRef = ref(storage, url);

      // delete main
      getDownloadURL(desertRef)
        .then((down) => {
          // Delete the file
          deleteObject(desertRef).then(() => {
            // File deleted successfully
            deleteacc(keys);
          }).catch((error) => {
            alert(error);
          });
        })
        .catch((err) => {
          // deleteacc();
          alert('some error occured....');
        })

    }
  }

  function logoutfunc(e) {
    e.preventDefault();
    logout();
    logoutt();
  }

  return load ? <h1>Loading...</h1> :
    (<React.Fragment>
      <button onClick={(e) => logoutfunc(e)} className=' btn btn-danger immggss'>Logout</button><br /><br />

      <form onSubmit={(e) => photos(e)}>
        <input type="file" onChange={handlephotos} />{" > "}
        <button type="button" className="immggss btn btn-secondary" onClick={() => photos()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>{' '}Upload</button><br />
        <input type='text' value={imgname} placeholder="Enter Name of your Images..." onChange={(e) => setimgname(e.target.value)} />

      </form>

      <br /><br />

      <div class="input-group rounded">
        <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" val="" onChange={(e) => setopt(e.target.value)} />
        <span class="input-group-text border-0" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
      </div><br /><br />

      <div className="row cont">
        {imgss.length > 0 ?
          imgss.map((ele, key) => (
            <div className="col-lg-4 col-md-4 col-6">
              <img
                src={ele}
                className="w-100 shadow-1-strong rounded mb-4 hhtt immggss "
              />{" "}
              <h1 className="vval">{imgnm[key]}</h1>
              <button type="button" className=" immggss btn btn-danger dels" onClick={() => dels(ele, key)}>Delete X</button>
            </div>
          )
          )
          :
          <span>No Photos yet</span>
        }
      </div>
    </React.Fragment >)
}

Mainfile.propTypes = {
  uploadpic: PropTypes.func.isRequired,
  userget: PropTypes.object.isRequired,
  imgall: PropTypes.object.isRequired,
  logoutt: PropTypes.func.isRequired,
  serch: PropTypes.func.isRequired,
  deleteacc: PropTypes.func.isRequired,
};

const maps = (state) => ({
  imgall: state.imgall,
  userget: state.auth
});

export default connect(maps, { getimgall, uploadpic, deleteacc, logout, logoutt, serch })(Mainfile);