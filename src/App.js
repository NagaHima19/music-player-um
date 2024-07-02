import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  const getTracks = async () => {
    setIsLoading(true);
    let data = await fetch(
      `https://v1.nocodeapi.com/himamaddineni/spotify/TRjTqDoLAEQVTAKz/search?type=track&q=${keyword===""?"trending":keyword}`
    );
    let convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items);
    setIsLoading(false);
  };

  const handlePlay = (audio) => {
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setCurrentAudio(audio);
    audio.play();
  };



  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            My Music App
          </a>
          
          <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className={`row ${keyword==="" ? "": "d-none"}`}>
          <div className="col-12 py-5 text-center">
          <h1>MY MUSIC</h1>

          </div>
        </div>
        <div className="row">
          {
            tracks.map((element) => (
              <div className="col-lg-3 col-md-4 py-2" key={element.id}>
                <div className="card">
                  <img src={element.album.images[0].url} className="card-img-top" alt="Album cover" />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      Artist: {element.album.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release date: {element.album.release_date}
                    </p>
                    <audio
                      src={element.preview_url}
                      controls
                      className="w-100"
                      onPlay={(e) => handlePlay(e.target)}
                    ></audio>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </>
  );
}

export default App;
