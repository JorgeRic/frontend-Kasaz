import React, { Component } from 'react';
import withAuth from '../components/withAuth.js'


class Signup extends Component {

  state = {
    username: '',
    password: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.props.signup({ username, password })
      .then( (user) => {
        console.log(user)
        this.setState({
            username: '',
            password: '',
        });
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  validarForm(){
    const { username, password } = this.state
    const noValido = !username || !password || password.length < 5
    return noValido;
  }

  render() {
    const { username, password } = this.state;
    return (
      
      <div className="main-login mr-5 ml-5">
        <form onSubmit={this.handleFormSubmit}>
          <label className="datos-login mr-5 " htmlFor='username' ><h2>Username:</h2></label>
          <input id='username' className="form-control text-center  letra-signup mr-5 letra" type='text' name='username' value={username} onChange={this.handleChange}></input>
          <label className="datos-login mr-5 " htmlFor='password'><h2>Password:</h2></label>
          <input id='password' className="form-control text-center  letra-signup mr-5 letra" type='password' name='password' value={password} onChange={this.handleChange}></input>
          <div className="text-center">
          <button type='submit' disabled={this.validarForm()} value="signup" className="btn btn-outline-success btn-small mt-4 mb-5"><h3>Signup</h3></button>
          </div>
        </form>

      </div>
      
    )
  }
}

export default withAuth(Signup);