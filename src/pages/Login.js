import React, { Component } from 'react';
import withAuth from '../components/withAuth'

class Login extends Component {
  state = {
    username: '',
    password: '',
    message: 'Error en username o password',
    error: false
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state
    this.props.login({ username, password })
    .then( (response) => {

    })
    .catch( error => {
      if(error){
        this.onSuccessfulSubmit()
      }
    } )
  }
  onSuccessfulSubmit = ()=> {
    this.setState({
      error: true
    }, () => {
      setTimeout(()=>{
        this.setState({
          error: false
        })
      }, 2000)
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  validarForm(){
    const { username, password } = this.state
    const noValido = !username || !password
    return noValido;
  }
  
  render() {
    const { username, password, error, message } = this.state;
    return (
      <div className="main-login mr-5 ml-5">
        <form onSubmit={this.handleFormSubmit}>
          <label className="datos-login mr-5 " htmlFor='username' ><h2>Username:</h2></label>
          <input id='username' className="form-control text-center letra-signup mr-5 " type='text' name='username' value={username} onChange={this.handleChange}></input>
          <label className="datos-login mr-5 " htmlFor='password'><h2>Password:</h2></label>
          <input id='password' className="form-control  text-center mb-2 letra-signup mr-5" type='password' name='password' value={password} onChange={this.handleChange} />
          <div className="text-center">
          { error ? <h4 className="mail-enviado bg-danger p-4">{message}</h4> : '' }
          <button type='submit' disabled={this.validarForm()} value="login" className="btn btn-outline-success btn-small mt-2 mb-5"><h3>Login</h3></button>
          </div>
        </form>

      </div>
    )
  }
}

export default withAuth(Login);