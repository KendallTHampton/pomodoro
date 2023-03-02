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

const ModalContent = ({whichModal}) => {
    if (whichModal.isSettingsModalOpen && !whichModal.isColorModalOpen) return <SettingsModal />
    else if (whichModal.isHelpModalOpen) return <HelpModal />;
    else if (whichModal.isColorModalOpen) return <ColorModal />;
    return null;
}


const Modal = () => {
    const {whichModal, dispatchWhichModal} = useContext(Context);
    const modalRoot = document.getElementById('modal-root');
    return whichModal.isModalOpen && (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClick={() => {
                    dispatchWhichModal({type: 'TOGGLE_CLOSE_MODAL'})
                }

                } />,
                document.getElementById('backdrop-root')
            )}

            {ReactDOM.createPortal(
                <div className={!whichModal.isColorModalOpen ? "modal__overlay" : "color__overlay"}  >
                    <div className="modal__content">
                        <ModalContent whichModal={whichModal} />
                    </div>
                </div>,
                modalRoot
            )}
        </>
    );
};

export default Modal;
