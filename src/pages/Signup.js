import React, { Component } from 'react';
import withAuth from '../components/withAuth.js'
import { Redirect } from 'react-router-dom'

class Signup extends Component {

  state = {
    username: '',
    password: '',
    message: 'Nuevo Administrador Creado',
    success: false,
    redirect: false,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.props.signup({ username, password })
      .then( (user) => {
        this.onSuccessfulSubmit()
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
  onSuccessfulSubmit = ()=> {
    this.setState({
      success: true
    }, () => {
      setTimeout(()=>{
        this.setState({
          redirect: true
        })
      }, 3000)
    })
  }
  validarForm(){
    const { username, password } = this.state
    const noValido = !username || !password || password.length < 5
    return noValido;
  }

  render() {
    const { username, password, redirect, message, success } = this.state;
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
          { success ? <h4 className="bg-success message p-4">{message}</h4> : '' }
        </form>
        {redirect ? <Redirect to = '/private'/> : null}
      </div>
      
    )
  }
}

export default withAuth(Signup);