import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../lib/AuthProvider";
import authService from "../../lib/services/auth-service";
import "./upload.css";

import defaultProfileImages from "../../lib/config/defaultProfilePic";

class Signup extends Component {
  state = { username: "", password: "", image: null, imageLoaded: true };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, image } = this.state;
    const newUser = this.props.signup({ username, password, image });
    console.log("AAAAAAAAAAAAAAAAAAA: ", newUser);
    // this.setState({ username: "", password: "", image: null });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  fileChange = event => {
    this.setState({ imageLoaded: false });
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("photo", file);

    authService
      .imageUpload(uploadData)
      .then(image => {
        this.setState({ image });
        this.setState({ imageLoaded: true });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    this.setState({
      image:
        defaultProfileImages[
          Math.floor(Math.random() * defaultProfileImages.length)
        ]
    });
  }

  render() {
    const { username, password, image } = this.state;
    return (
      <div className="signup">
        <h1>Welcome!!</h1>
        {!this.state.image ? null : <img src={this.state.image} alt="" />}
        <p>Please, fill in the fields below:</p>
        <form
          onSubmit={this.handleFormSubmit}
          noValidate
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="username"
            value={username}
            className="signup-input"
            placeholder="Your username"
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            className="signup-input"
            value={password}
            onChange={this.handleChange}
          />

          {/* <input
            type="file"
            className="signup-file-input"
          /> */}
            <input type="file" 
            name="image"
            onChange={e => this.fileChange(e)}
            id="file" />
            <label for="file" 
            className="btn-3">
              <span>select</span>
            </label>
          <br />
          {this.state.imageLoaded ? (
            <input type="submit" value="Signup" className="signup-btn" />
          ) : (
            <input type="button" value="Signup" className="signup-btn" />
          )}
        </form>

        <p>
          Already have account? <Link to={"/login"}> Log In</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
