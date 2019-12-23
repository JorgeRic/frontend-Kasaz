import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
 
class FileUploadComponent extends Component {
  state = {
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };
 
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url)
        this.setState({ avatarURL: url })
        this.props.onUploadFinished(url);
      });
  };
 
  render() {
    const {isUploading, progress, avatarURL} = this.state;
    return (
      <form className='d-flex justify-content-center'>
        <div className="d-flex btn btn-warning mb-2  mr-1 ml-1 flex-column mt-2">
          <label>Subir Imagen:</label>
          {isUploading && <p>Progress: {progress}</p>}
          {avatarURL && <img src={avatarURL} className="img-fluid size-img mr-2 ml-2" alt='name'/>}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            className="btn btn-success"
          />
      </div>
    </form>
    );
  }
}
 
export default FileUploadComponent;