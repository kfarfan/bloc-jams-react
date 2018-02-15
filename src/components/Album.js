import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
//** Original function for Album page **
// const Album = () => (
//   <section className="album">
//     Album info listed here
//   </section>
// );

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
  	  return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      volume: 1,
      duration: album.songs[0].duration,
      isPlaying: false,
      className: undefined
  	};
     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
  }

   play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
}

   componentDidMount() {
      this.eventListeners = {
   timeupdate: e => {
     this.setState({ currentTime: this.audioElement.currentTime });
   },
   durationchange: e => {
     this.setState({ duration: this.audioElement.duration });
   }
 };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   }

  componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
}


  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
}
  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
       this.pause();
       this.setState({ className: "ion-play"});
       song.fakein = ''
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
       this.setState({ className: "ion-pause"});
       song.fakein = ''
     }
 }

  handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
    }

  handleVolumeChange(e) {
      const newVolume = e.target.value/100;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume});
  }

 handlePrevClick() {
   console.log("prev");
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex - 1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play(newSong);
}

formatTime(time){

    return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2,3)}` : '-:--'
  }

handleNextClick() {
  console.log('next');
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex + 1);
  // to stop the player from crashing by hitting an undefined song, we set an if statement saying "if the newIndex is equal to the array.length aka 1 index higher than the end point, then we will just play the last song"
  if( newIndex === this.state.album.songs.length){
    // newSong will be the array of songs - 1 for the last song
    const newSong = this.state.album.songs.length-1;
    // play the song
    this.setSong(newSong);
    this.play(newSong);
    // if the song isn't the last song in the array we will play the next song,
  } else {
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play(newSong);
}

}



 render() {
      return (
        <section className="album">
          <section id="album-info">
            <img id="album-cover-art" src={this.state.album.albumCover} />
            <div className="album-details">
              <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.year} {this.state.album.label}</div>
            </div>
          </section>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody className="tbody" align="center">
              {this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                  <td className="song-actions">
                    <button>
                    <span className={this.state.currentSong === song && this.state.isPlaying? 'ion-pause' : 'ion-play'}></span>

                      <span className={this.className}>{song.fakein}</span>
                      <span className="ion-play"></span>
                      <span className="ion-pause"></span>
                    </button>
                  </td>
                  <td className="song-title">{song.title}</td>
                  <td className="song-duration">{song.duration}</td>
                </tr>
              )}
            </tbody>
          </table>
          <section className="player-bar">
          <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentVolume={this.audioElement.currentVolume}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick()}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(time) => this.formatTime(time)}
         />
          </section>
        </section>
      );
    }
  }

export default Album;
