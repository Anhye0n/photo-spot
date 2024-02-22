// import * as ReactModal from 'react-modal'
import Modal from 'react-modal'
import * as ReactModal from 'react-modal'

import styles from '@assets/css/modal/modal.module.css'

export interface ModalOptionsType {
   modalOpen: boolean
   message: string
   setModalOpen: Function
}

interface PopupMessageModalType extends ModalOptionsType {
   setInfoModalOpen: Function
}

const customModalStyles: ReactModal.Styles = {
   overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '400px',
      height: '93px',
      zIndex: '10',
      position: 'fixed',
      top: '5%',
      left: '50%',
      transform: 'translate(-50%, -5%)',
   },

   content: {
      width: '100%',
      padding: '15px 20px 15px 20px',
      height: '100%',
      zIndex: 10,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: "white",
      border: '1px solid #7789d3',
      justifyContent: 'center',
      overflow: 'auto',
   },
}

function PopupMessage(props: PopupMessageModalType) {
   return (
      <Modal
         isOpen={props.modalOpen}
         onRequestClose={() =>
            props.setModalOpen(false)
         }
         style={customModalStyles}
         ariaHideApp={false}
         contentLabel='add-modal'
         shouldCloseOnOverlayClick={true}
         closeTimeoutMS={300}
      >
         <div className={styles['modal-flex']}>
            <span className='material-symbols-outlined'> add_location_alt </span>
            <div className={styles['add-modal-message']}>
               <p>맵 추가 중..</p>
               <p>원하는 위치를 클릭하면 추가 창이 뜹니다.</p>
               <p onClick={() => {
                  props.setModalOpen(() => false)
                  props.setInfoModalOpen(() => false)
               }}>[ 추가 종료 ]</p>
            </div>
         </div>

      </Modal>
   )
}

export default PopupMessage