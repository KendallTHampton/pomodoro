import React, {useState, useReducer} from "react";
import Context from "./Context";


const whichModalInitialState = {
    isModalOpen: false,
    isSettingsModalOpen: false,
    isHelpModalOpen: false,
    isColorModalOpen: false,
}

const whichModalReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_SETTINGS_MODAL':
            return {
                ...state,
                isModalOpen: !state.closeModal,
                isSettingsModalOpen: !state.settingsModal,
            }
        case 'TOGGLE_HELP_MODAL':
            return {
                ...state,
                isModalOpen: !state.closeModal,
                isHelpModalOpen: !state.helpModal,
            }
        case 'TOGGLE_COLOR_MODAL':
            return {
                isHelpModalOpen: false,
                isSettingsModalOpen: true,
                isModalOpen: !state.closeModal,
                isColorModalOpen: !state.colorModal,
            }
        case 'TOGGLE_CLOSE_MODAL':
            if (state.isColorModalOpen) {
                return {
                    isModalOpen: true,
                    isSettingsModalOpen: true,
                    isHelpModalOpen: false,
                }
            } else {
                return {
                    isModalOpen: false,
                    isSettingsModalOpen: false,
                    isHelpModalOpen: false,
                    isColorModalOpen: false,
                }
            }


        default:
            throw new Error('Invalid Action')
    }
}


const DataProvider = ({children}) => {
    // Modal Controls
    const [whichModal, dispatchWhichModal] = useReducer(whichModalReducer, whichModalInitialState)


    const [userSettings, setUserSettings] = useState({
        focusTime: 25,
        breakTime: 5,
        longBreakTime: 15,
        cycles: 4,
        currentMode: 'focus',
        changeColorOf: '',
        colors: {
            focus: '#215385',
            break: '#e99324',
            longBreak: '#08b598',
        }
    })

    const updateSettings = (data) => {
        if (data) {
            setUserSettings(prevState => ({
                ...prevState,
                ...data
            }))

        }
    }



    // User Settings Controls

    return (
        <Context.Provider value={{whichModal, dispatchWhichModal, userSettings, updateSettings}}>
            {children}
        </Context.Provider>
    )
}


export default DataProvider