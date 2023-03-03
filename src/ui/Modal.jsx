import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import Context from '../store/Context';
import SettingsModal from '../components/Modals/SettingsModal';
import HelpModal from '../components/Modals/HelpModal';
import ColorModal from '../components/Modals/ColorModal';

const Backdrop = ({onClick}) => (
    <div className="backdrop" onClick={onClick} />
);

const ModalContent = ({whichModal: modal, updateSettings}) => {
    if (modal.isSettingsModalOpen && !modal.isColorModalOpen) return <SettingsModal updateSettings={updateSettings} />
    else if (modal.isHelpModalOpen) return <HelpModal />;
    else if (modal.isColorModalOpen) return <ColorModal />;
    return null;
}


const Modal = () => {
    const {modal, dispatchWhichModal, updateSettings, userSettings} = useContext(Context);
    const {focusTime, breakTime, longBreakTime, cycles} = userSettings;
    const timer = [focusTime, breakTime, longBreakTime, cycles]

    const modalRoot = document.getElementById('modal-root');
    return modal.isModalOpen && (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClick={() => {
                    timer.every(timerNumber => timerNumber > 0) ? dispatchWhichModal({type: 'TOGGLE_CLOSE_MODAL'}) : alert('You did not set the timer correctly. Please set the timer to a number greater than 0.')

                    updateSettings()
                }
                } />,
                document.getElementById('backdrop-root')
            )}

            {ReactDOM.createPortal(
                <div className={!modal.isColorModalOpen ? "modal__overlay" : "color__overlay"}  >
                    <div className="modal__content">
                        <ModalContent whichModal={modal} />
                    </div>
                </div>,
                modalRoot
            )}
        </>
    );
};

export default Modal;
