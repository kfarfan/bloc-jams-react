import React, { Component } from 'react';
import albumData from './../data/albums';
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
  	  album: album
  	};
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover art" />
          <div className = "album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody className="songBodyList">
          {
            this.state.album.songs.map( ( song, index) =>
            <tbody key={index} >
            <tr>
            <button>
            <span class="ion-play"></span>
            <span class="ion-pause"></span>
            </button>
            <td className="song-number">{index + 1}</td>
            <td className="song-title">{song.title}</td>
            <td className="song-duration">{song.duration}</td>
            </tr>
            </tbody>
            )
          }
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
