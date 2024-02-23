import Modal from 'react-modal'
import * as ReactModal from 'react-modal'

import styles from '@assets/css/modal/modal.module.css'
import github from '@assets/images/github-mark.png'
import { useState } from 'react'
import AlertMessage from '@components/Modal/AlertMessage.tsx'

interface ModalOptionsType {
   modalOpen: boolean
   setModalOpen: Function
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

function SiteInfo(props: ModalOptionsType) {
   const [copyMessageOpen, setCopyMessageOpen] = useState(false)
   const copyContent = async (message: string) => {
      try {
         await navigator.clipboard.writeText(message)
      } catch (err) {
         console.error(err)
      }
   }
   return (
      <Modal
         isOpen={props.modalOpen}
         // isOpen={true}
         onRequestClose={() => props.setModalOpen(false)}
         style={customModalStyles}
         ariaHideApp={false}
         contentLabel="site-info-modal"
         shouldCloseOnOverlayClick={true}
         closeTimeoutMS={300}
      >
         <AlertMessage
            type="success"
            message="Email 복사되었습니다."
            modalOpen={copyMessageOpen}
            setModalOpen={setCopyMessageOpen}
         />
         <div className={styles['modal-close-container']}>
            <span className="material-symbols-outlined" onClick={() => props.setModalOpen(false)}>
               {' '}
               close{' '}
            </span>
         </div>
         <div>
            <div className={styles['site-info-content-container']}>
               <p className={styles['site-info-version']}>Last Update: 2024-02-24 / v.1.0.0</p>
               <p className={styles['site-info-title']}>
                  Photo Spot <span>in South Korea</span>
               </p>
               <p className={styles['site-info-sub-title']}>
                  사진 명소 <span>in 한국</span>
               </p>
               <div className={styles['site-info-my-info']}>
                  <div
                     onClick={() => {
                        copyContent('stableh87@gmail.com').then(() => {
                           setCopyMessageOpen(true)
                        })
                     }}
                  >
                     <span className="material-symbols-outlined" title="stable87@gmail.com">
                        mail
                     </span>
                  </div>
                  <div>
                     <img
                        src={github}
                        alt="github"
                        title="https://github.com/anhye0n"
                        onClick={() => {
                           window.open('https://github.com/anhye0n')
                        }}
                     />
                  </div>
               </div>
               <hr />
               <div className={styles['site-info-explain-container']}>
                  <p className={styles['site-info-explain-title']}>"멋진 장소에서 예쁜 사진을 찍고 싶다."</p>
                  <p className={styles['site-info-explain']}>
                     2023년 9월 말, 군대에서 전역한 저는 특별한 취미가 없어서, 예전부터 참 낭만적이라고 생각했던 사진을
                     취미로 삼기로 마음을 먹었습니다.{' '}
                  </p>
                  <p>
                     중고로 구입한 소니 a6400을 통해 여기저기를 돌아다니며 풍경, 가족, 친구들의 사진을 찍고, 유튜브에
                     올라온 다양한 강의를 찾아보며 라이트룸으로 편집한 뒤, 사진을 인화해 보기도 하고 앨범에 담아보기도
                     했습니다. 이를 사람들과 공유한 후에 얻는 좋은 반응들 속에서, 예전에는 느끼지 못했던 평범한 대학생의
                     삶 속에서 특별하고 행복한 순간들을 경험할 수 있었습니다.
                  </p>
                  <p>
                     사진에 관심이 생기면서 "멋진 장소에서 예쁜 사진을 찍고 싶다"는 욕심이 생겼습니다. 이 생각은 사진을
                     즐기는 분들이 아니더라도 누구나 가질 수 있는 생각이라고 생각합니다. 그러나 갓 입문한 제게 양질의
                     많은 정보를 찾는 것은 예상보다 많은 시간이 들었고, 이런 번거로움을 느낀 이들이 분명 저뿐만이 아닐
                     것이라 생각했습니다. 그렇기에 장소들을 지도를 통해 편리하게 볼 수 있다면 많은 분께 도움이 되지
                     않을까 생각했습니다.
                  </p>
                  <p>
                     그래서 2024년 2월, 이러한 불편을 해소하기 위해 'photo-spot.info'라는 웹사이트를 개발하기로
                     결심했습니다. 현재는 매우 부족한 사이트지만, 앞으로도 계속해서 개발하여 오랜 시간이 흐른 필름
                     사진처럼 조금은 부족할지언정 자연스레 찾게 되는 사이트로 만들고자 합니다.
                  </p>
               </div>
               <hr />
               <div className={styles['site-info-plan-container']}>
                  <p>추후 개발 계획</p>
                  <p>- 모바일 지원</p>
                  <p>- 로그인 기능</p>
                  <p>- 내가 올린 장소 모아보기</p>
                  <p>- 좋아요 기능</p>
                  <p>- 공유 기능</p>
                  <p>- 신고 기능</p>
               </div>
            </div>
         </div>
      </Modal>
   )
}

export default SiteInfo