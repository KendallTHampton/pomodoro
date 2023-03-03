import React, {useEffect, useReducer} from "react";
import Context from "./Context";

const modalInitialState = {
    isModalOpen: false,
    isSettingsModalOpen: false,
    isHelpModalOpen: false,
    isColorModalOpen: false,
};

const whichModalReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_SETTINGS_MODAL":
            return {
                ...state,
                isModalOpen: !state.isModalOpen,
                isSettingsModalOpen: !state.isSettingsModalOpen,
            };
        case "TOGGLE_HELP_MODAL":
            return {
                ...state,
                isModalOpen: !state.isModalOpen,
                isHelpModalOpen: !state.ishelpModalOpen,
            };
        case "TOGGLE_COLOR_MODAL":
            return {
                isModalOpen: true,
                isHelpModalOpen: false,
                isSettingsModalOpen: true,
                isColorModalOpen: !state.isColorModalOpen,
            };
        case "TOGGLE_CLOSE_MODAL":
            if (state.isColorModalOpen)
                return {
                    isModalOpen: true,
                    isHelpModalOpen: false,
                    isSettingsModalOpen: true,
                    isColorModalOpen: false,
                };
            return {
                isModalOpen: false,
                isHelpModalOpen: false,
                isSettingsModalOpen: false,
                isColorModalOpen: false,
            };
        default:
            throw new Error("Invalid Action");
    }
};

const userSettingsInitialState = {
    focusTime: "25",
    breakTime: "5",
    longBreakTime: "15",
    cycles: "4",
    currentMode: "focus",
    changeColorOf: "focus",
    colors: {
        focus: "#215385",
        break: "#e99324",
        longBreak: "#08b598",
    },
};

const userSettingsReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_USER_SETTINGS":
            return {
                ...state,
                ...action.payload,
            };
        default:
            throw new Error("Invalid Action");
    }
};

const DataProvider = ({children}) => {
    const [modal, dispatchWhichModal] = useReducer(
        whichModalReducer,
        modalInitialState
    );

    const [userSettings, dispatchUserSettings] = useReducer(
        userSettingsReducer,
        userSettingsInitialState
    );


    useEffect(() => {
        const storedSettings = JSON.parse(localStorage.getItem("userSettings"));
        if (storedSettings) {
            if (storedSettings.focusTime === '' || storedSettings.focusTime === null) storedSettings.focusTime = '25'
            if (storedSettings.breakTime === '' || storedSettings.breakTime === null) storedSettings.breakTime = '5'
            if (storedSettings.longBreakTime === '' || storedSettings.longBreakTime === null) storedSettings.longBreakTime = '15'
            if (storedSettings.cycles === '' || storedSettings.cycles === null) storedSettings.cycles = '4'
        }

        if (storedSettings) {
            dispatchUserSettings({
                type: "UPDATE_USER_SETTINGS",
                payload: storedSettings,
            });
        } else
            dispatchUserSettings({
                type: "UPDATE_USER_SETTINGS",
                payload: userSettingsInitialState,
            });
    }, []);

    const updateSettings = (data) => {
        if (data) {
            dispatchUserSettings({
                type: "UPDATE_USER_SETTINGS",
                payload: data,
            });
        }
        localStorage.setItem("userSettings", JSON.stringify(userSettings));
    };

    return (
        <Context.Provider
            value={{modal, dispatchWhichModal, userSettings, updateSettings}}>
            {children}
        </Context.Provider>
    );
};

export default DataProvider;
