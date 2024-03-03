// import * as ReactModal from 'react-modal'
import Modal from 'react-modal'
import * as ReactModal from 'react-modal'

import styles from '@assets/css/modal/modal.module.css'
import quotes_1 from '@assets/images/quotes_1.webp'
import quotes_2 from '@assets/images/quotes_2.webp'
import { SpotType } from '@src/App.tsx'
import Button from '@components/Button/Button.tsx'

interface ModalOptionsType {
   modalOpen: boolean
   spotData: SpotType
   setSpotData: Function
   setModalOpen: Function
   setAlertModalOpen: Function
   setAlertModalOptions: Function
}

const customModalStyles: ReactModal.Styles = {
   overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
   },

   content: {
      width: '70%',
      minWidth: '800px',
      padding: '15px 20px 15px 20px',
      height: '610px',
      zIndex: 10,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      // borderTopLeftRadius: '10px',
      // borderBottomLeftRadius: '10px',
      borderRadius: '10px',
      border: 'none',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: '#f8f8f8',
      justifyContent: 'center',
      overflow: 'auto',
   },
}

function InfoModal(props: ModalOptionsType) {

   return (
      <Modal
         isOpen={props.modalOpen}
         // isOpen={true}
         onRequestClose={() => props.setModalOpen(false)}
         style={customModalStyles}
         ariaHideApp={false}
         contentLabel='add-modal'
         shouldCloseOnOverlayClick={true}
         closeTimeoutMS={300}
      >
         <div className={styles['modal-close-container']}>
            <span className='material-symbols-outlined' onClick={() => props.setModalOpen(false)}>
               {' '}
               close{' '}
            </span>
         </div>
         <div>
            <div className={styles['spot-add-input-container']}>
               <div>
                  <img src={quotes_1} alt='quotes_2' />
               </div>
               <div className={styles['spot-add-input-div']}>
                  <input
                     type='text'
                     className={styles['spot-name-input']}
                     placeholder='명소 이름 설정'
                     value={props.spotData.spotName}
                     onChange={(e) => {
                        props.setSpotData((prev: SpotType) => ({
                           ...prev,
                           spotName: e.target.value,
                        }))
                     }}
                  />
               </div>
               <div>
                  <img src={quotes_2} alt='quotes_2' />
               </div>
            </div>
            <div className={styles['spot-add-explain-container']}>
               <textarea
                  className={styles['spot-add-explain-textarea']}
                  placeholder='명소 설명 작성'
                  name='spot-explain'
                  value={props.spotData.spotExplain}
                  onChange={(e) => {
                     props.setSpotData((prev: SpotType) => ({
                        ...prev,
                        spotExplain: e.target.value,
                     }))
                  }}
               />
            </div>
            <p className={styles['spot-address-warning']}>▽ 주소는 실제 위치와 오차가 존재 할 수 있으니, 마커와 좌표 위치를 잘 확인 바랍니다.</p>
            <div className={styles['spot-lat-lng-container']}>
               <p>
                  {props.spotData.spotLat} / {props.spotData.spotLng}
               </p>
            </div>
            <div className={styles['spot-address-container']}>
               <p>도로명 주소</p>
               <p>{props.spotData.roadAddress}</p>
            </div>
            <div className={styles['spot-address-container']}>
               <p>지번 주소</p>
               <p>{props.spotData.address}</p>
            </div>
            <div className={styles['spot-add-upload']}>
               <Button content='업로드' fontSize='1.2em' spotData={props.spotData} setSpotData={props.setSpotData} setModalOpen={props.setModalOpen}
                       setAlertModalOpen={props.setAlertModalOpen} setAlertModalOptions={props.setAlertModalOptions}/>
            </div>
         </div>
      </Modal>
   )
}

export default InfoModal