import * as ReactModal from 'react-modal'
import styles from '@assets/css/modal/modal.module.css'
import Modal from 'react-modal'

export interface AlertModalType {
   type: string
   modalOpen: boolean
   message: string
   setModalOpen: Function
}

const customModalStyles: ReactModal.Styles = {
   overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      width: '350px',
      height: '40px',
      zIndex: '11',
      position: 'fixed',
      top: '5%',
      left: '50%',
      transform: 'translate(-50%, -5%)',
   },

   content: {
      width: '100%',
      padding: '15px 20px 15px 20px',
      height: '100%',
      zIndex: '11',
      position: 'absolute',
      top: '5%',
      left: '50%',
      transform: 'translate(-50%, -5%)',
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      // backgroundColor: "white",
      backgroundColor: '#fff1f1',
      color: '#dc3545',
      justifyContent: 'center',
      overflow: 'auto',
   },
}

function AlertMessage(props: AlertModalType) {
   return (
      <Modal
         isOpen={props.modalOpen}
         // isOpen={true}
         onRequestClose={() => props.setModalOpen(false)}
         onAfterOpen={() => {
            setTimeout(() => {
               props.setModalOpen(() => props.setModalOpen(false))
            }, 2000)
         }}
         style={{
            overlay: customModalStyles.overlay,
            content: {
               ...customModalStyles.content,
               backgroundColor: props.type === 'warning' ? '#fff1f1' : props.type === 'success' ? '#f1f9ff' : '',
               color: props.type === 'warning' ? '#dc3545' : props.type === 'success' ? '#35aadc' : '',
            },
         }}
         ariaHideApp={false}
         contentLabel="alert-message"
         shouldCloseOnOverlayClick={true}
         closeTimeoutMS={300}
      >
         <div className={styles['modal-flex']}>
            <span className="material-symbols-outlined"> {props.type === 'warning' ? '#warning' : props.type === 'success' ? 'done' : ''} </span>
            <div className={styles['warning-modal-message']}>
               <p>{props.message}</p>
            </div>
         </div>
      </Modal>
   )
}

export default AlertMessage