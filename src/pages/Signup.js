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
      
      <div className="main-login">
        <form onSubmit={this.handleFormSubmit}>
          <label className="datos-login" htmlFor='username'><h2>Username:</h2></label>
          <input id='username' className="form-control text-center p-4 letra-signup" type='text' name='username' value={username} onChange={this.handleChange}/>
          <label className="datos-login" htmlFor='password'><h2>Password:</h2></label>
          <input id='password' className="form-control text-center p-4 letra-signup" type='password' name='password' value={password} onChange={this.handleChange} />
          <p><small>* Minimo 5 caracteres</small></p>
          <div className="text-center">
            <button type='submit' disabled={this.validarForm()} value="Signup" className="btn btn-outline-warning btn-small mt-4 mb-5"><h3>Signup</h3></button>
          </div>
        </form>
      </div>
      
    )
  }
}

export default withAuth(Signup);