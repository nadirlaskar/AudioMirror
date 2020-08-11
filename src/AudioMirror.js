import React, { useEffect, useRef } from "react";
/**
 * Setup audio recording
 * @param {Audio} audio 
    Connect the media stream to the audio element
    returns the recorded audio via 'audio' tag
 */
const setupAudio = (audio) => {
  let audioIN = {
    audio: true,
  };
  //  audio is true, for recording

  // Access the permission for use
  // the microphone
  navigator.mediaDevices
    .getUserMedia(audioIN)
    // 'then()' method returns a Promise
    .then(function (mediaStreamObj) {
      // 'srcObject' is a property which
      // takes the media object
      // This is supported in the newer browsers
      if ("srcObject" in audio) {
        audio.srcObject = mediaStreamObj;
      } else {
        // Old version
        audio.src = window.URL.createObjectURL(mediaStreamObj);
      }

      // It will play the audio
      audio.onloadedmetadata = function (ev) {
        // Play the audio in the 2nd audio
        // element what is being recorded
        audio.play();
      };
    })

    // If any error occurs then handles the error
    .catch(function (err) {
      console.log(err.name, err.message);
    });
};

export default ({hasHeadset}) => {
  const audio = useRef();
  useEffect(() => {
    if (audio.current !== null && hasHeadset) {
      setupAudio(audio.current);
    }
  }, [audio, hasHeadset]);
  return <audio ref={audio}></audio>;
};
