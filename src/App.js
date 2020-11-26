import React, {Component} from'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import './App.css';

const particlesOptions = {
    particles: {
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        }
      }
    }
  }

const app = new Clarifai.App({
  apiKey: '84306435a3174fb6b07d7e68333329cb'
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    console.log('click')
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input).then(
      response =>  this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  render() {
      return (
        <div className="App">
          <Particles className='particles'
                params={particlesOptions} />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          { this.state.route === 'home' 
            ? <div>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
              </div>
            : (
                this.state.route === 'signin' 
                ? <Signin onRouteChange={this.onRouteChange} />
                : <Register onRouteChange={this.onRouteChange} />
            )
          }
        </div>
      );
    }
}

export default App;
