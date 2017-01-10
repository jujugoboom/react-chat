import React, {Component} from 'react';
import ProgressBar from "./ProgressBar";

class ImageUploader extends Component {

  constructor(props) {
      super(props)
    this.state = {
      file: null,
      data_uri: null,
      processing: false,
      uploaded: false,
      bytesSent: 0,
      bytesTotal: 0
    }

    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });

    let firebaseRef = this.props.firebaseRef;
    let uploadTask = firebaseRef.put(this.state.file);
    uploadTask.on('state_changed', (snapshot) => {
        this.setState({
            bytesSent: snapshot.bytesTransferred,
            bytesTotal: snapshot.totalBytes
        });
    }, (e) =>{

    }, () => {
        this.setState({
            processing: false,
            uploaded: true
        });
        if(this.props.onComplete){
            this.props.onComplete(uploadTask.snapshot.downloadURL);
        }
    });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    this.setState({file: file});
    reader.addEventListener('load', () => {
      this.setState({data_uri: reader.result});
    });
    reader.readAsDataURL(file);
  }
  updateProgress(snapshot){
      this.setState({bytesSent: snapshot.bytesTransferred});
      this.setState({bytesTotal: snapshot.totalBytes});
  }

  render() {
    let processing;
    let uploaded;
    let preview;
    if(this.state.data_uri){
        preview = <div><img src={this.state.data_uri} height={200}/></div>
    }

    if (this.state.uploaded) {
      uploaded = (
        <div>
          Image uploaded!
        </div>
      );
    }

    if (this.state.processing) {
      processing = <ProgressBar done={this.state.bytesSent} total={this.state.bytesTotal}/>
    }

    return (
      <div className='row'>
        <div className='col-sm-12'>
          <label>Upload an image</label>
          {preview}
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" onChange={this.handleFile} />
            <input disabled={this.state.processing || !this.state.file} className='btn btn-primary' type="submit" value="Upload" />
            {processing}
          </form>
          {uploaded}
        </div>
      </div>
    );
  }
}

export default ImageUploader;