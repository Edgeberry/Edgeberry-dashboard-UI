import logo from '../Edgeberry_logo_text.png';

function Home() {
  return (
    <div className="App App-dark">
      <div className="App-centered">
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <p style={{fontSize:'calc(10px + 2vmin)'}}>
          Kickstart your connected device adventure
        </p>
      </div>
    </div>
  );
}

export default Home;
