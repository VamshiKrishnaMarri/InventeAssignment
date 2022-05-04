import {Component} from 'react'

import {v4} from 'uuid'

import Item from '../Item'

import './index.css'

class Home extends Component {
  state = {
    nameInput: '',
    emailInput: '',
    numberInput: '',
    userList: [],
    imageInput: '',
    imagePreviewUrl: '',
    showNameError: false,
    showEmailError: false,
    showNumberError: false,
  }

  onBlurName = () => {
    const isvalidName = this.validateName()

    this.setState({showNameError: !isvalidName})
  }

  validateName = () => {
    const {nameInput} = this.state
    return nameInput !== ''
  }

  onBlurNumber = () => {
    const isvalidNumber = this.validateNumber()

    this.setState({showNumberError: !isvalidNumber})
  }

  validateNumber = () => {
    const {numberInput} = this.state
    return numberInput !== ''
  }

  onBlurEmail = () => {
    const isvalidEMail = this.validateEmail()

    this.setState({showEmailError: !isvalidEMail})
  }

  validateEmail = () => {
    const {emailInput} = this.state
    return emailInput !== ''
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({emailInput: event.target.value})
  }

  onChangeNumber = event => {
    this.setState({numberInput: event.target.value})
  }

  onChangeImage = event => {
    const reader = new FileReader()
    const file = event.target.files[0]

    reader.onloadend = () => {
      this.setState({
        imageInput: URL.createObjectURL(file),
        imagePreviewUrl: reader.result,
      })
    }

    reader.readAsDataURL(file)
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {nameInput, emailInput, numberInput, imageInput} = this.state
    const newUser = {
      id: v4(),
      name: nameInput,
      email: emailInput,
      number: numberInput,
      image: imageInput,
    }

    this.setState(prevState => ({
      userList: [...prevState.userList, newUser],
      nameInput: '',
      emailInput: '',
      numberInput: '',
      imageInput: '',
      imagePreviewUrl: '',
    }))
  }

  render() {
    const {
      nameInput,
      emailInput,
      numberInput,
      userList,
      imagePreviewUrl,
      showNameError,
      showEmailError,
      showNumberError,
    } = this.state

    return (
      <div className="bg-container">
        <div className="inputs-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="form-heading">Register</h1>
            <div className="input-container">
              <label htmlFor="username" className="input-label">
                Name
              </label>
              <input
                type="text"
                value={nameInput}
                placeholder="Enter Name"
                className="input"
                id="username"
                onChange={this.onChangeName}
                onBlur={this.onBlurName}
              />
              {showNameError && <p className="error-msg">*Required</p>}
            </div>
            <div className="input-container">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                value={emailInput}
                placeholder="Enter Email"
                className="input"
                id="email"
                onChange={this.onChangeEmail}
                onBlur={this.onBlurEmail}
              />
              {showEmailError && <p className="error-msg">*Required</p>}
            </div>

            <div className="input-container">
              <label htmlFor="number" className="input-label">
                Phone
              </label>
              <input
                type="tel"
                value={numberInput}
                placeholder="Enter Number"
                className="input"
                id="number"
                onChange={this.onChangeNumber}
                onBlur={this.onBlurNumber}
              />
              {showNumberError && <p className="error-msg">*Required</p>}
            </div>
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt="Preview" className="image" />
            )}
            <div className="input-container">
              <label htmlFor="image" className="input-label">
                Upload Image
              </label>
              <input
                type="file"
                className="input"
                id="image"
                onChange={this.onChangeImage}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="button">
                Submit
              </button>
            </div>
          </form>
        </div>
        <hr className="line" />
        <h1 className="form-heading">Registered Users</h1>
        <ul className="user-container">
          {userList.map(each => (
            <Item key={each.id} itemDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
}
export default Home
