const musicDir = '/src/assets/music/'
class AudioService {
  private tip1 = new Audio(musicDir + 'tip1.mp3')
  private tip2 = new Audio(musicDir + 'tip2.mp3')
  // private tip3 = new Audio(musicDir + 'tip3.mp3')

  constructor(){}
  public start(){
    this.tip2.play()
  }
  public over(){
    this.tip1.play()
  }
}
const audio = new AudioService()
export default () => {
  return {audio}
}
