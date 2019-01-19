import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, MDBContainer, MDBRow, MDBCol, NavLink, NavItem, NavbarNav } from "mdbreact";
import SpeechRecognition from 'react-speech-recognition';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import indexStyle from './index.css';
import img from './assets/bmi.png';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  recognition: PropTypes.object,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}
const options = {
  autoStart: false
}
class App extends Component {
  state = {
    isOpen: false,
    lang: 'en-US',
  };
  statusUpdateHandler = (val) => {
    if(val === 'start') this.props.startListening();
    else if (val === 'pause') this.props.stopListening();
  }
  langUpdateHandler = (val) => {
    this.props.resetTranscript();
    this.setState({lang: val})
  }
  toggleCollapse = () => { 
      this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    if(this.props.recognition){
      this.props.recognition.lang = this.state.lang;
      }
      if (!this.props.browserSupportsSpeechRecognition) {
        return null
      }
    return (
      <BrowserRouter>
      <div className="App">
      <Navbar color="indigo" dark expand="md">
          <NavbarBrand>
            <strong className="white-text">BookmanIndia</strong>
          </NavbarBrand>
          <NavbarToggler
            onClick={this.toggleCollapse}
          />
          <Collapse
            id="navbarCollapse3"
            isOpen={this.state.isOpen}
            navbar
          >
            <NavbarNav right>
              <NavItem className= {indexStyle.Navit} active>
              <NavLink to="" onClick={() => this.statusUpdateHandler('start')}>Start</NavLink>
              </NavItem>
              <NavItem className= {indexStyle.Navit} active>
              <NavLink to="" onClick={() => this.statusUpdateHandler('pause')}>Pause</NavLink>
              </NavItem>
              <NavItem className= {indexStyle.Navit} active>
              <NavLink to="" onClick={() => this.langUpdateHandler('hi-IN')}>Hindi</NavLink>
              </NavItem>
              <NavItem className= {indexStyle.Navit} active>
              <NavLink to="" onClick={() => this.langUpdateHandler('en-US')}>English</NavLink>
              </NavItem>
              <NavItem className= {indexStyle.Navit} active>
              <NavLink to="" onClick={this.props.resetTranscript}>Reset</NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
      </Navbar>
        <MDBContainer>
        <div className="text-center my-4"><img style={{width:"100px"}} src={img} alt="Logo"/><br /><h2 className="my-2">Bookman India Write Easy</h2></div>
        <MDBRow>
          <MDBCol>
          <textarea className="form-control" value={this.props.transcript} rows='12' placeholder="Press the start button and speak to show here..."/>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = propTypes
export default SpeechRecognition(options)(App);