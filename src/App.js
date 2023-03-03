import {useContext, useEffect} from 'react';
import './App.css';
import Pomodoro from './components/Pomodoro';
import Context from "./store/Context"
import HelpIcon from '@mui/icons-material/Help';
import Modal from './ui/Modal';



function App() {
  const {dispatchWhichModal, userSettings} = useContext(Context)


  const {colors, currentMode} = userSettings;


  useEffect(() => {
    localStorage.getItem('userSettings') && dispatchWhichModal({type: 'TOGGLE_CLOSE_MODAL'})
  }, [dispatchWhichModal])



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
