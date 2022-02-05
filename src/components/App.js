import React, { useState } from 'react';
import logo from '../logo.png';
import './App.css';
import {create} from "ipfs-http-client";

const ipfs = create("https://ipfs.infura.io:5001/api/v0");


const App = () => {

  const [imageBuffer, setImage] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {

      const createdFile = await ipfs.add(imageBuffer);
      const url = `https://ipfs.infura.io/ipfs/${createdFile.path}`;
      console.log(url);

    } catch (error) {
      console.log(error);
    }
  }


  const captureFile = (event) => {
    event.preventDefault();
    console.log("File captured");

    //process file
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setImage(Buffer(reader.result));
    }
  }

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meme
        </a>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} className="App-logo" alt="logo" />
              </a>
              <p>&nbsp;</p>
              <h2>Change Image</h2>
              <form onSubmit={onSubmit}>
                <input type="file" onChange={captureFile}/>
                <button type="submit">Submit</button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}



export default App;
