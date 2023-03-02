import {useContext, useState} from 'react';
import './App.css';
import Media from './components/Media';
import Pomodoro from './components/Pomodoro';
import Settings, {SettingsModal} from './components/Modals/SettingsModal';
import {SettingsOutlined} from '@mui/icons-material';
import Context from "./store/Context"
import HelpIcon from '@mui/icons-material/Help';
import Modal from './ui/Modal';
import {color} from '@mui/system';


function App() {

  const {whichModal, dispatchWhichModal, userSettings, updateSettings} = useContext(Context)

  const {colors, currentMode} = userSettings


  return (
    <div className="main"
      style={{
        backgroundColor: `${ colors[currentMode] }`,
        transition: 'background-color 0.5s ease-in-out'
      }}
    >
      <header className='header'>
        <h1 className='title'>Pomodoro Timer</h1>
        <HelpIcon
          onClick={() => dispatchWhichModal({type: 'TOGGLE_HELP_MODAL'})}
          sx={{
            fontSize: 18,
            color: 'white',
            cursor: 'pointer',
            '&:hover': {
              color: 'gray'
            }
          }}
        />
      </header>
      <Pomodoro />
      <Modal />
    </div>
  );
}

export default App;
