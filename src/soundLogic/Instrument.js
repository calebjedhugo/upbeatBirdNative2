import Sound from 'react-native-sound'
Sound.setCategory('Playback')

export default class Instrument {
  constructor(props){
    let {sounds} = props //An array of names of files without the '/sounds' or '.mp3'
    this.sounds = {}
    this.primed = false
    sounds.forEach(elem => {
      this.sounds[elem] = {sounds: [], nextIndex: 0}
    })
    this.primeSounds()
  }

  //Make three copies of each sound so that they are more responsive.
  primeSounds = () => {
    for(let sound in this.sounds){
      for(let i = 0; i < 3; i++){
        this.sounds[sound].sounds[i] = new Sound(`sounds/${sound}.mp3`, Sound.MAIN_BUNDLE, e => {
          if(e) return console.log(e)
        })
      }
    }
    this.primed = true
  }

  realPlay = sound => {
    let {nextIndex} = this.sounds[sound]
    let srcLength = this.sounds[sound].sounds.length
    this.sounds[sound].sounds[nextIndex].play()
    this.sounds[sound].sounds[(nextIndex - 1 + srcLength) % srcLength].stop()
    this.sounds[sound].nextIndex = (nextIndex + 1) % srcLength
  }

  ready = async () => {
    return new Promise(resolve => {
      if(this.primed) resolve()
      else{
        this.primedWait = setInterval(() => {
          if(this.primed){
            clearInterval(this.primedWait)
            resolve()
          }
        }, 500)
      }
    })
  }
}
