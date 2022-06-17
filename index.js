const btnArrowUp = document.querySelector('.arrow-up')

btnArrowUp.addEventListener('click', ()=>{
  window.scrollTo({top: 0, left:0, behavior:"smooth"})
})

const btnMusic = document.querySelector('.music-icons')
const iconMusic = document.querySelector('.music-icons>img')
const song = document.querySelector('#music')

btnMusic.addEventListener('click', ()=>{
  if(song.paused) {
    song.play()
    iconMusic.src = "./public/pause.png"
  }
  else{
    song.pause()
    iconMusic.src = "./public/play.png"
  }
})
