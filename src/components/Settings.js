import React from 'react'
import {useRef} from 'react'
import ReactDOM from 'react-dom'


const Backdrop = (props) => {
    return (
        <div className="backdrop" onClick={props.onClick}></div>
    )
}


const SettingsModal = (props) => {
    const setStudyTime = useRef(undefined)
    const setBreakTime = useRef(undefined)

    const submitHandler = (e) => {
        e.preventDefault()
        const currentStudyTime = setStudyTime.current.value
        const currentBreakTime = setBreakTime.current.value

        // stores the values of the input fields in the local storage
        props.onSubmit([currentStudyTime, currentBreakTime])

        setStudyTime.current.value = ''
        setBreakTime.current.value = ''

        // Close the modal
        props.onClick()
    }

    return (
        <div className='settings__overlay'>
            <h1>Settings</h1>
            <form onSubmit={submitHandler} className='settings__form'>

                <div className='settings__options'>

                    <label htmlFor='studyTime'>Study Length:

                        <input name='studyTime' type='number' id='studyTime' ref={setStudyTime} min={1} max={120} required />
                        <span>(minutes)</span>
                    </label>

                    <label htmlFor='breakTime'>Break Length:
                        <input name='breakStudy' type='number' id='breakTime' ref={setBreakTime} min={1} max={120} required /> <span>(minutes)</span>
                    </label>
                </div>

                <button type='submit'>Confirm Changes</button>
            </form>
        </div>
    )
}

export default function Settings(props) {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.toggleModal} />,
                document.getElementById("backdrop-root"))
            }

            {ReactDOM.createPortal(
                <SettingsModal
                    onClick={props.toggleModal}
                    onSubmit={props.onSubmit}
                />,
                document.getElementById("overlay-root"))
            }
        </React.Fragment>
    )
}