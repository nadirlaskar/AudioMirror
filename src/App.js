import React, { useEffect, useState } from "react";
import "./App.css";
import AudioMirror from "./AudioMirror";

const hasHeadsetCheck = (callback) => {
  const updateDevices = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        return navigator.mediaDevices.enumerateDevices().then(function (devices) {
          // check to see if we have any device with "head" in its name connected
          // like "headset" or "headphones"
          let headphonesConnected = devices
            .filter((device) => /audio\w+/.test(device.kind))
            .find((device) => device.label.toLowerCase().includes("head"));
          if (headphonesConnected) {
            callback(true);
          } else {
            callback(false);
          }
        });
      }).catch(() => callback(false));
  };
  updateDevices();
  // add an ondevicechange event listener so we can tell when
  // an input device is connected and disconnected
  navigator.mediaDevices.ondevicechange = updateDevices;
};

function App() {
  const [hasHeadset, setHasHeadset] = useState(null);
  useEffect(
    () =>
      hasHeadsetCheck((flag) => {
        setHasHeadset(flag);
      }),
    []
  );
  const shoudUseHeadsetUI = (
    <h3>
      {hasHeadset === false
        ? "Please use a headphone to use this application."
        : hasHeadset == null
        ? "Checking headphone..."
        : "Try saying - I am IronMan!"}
    </h3>
  );
  return (
    <div className="App">
      <header className="App-header">
        <h1>Audio Mirror - Test your mic !</h1>
        {shoudUseHeadsetUI}
        <div className={["App-logo", hasHeadset ? " active" : ""].join("")} alt="logo" />
        <p>This site needs audio permission</p>
        <a
          className="App-link"
          href="https://github.com/nadirlaskar/AudioMirror/blob/master/README.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </header>
      <AudioMirror hasHeadset={hasHeadset}></AudioMirror>
    </div>
  );
}

export default App;
