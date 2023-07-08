
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay =  document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');
let cnt = [0,0,0,0,0,0];
let songs = [
    {songName : 'Iridescent', filepath: "song/1.mp3", coverPath: "covers/1.jpg"},
    {songName : 'Given Up', filepath: "song/2.mp3", coverPath: "covers/2.jpg"},
    {songName : 'Somewhere I Belong', filepath: "song/3.mp3", coverPath: "covers/3.png"},
    {songName : 'New Divide', filepath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName : 'Castle Of Glass', filepath: "song/5.mp3", coverPath: "covers/5.jpg"},
    {songName : 'Final Masquerade', filepath: "song/6.mp3", coverPath: "covers/6.jpg"}
]
songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText  = songs[i].songName;
})
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlayy')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlayy')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        cnt[songIndex-1] +=1;
        if(cnt[songIndex-1] === 1){
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else{
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            cnt[songIndex-1] = 0;
        }
    })
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex === 1){
        songIndex = 6;
    }
    else songIndex -= 1;    
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex === 6){
        songIndex = 1;
    }
    else songIndex += 1;    
    audioElement.src = `song/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})