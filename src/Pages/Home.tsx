import logo from '../EdgeBerry_Logo_text.svg';

function Home() {
  return (
    <div className="App App-dark">
      <div className="App-centered">
        <img src={logo} className="App-logo" alt="logo" />
        <br/>
        <p style={{fontSize:'calc(10px + 2vmin)', fontWeight:'600'}}>
          Kickstart your connected device adventure
        </p>
        <br/>
        <p style={{fontSize:'calc(7px + 1.4vmin)', paddingRight:"7vw", paddingLeft:"7vw", fontWeight:'500'}}>
        The Edgeberry Project is a dynamic and integrated ecosystem that brings together hardware, software and community 
        resources to empower users and developers in the IoT space. With the Raspberry Pi 
        (or compatible device) and <a href={"https://github.com/SpuQ/Edgeberry-hardware"} target="_blank">Edgeberry Hardware</a> at its core, 
        the Edgeberry platform provides the foundation for building, deploying and managing IoT devices, offering a range of hardware 
        configurations through <a href={"https://github.com/SpuQ/Edgeberry-cartridge-console-can"} target="_blank">Edgeberry Hardware Cartridges</a>, 
        software tools like the online device management platform <a href={"https://edgeberry.io/dashboard"}>Edgeberry Dashboard</a> and 
        publicly available development resources to support a diverse array of applications and use cases.
        </p>
      </div>
    </div>
  );
}

export default Home;
