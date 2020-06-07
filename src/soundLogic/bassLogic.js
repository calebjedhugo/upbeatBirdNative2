import Sound from 'react-native-sound'

export default class BassLogic{
  constructor(props){
    this.bassNote = 5;
    this.offset = this.randomIdx([0,1,2,3,4,5,6])
    this.primed = false
    this.sounds = {
      bass1: undefined, bass2: undefined, bass3: undefined, bass4: undefined,
      bass5: undefined, bass6: undefined, bass7: undefined, bass8: undefined,
      bass9: undefined, bass10: undefined, bass11: undefined, bass12: undefined,
      bass13: undefined, bass14: undefined, bass15: undefined, bass16: undefined,
      bass17: undefined, bass18: undefined, bass19: undefined, bass20: undefined,
      bass21: undefined
    }
    this.primeSounds()
  }

  play = () => {
    this.sounds[this.bassLogic()].play()
  }

  // returns the name of a file that will sound nice based on what came before.
  bassLogic = () => {
      //translate the last note played to a scale degree
      let bassNote = this.bassNote;
      let currentScaleDegree = ((bassNote + 1 + this.offset) % 7) + 1
      let newScaleDegree;
      let randomIdx = this.randomIdx;
      switch(currentScaleDegree){
          case 1:
              newScaleDegree = randomIdx([1,2,3,4,5,6,7]);
              break;
          case 2:
              newScaleDegree = randomIdx([4,5,6]);
              break;
          case 3:
              newScaleDegree = randomIdx([1,5,7]);
              break;
          case 4:
              newScaleDegree = randomIdx([2,5,6]);
              break;
          case 5:
              newScaleDegree = randomIdx([1,7,2]);
              break;
          case 6:
              newScaleDegree = randomIdx([1,2,3,4,5,7]);
              break;
          case 7:
              newScaleDegree = randomIdx([1,2,5,6]);
              break;
          default:
              newScaleDegree = randomIdx([1,2,3,4,5,6,7]);
              break;
      }

      var changeAmounts = [newScaleDegree - currentScaleDegree,
                          newScaleDegree - currentScaleDegree + 7,
                          newScaleDegree - currentScaleDegree - 7];
      var finalAmount

      //find the shortest distance without simply making the number positive!
      //(I bet there's a better way to do this, I'm just not seeing it right now)
      if(Math.min(Math.abs(changeAmounts[0]), Math.abs(changeAmounts[1])) === Math.abs(changeAmounts[0]))
          finalAmount = changeAmounts[0]
      else
          finalAmount = changeAmounts[1]

      if(Math.min(Math.abs(finalAmount), Math.abs(changeAmounts[2])) === Math.abs(changeAmounts[2]))
          finalAmount = changeAmounts[2];

      bassNote += finalAmount;

      //make sure we're within the range of the instrument.
      if(bassNote < 1) bassNote += randomIdx([7,14]);
      else if(bassNote > 21) bassNote -= randomIdx([7,14]);
      return "bass" + bassNote;
  }

  randomIdx(theArray){
      return theArray[Math.floor(theArray.length * Math.random())];
  }

  primeSounds = () => {
    for(let sound in this.sounds){
      this.sounds[sound] = new Sound(`sounds/${sound}.mp3`, Sound.MAIN_BUNDLE, e => {
        if(e) console.log(e)
      })
    }

    this.primed = true
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
