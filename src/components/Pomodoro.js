import React, {useEffect, useState} from "react";


const Pomodoro = (props) => {

    const [focusTime, setFocusTime] = useState(props.userSettings[0])
    const [breakTime, setBreakTime] = useState(props.userSettings[1])
    const [timer, setTimer] = useState(focusTime * 60);


    useEffect(() => {
        setFocusTime(props.userSettings[0])
        setBreakTime(props.userSettings[1])
        setTimer(focusTime * 60)

    }, [props.userSettings, focusTime])


    const [pomodoroActive, setPomodoroActive] = useState(false);
    const [onBreak, setOnBreak] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

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
            setTimer(breakTime * 60)
        }

        if (onBreak === true && timer === 0) {
            setOnBreak(false)
            setPomodoroActive(false)
            setTimer(focusTime * 60)
        }
        return () => clearInterval(interval);
    }, [pomodoroActive, isPaused, timer, breakTime, focusTime, onBreak])


    let studyOrBreak;
    if (onBreak) studyOrBreak = 'Take A Break!'
    if (!onBreak) studyOrBreak = 'Focus Time!'

    const resetPomodoro = () => {
        setIsPaused(true)
        setPomodoroActive(false)
        setOnBreak(false)
        clearInterval()
        setTimer(focusTime * 60)
    }

    const [color, setColor] = useState('#07c800')

    useEffect(() => {
        function redToGreen(percentage) {
            var r = 10, g, b = 0
            if (timer === 0) {
                r = 10
                g = 0
                b = 0
            }
            if (percentage < 50) {
                r = 255
                g = Math.round(5.10 * percentage)

            } else {
                g = 245
                r = r += Math.round(500 - 5.10 * percentage)
            }
            var h = r * 0x10000 + g * 0x100 + b * 0x3
            return '#' + ('000000' + h.toString(16)).slice(-6)
        }

        function hexToRGB(h) {
            let r = 0, g = 0, b = 0, a = .7;


            if (h.length === 4) {
                r = "0x" + h[1] + h[1];
                g = "0x" + h[2] + h[2];
                b = "0x" + h[3] + h[3];


            } else if (h.length === 7) {
                r = "0x" + h[1] + h[2];
                g = "0x" + h[3] + h[4];
                b = "0x" + h[5] + h[6];
            }

            return "rgb(" + +r + "," + +g + "," + +b + "," + +a + ")";
        }

        let percent;
        if (!onBreak) {
            percent = (timer / (focusTime * 60) * 100)
            setColor(hexToRGB(redToGreen(percent)))
        }
        if (onBreak) setColor('#0d162eef')


    }, [color, timer, focusTime, breakTime, onBreak])


    const currentTime = `${ Math.floor(timer / 60).toString().padStart(2, '0') }:${ Math.floor(timer % 60).toString().padStart(2, '0') }`




    return (
        <div className="pomodoro-container">
            <h2 className="mode">{studyOrBreak}</h2>
            <div className="time-display" style={{backgroundColor: color}}>
                <h1>{currentTime}</h1>
            </div>
            <div className="pomodoro-actions">
                <button className="start-button" onClick={startPomodoro}>Start/Pause</button>
                <button className="stop-button" onClick={resetPomodoro}>Reset</button>
            </div>
        </div>

    );
};

export default Pomodoro;
