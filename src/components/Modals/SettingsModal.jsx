import React from "react";
import "./SettingsModal.css";
import {useContext} from "react";
import Context from "../../store/Context";
import {Divider} from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PaletteIcon from "@mui/icons-material/Palette";

const SettingsModal = () => {

    const {userSettings, updateSettings, dispatchWhichModal} =
        useContext(Context);
    const {focusTime, breakTime, longBreakTime, cycles, colors} = userSettings;
    const timer = [focusTime, breakTime, longBreakTime, cycles]


    return (
        <div className='settingsModal'>
            <div className='settingsModal__header'>
                <h4>Settings</h4>
                <DisabledByDefaultIcon
                    className='settingsModal__closeButton'
                    onClick={() => {
                        timer.every(timerNumber => timerNumber > 0) ? dispatchWhichModal({type: 'TOGGLE_CLOSE_MODAL'}) : alert('You did not set the timer correctly. Please set the timer to a number greater than 0.')
                    }}
                >

                </DisabledByDefaultIcon>
            </div>
            <Divider
                sx={{
                    height: "2px",
                    backgroundColor: "#f7f7f7",
                }}
            />

            <div className='settingsModal__body'>
                <form>
                    <div className='category'>
                        <div className='category-header'>
                            <AccessTimeRoundedIcon
                                sx={{
                                    color: "#0fa7a28f",
                                }}
                            />
                            <h4>TIMER</h4>
                        </div>
                        <div className='time-settings-body'>
                            <h4>Time (minutes)</h4>
                            <div className='timerInputs'>
                                <div className='time-settings-inputs'>
                                    <div className='time-settings-input'>
                                        <p>Pomodoro</p>
                                        <input
                                            type='number'
                                            min='1'
                                            max='60'
                                            value={userSettings.focusTime}
                                            onChange={(e) => {

                                                if (e.target.value > 60) {
                                                    e.target.value = 60;
                                                }
                                                updateSettings({
                                                    focusTime: e.target.value,
                                                });
                                            }}

                                        />
                                    </div>
                                    <div className='time-settings-input'>
                                        <p>Short Break</p>
                                        <input
                                            type='number'
                                            min='1'
                                            max='60'
                                            value={userSettings.breakTime}
                                            onChange={(e) => {
                                                if (e.target.value > 60) {
                                                    e.target.value = 60;
                                                }
                                                updateSettings({
                                                    breakTime: e.target.value,
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className='time-settings-input'>
                                        <p>Long Break</p>
                                        <input
                                            type='number'
                                            min='1'
                                            max='60'
                                            value={userSettings.longBreakTime}
                                            onChange={(e) => {
                                                if (e.target.value > 60) {
                                                    e.target.value = 60;
                                                }
                                                updateSettings({
                                                    longBreakTime: e.target.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='time-settings-selections'>
                                    <p>Long Break Cycle</p>
                                    <div className='time-settings-input'>
                                        <input
                                            type='number'
                                            min='1'
                                            max='60'
                                            value={userSettings.cycles}
                                            onChange={(e) => {
                                                if (e.target.value > 60) {
                                                    e.target.value = 60;
                                                }
                                                updateSettings({
                                                    cycles: e.target.value,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider
                            sx={{
                                height: "2px",
                                backgroundColor: " #f7f7f7",
                                margin: "2rem 0",
                            }}
                        />
                    </div>

                    <div className='category'>
                        <div className='category-header'>
                            <PaletteIcon
                                sx={{
                                    color: "#0fa7a28f",
                                }}
                            />
                            <h4>COLORS</h4>
                        </div>

                        <div className='color-settings-body'>
                            <div className='color-settings-inputs'>
                                <div className='color-settings-input'>
                                    <p>Color Themes</p>
                                    <div className='color-themes'>
                                        <p>Choose Theme</p>

                                        <div className='color-card'>
                                            {Object.entries(colors).map(([key, color], index) => {
                                                return (
                                                    <div
                                                        className='color-theme'
                                                        key={index}
                                                        onClick={() => {
                                                            dispatchWhichModal({
                                                                type: "TOGGLE_COLOR_MODAL",
                                                            });
                                                            updateSettings({
                                                                changeColorOf: key,
                                                            });
                                                        }}
                                                        style={{
                                                            backgroundColor: `${ color }`,
                                                        }}>

                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsModal;
