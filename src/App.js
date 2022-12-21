import {useState} from 'react';
import './App.css';
import Pomodoro from './components/Pomodoro';
import Settings from './components/Settings';

function App() {

  const [showSettings, setShowSettings] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [userSettings, setUserSettings] = useState([])


  const toggleModal = () => {
    setShowSettings(!showSettings)
  }


  const settingsChangeHandler = (data) => {
    setShowSettings(false)
    setIsActivated(true)
    setUserSettings(data)
  }


  let settingsMessage;
  if (!isActivated) {
    settingsMessage = <p>Click Me To Configure Your Pomodoro Session!</p>
  }

  if (isActivated) {
    settingsMessage = <p>Change Settings</p>
  }




  return (
    <div className="main">

      {!isActivated && <h1 className='title'>Pomodoro Timer</h1>}


      {isActivated &&
        <Pomodoro
          userSettings={userSettings}
        />
      }

      {showSettings &&
        <Settings
          toggleModal={toggleModal}
          onSubmit={settingsChangeHandler}
        />
      }

      <button className='settings-button' onClick={toggleModal}>{settingsMessage}</button>

    </div>
  );
}

export default App;
