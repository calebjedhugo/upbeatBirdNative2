import Instrument from './Instrument'

export default class DrumLogic extends Instrument{
  constructor(props){
    super({
      sounds: ['drum16thbeat', 'drumupbeat']
    })
    this.mode = props.mode
    this.subDivTripper = {sixteenth: true, eighth: true}
    this.lastPerc = 0
    this.prevObj = {}
  }

  play = async (jumpPerc) => {
    let mode = this.mode
    switch(mode){
      case "straight":
        if(jumpPerc >= 0.5 && this.subDivTripper.sixteenth){
          this.subDivTripper.sixteenth = false;
          this.realPlay('drum16thbeat')
        }
        else if(jumpPerc <= 0.5 && !this.subDivTripper.sixteenth){
          this.subDivTripper.sixteenth = true;
          this.realPlay('drum16thbeat')
        }
        break;
      case "triplets":
        if(jumpPerc >= 2/3 && this.subDivTripper.sixteenth){
          this.subDivTripper.sixteenth = false;
          this.realPlay('drumupbeat')
        }
        else if(jumpPerc <= 2/3 && !this.subDivTripper.sixteenth){
          this.subDivTripper.sixteenth = true;
          this.realPlay('drum16thbeat')
        }
        break;
      case "swing":
        if(jumpPerc >= 2/3 && this.subDivTripper.sixteenth){
          this.subDivTripper.sixteenth = false;
          this.realPlay('drumupbeat')
        }
        else if(jumpPerc <= 1/3 && !this.subDivTripper.sixteenth){
          this.subDivTripper.sixteenth = true;
          this.realPlay('drum16thbeat')
        }
        break;
      default:
        console.log("\"" + mode + "\" is not a valid option." )
    }
    if(jumpPerc < this.lastPerc && mode !== 'triplets' && this.subDivTripper.eighth){
      this.subDivTripper.eighth = false
      this.realPlay('drumupbeat')
    }
    if(jumpPerc > this.lastPerc){
      this.subDivTripper.eighth = true
    }
    this.lastPerc = jumpPerc
  }
}
