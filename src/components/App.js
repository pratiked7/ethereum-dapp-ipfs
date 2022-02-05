import React, { useEffect, useState } from 'react';
//import logo from '../logo.png';
import './App.css';
import {create} from "ipfs-http-client";
import Web3 from "web3";

const ipfs = create("https://ipfs.infura.io:5001/api/v0");


const App = () => {

  useEffect(() => {
    loadWeb3();
  }, []);

  const [imageBuffer, setImageBuffer] = useState(null);
  const [imageUrl, setImage] = useState("https://ipfs.infura.io/ipfs/QmRtumqmm52d6rTEjyjupuuz2xVadUyT9ocRhWWB7TS3xB");
  const [ethAccount, setEthAccount] = useState();

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setEthAccount(accounts[0]);
  }

  const loadWeb3 = async () => {
    
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      //await window.ethereum.sendAsync("eth_requestAccounts");
      await loadBlockchainData();
    } else if (window.web3) {
      //window.web3 = new Web3(window.web3.currentProvider);
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Please use metamask!")
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {

      const createdFile = await ipfs.add(imageBuffer);
      const url = `https://ipfs.infura.io/ipfs/${createdFile.path}`;
      console.log(url);
      setImage(url);

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
      setImageBuffer(Buffer(reader.result));
    }
  }

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="navbar-brand col-sm-3 col-md-2 mr-0">
          Meme
        </div>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
            <img src={imageUrl} className="App-logo" alt="logo" />
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
