'use strict'

const { h1, p, button } = require('@emphori/fui-html')

;(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false
    }
  })

  const audioCtx = new AudioContext()
  const gainNode = audioCtx.createGain()

  // Create a source from the recieved microphone stream
  const source = audioCtx.createMediaStreamSource(stream)

  // Send the source input to the gain node
  source.connect(gainNode)
  
  // Send the gain node output to the audio destination
  gainNode.connect(audioCtx.destination)

  let muted = false
  
  const gainControl =
    button.text('Tap to mute').prop('onclick', (evt) => {
      if (muted) {
        gainNode.gain.value = 1
        evt.target.innerHTML = 'Tap to mute'
      } else {
        gainNode.gain.value = 0
        evt.target.innerHTML = 'Tap to unmute'
      }

      muted = !muted
    })

  document.body.appendChild(gainControl())
})()

