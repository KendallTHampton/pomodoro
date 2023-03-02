import React from 'react'
import Context from '../../store/Context'
import {useContext} from 'react'
import './ColorModal.css'
import {Divider} from '@mui/material'


const ColorModal = () => {
    const {userSettings, updateSettings, dispatchWhichModal} = useContext(Context)


    const {changeColorOf, colors} = userSettings



    const allColors = [
        '#215385',
        '#e99324',
        '#08b598',
        '#c92e2e',
        '#26292b',
        '#370f65',
        '#612d1c',
    ]


    return (
        <div className='colorModal'>
            <div className='colorModal__header'>
                <h4>Pick A Color</h4>
            </div>
            <Divider sx={{
                height: '2px',
                backgroundColor: '#f7f7f7'
            }} />
            <div className='palette'>
                {allColors.map((color, index) => {
                    return (
                        <div className="palette__wrapper"
                            key={index}>
                            <div className='palette__color'
                                onClick={() => {
                                    updateSettings({
                                        colors: {
                                            ...colors,
                                            [changeColorOf]: color
                                        },
                                    })
                                    dispatchWhichModal({type: "TOGGLE_COLOR_MODAL"})
                                }}
                                style={{
                                    backgroundColor: `${ color }`

                                }}
                            >
                            </div>
                        </div>
                    )
                }
                )}

            </div>
        </div >
    )
}

export default ColorModal