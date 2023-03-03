import React, {useEffect, useState, useContext} from "react";
import "./Pomodoro.css"
import Context from "../store/Context";
import {SettingsOutlined} from "@mui/icons-material";


const Pomodoro = () => {
    const {userSettings, dispatchWhichModal, updateSettings, } = useContext(Context)
    const {focusTime, breakTime, longBreakTime, colors, currentMode} = userSettings
    const [timer, setTimer] = useState(focusTime * 60);
    const modes = ['Focus', 'Break', 'LongBreak']

    useEffect(() => {
        setTimer(focusTime * 60)
    }, [focusTime])


    const [pomodoroActive, setPomodoroActive] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [current, setCurrent] = useState('Focus')

    const startPomodoro = () => {
        setPomodoroActive(true)
        setIsPaused(!isPaused)
    }


    useEffect(() => {
        let interval = null
        if (pomodoroActive && !isPaused) {
            interval = setInterval(() => setTimer(time => time - 1), 1000)
        }
        else clearInterval(interval);

        if (onBreak === false && timer === 0) {
            setOnBreak(true)
            setCurrent('Break')
            setTimer(breakTime * 60)
        }

        if (onBreak === true && timer === 0) {
            setOnBreak(false)
            setPomodoroActive(false)
            setTimer(focusTime * 60)
        }
        return () => clearInterval(interval);
    }, [pomodoroActive, isPaused, timer, breakTime, focusTime, onBreak])


    const resetPomodoro = () => {

        updateSettings({
            currentMode: 'focus'
        })

        setCurrent('Focus')
        setIsPaused(true)
        setPomodoroActive(false)
        setOnBreak(false)

        setTimer(focusTime * 60)
    }

    const currentTime = `${ Math.floor(timer / 60).toString().padStart(2, '0') }:${ Math.floor(timer % 60).toString().padStart(2, '0') }`

    const modeChangeHandler = (e) => {
        setCurrent(e.target.innerText)

        if (e.target.innerText === 'Focus') {
            setTimer(focusTime * 60)
            updateSettings({
                currentMode: 'focus'
            })
        }
        if (e.target.innerText === 'Break') {
            setTimer(breakTime * 60)
            updateSettings({
                currentMode: 'break'
            })
        }
        if (e.target.innerText === 'LongBreak') {
            setTimer(longBreakTime * 60)
            updateSettings({
                currentMode: 'longBreak'
            })
        }

    }


    return (
        <div className="pomodoro-container">
            <div className="pomodoro-container-glass"
                style={{
                    boxShadow: `inset 0 0 2000px 1000px rgba(0,0,0,0.45)`,
                    opacity: "40%"
                }}
            ></div>
            <div className="modes">
                {modes.map((mode, index) => {
                    return (
                        <h1 key={index} className={mode === current ? 'mode-text active' : 'mode-text'}
                            onClick={modeChangeHandler}
                        >
                            {mode}
                        </h1>
                    )
                })}
            </div>
            <div className="time-display" >
                <h1>{currentTime}</h1>
            </div>
            <div className="pomodoro-actions">
                <button className={`settings-button start-button ${ !isPaused && 'active' }`}
                    onClick={startPomodoro}
                    style={{
                        color: `${ colors[currentMode] }`,
                        transition: 'color 0.5s ease-in-out'
                    }}
                >
                    {isPaused ? 'START' : 'PAUSE'}
                </button>
                <button className="settings-button stop-button" onClick={resetPomodoro}>Reset</button>
                <button
                    className='settings-button'
                    onClick={() => dispatchWhichModal({type: 'TOGGLE_SETTINGS_MODAL'})}
                >
                    <SettingsOutlined
                        style={{
                            color: 'gray',
                        }}
                    />
                    Settings
                </button>

            </div>
        </div>

    );
};

export default Pomodoro;
