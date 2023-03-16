import { Component } from "react";
import trey from './img/trey.jpeg';
import nate from './img/nate.jpeg';

class About extends Component {

  render() {
    return (
      <>
        <h2>About The Bookworms</h2>
        <h4>Bookworm #1: Trey Young</h4>
        <img src={trey} alt="Bookworm Trey" />
        <p><a href="https://github.com/goodpudding">James Young(Goodpudding) @ GitHub</a></p>
        <h4>Bookworm #2: Nate Brown</h4>
        <img src={nate} alt="Bookworm Nate" />
        <p><a href="https://github.com/nate-brown-1">Nate Brown @ GitHub</a></p>
      </>
  )
  }
};

export default About;
