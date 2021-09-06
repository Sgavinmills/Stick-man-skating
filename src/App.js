import Background from './Components/Background';
import './App.css';
import Skater from './Components/Skater';
import CrashMessage from './Components/CrashMessage';

import { useState } from "react";



function App() {

  const [theSkater, setTheSkater] = useState({
    isSkatingNormally: false,
    inManual: false,
    inNoseManual: false,
    isTrickReady: false,
    isCrashed: false,
    isStationary: true,
    isInAir: false,
    isLeftWheelDown: false,
    isRightWheelDown: false,
    mostRecentManual : 'none', //using this to determine which transform origin style is applied to the stickman container
    lastTrickTime : { ollie : 0 }
  })

  const [crashMessage, setCrashMessage] = useState('example crash message');

  return (
    <div className="App">
      <CrashMessage crashMessage={crashMessage} />
      <Background theSkater={theSkater}/>
      <Skater theSkater={theSkater} setTheSkater={setTheSkater} setCrashMessage={setCrashMessage}/>
    </div>
  );
}

export default App;
