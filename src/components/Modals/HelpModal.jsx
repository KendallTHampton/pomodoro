import React, {useState} from 'react'
import './HelpModal.css'


const HelpModal = () => {
    const [subject, setSubject] = useState('How To Use')

    const subjects = ['How To Use', 'Pomodoro', 'Why Use It',]

    return (

        <div className="helpModal-container">

            <div className="subjects">
                <>
                    {subjects.map((item, index) => (

                        <p key={index}
                            onClick={() => setSubject(item)}
                            className={`${ subject === item ? 'subject active' : 'subject' }`}
                        >
                            {item}?
                        </p>
                    ))}
                </>
            </div>

            <div className="helpModal-info">
                {subject === 'How To Use' &&

                    <div className="helpModal-subject">
                        <h2 className='helpModal-title'>How To Use A Pomodoro Timer</h2>
                        <p className='helpModal-description'></p>
                        <ol className="helpModal-instructions">
                            <li><span className='step'>Choose</span> a task to work on.</li>
                            <li><span className='step'>Set the timer</span> for 25 minutes (or the length of a pomodoro).</li>
                            <li><span className='step'>Work on the task</span> until the timer goes off.</li>
                            <li><span className='step'>Take a short break</span> (5-10 minutes).</li>
                            <li><span className='step'>Repeat steps 2-4</span> for four pomodoros.</li>
                            <li><span className='step'>Take a longer break</span> (15-30 minutes).</li>
                            <li><span className='step'>Repeat</span> the process as needed to complete your task or project.</li>
                            <li><span className='step'>Repeat steps</span> 2-4 for four pomodoros.</li>
                            <li><span className='step'>Take</span> a longer break (15-30 minutes).</li>
                            <li><span className='step'>Repeat</span> the process as needed to complete your task or project.
                            </li>
                        </ol>
                    </div>
                }


                {subject === 'Pomodoro' &&

                    <div className="helpModal-subject">
                        <h2 className='helpModal-title'>What Is A Pomodoro Timer?</h2>
                        <p className='helpModal-description'>A Pomodoro timer is a time management technique developed by Francesco Cirillo in the late 1980s. The technique involves breaking down work into <span className="emphasis">25-minute intervals</span>, known as "pomodoros", followed by short breaks. After every four pomodoros, take a longer break. This technique helps you avoid burnout and fatigue while <span className="emphasis">boosting your productivity</span>.</p>
                    </div>

                }

                {subject === 'Why Use It' &&
                    <div className="helpModal-subject">
                        <h2 className='helpModal-title'>Why Use A Pomodoro Timer?</h2>
                        <p className='helpModal-description'>A Pomodoro timer is a simple yet effective tool that can help you stay focused and productive. <span className="emphasis">By organizing your tasks</span> into short intervals and taking regular breaks, you can avoid burnout and stay motivated. The Pomodoro technique can be used for any task or project, making it a versatile tool for anyone who needs to<span className="emphasis"> manage their time </span>effectively. By using a Pomodoro timer, you can work smarter, not harder, and accomplish more in less time.</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default HelpModal
