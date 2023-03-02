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
    // const [color, setColor] = useState('#07c800')
    // useEffect(() => {
    //     function redToGreen(percentage) {
    //         var r = 10, g, b = 0
    //         if (timer === 0) {
    //             r = 10
    //             g = 0
    //             b = 0
    //         }
    //         if (percentage < 50) {
    //             r = 255
    //             g = Math.round(5.10 * percentage)

    //         } else {
    //             g = 245
    //             r = r += Math.round(500 - 5.10 * percentage)
    //         }
    //         var h = r * 0x10000 + g * 0x100 + b * 0x3
    //         return '#' + ('000000' + h.toString(16)).slice(-6)
    //     }

    //     function hexToRGB(h) {
    //         let r = 0, g = 0, b = 0, a = .7;


    //         if (h.length === 4) {
    //             r = "0x" + h[1] + h[1];
    //             g = "0x" + h[2] + h[2];
    //             b = "0x" + h[3] + h[3];


    //         } else if (h.length === 7) {
    //             r = "0x" + h[1] + h[2];
    //             g = "0x" + h[3] + h[4];
    //             b = "0x" + h[5] + h[6];
    //         }

    //         return "rgb(" + +r + "," + +g + "," + +b + "," + +a + ")";
    //     }

    //     let percent;
    //     if (!onBreak) {
    //         percent = (timer / (focusTime * 60) * 100)
    //         setColor(hexToRGB(redToGreen(percent)))
    //     }
    //     if (onBreak) setColor('#a2a2a2')


    // }, [color, timer, focusTime, breakTime, onBreak])
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
