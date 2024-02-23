import styles from '@assets/css/side-button.module.css'
import { useEffect, useState } from 'react'
import InfoModal from '@components/Modal/InfoModal.tsx'
import PopupMessage from '@components/Modal/PopupMessage.tsx'

import plusPin from '@assets/images/plus-pin.png'
import { SpotType } from '@src/App.tsx'
import AlertMessage from '@components/Modal/AlertMessage.tsx'

const { kakao } = window

function AddButton({ map, geocoder }: { map: any; geocoder: any }) {
   const [addButton, setAddButton] = useState(false)
   const [infoModalOpen, setInfoModalOpen] = useState(false)
   const [alertModalOpen, setAlertModalOpen] = useState(false)
   const [alertModalOptions, setAlertModalOptions] = useState({
      type: '',
      alertMessage: '',
   })
   const [markersInAddButton, setMarkersInAddButton] = useState<any>('')

   const [addSpot, setAddSpot] = useState<SpotType>({
      spotName: '',
      spotExplain: '',
      address: '',
      roadAddress: '',
      spotLat: 0,
      spotLng: 0,
   })

   const clickFunction = (mouseEvent) => {
      let latLng = mouseEvent.latLng
      markersInAddButton.setPosition(latLng)

      searchDetailAddrFromCoords(latLng, (result, status) => {
         if (status === kakao.maps.services.Status.OK) {
            setAddSpot((prev) => ({
               ...prev,
               address: result[0].address.address_name,
               roadAddress: !!result[0].road_address ? result[0].road_address.address_name : '-',
            }))
         }
      })

      setInfoModalOpen(true)
      setAddSpot((prev: SpotType) => ({
         ...prev,
         spotLat: latLng.getLat(),
         spotLng: latLng.getLng(),
      }))
   }

   useEffect(() => {
      let imageSrc = plusPin,
         imageSize = new kakao.maps.Size(64, 64),
         imageOption = { offset: new kakao.maps.Point(29, 65) }

      const marker = new kakao.maps.Marker({
         position: map.getCenter(),
         image: new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
      })

      setMarkersInAddButton(marker)

      if (addButton && markersInAddButton) {
         markersInAddButton.setMap(map)
         kakao.maps.event.addListener(map, 'click', clickFunction)
      }

      return () => {
         if (markersInAddButton) {
            markersInAddButton.setMap(null)
            kakao.maps.event.removeListener(map, 'click', clickFunction)
         }
      }
   }, [addButton])

   const searchDetailAddrFromCoords = (coords, callback) => {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
   }

   useEffect(() => {
      if (addSpot.spotExplain.length > 500) {
         setAlertModalOpen(true)
         setAlertModalOptions((prev) => ({
            ...prev,
            type: 'warning',
            alertMessage: '500자 이상 입력할 수 없습니다.',
         }))
         setAddSpot((prev: SpotType) => ({
            ...prev,
            spotExplain: addSpot.spotExplain.slice(0, 500),
         }))
      }
   }, [addSpot.spotExplain])

   return (
      <>
         <InfoModal
            modalOpen={infoModalOpen}
            spotData={addSpot}
            setSpotData={setAddSpot}
            setModalOpen={setInfoModalOpen}
            setAlertModalOpen={setAlertModalOpen}
            setAlertModalOptions={setAlertModalOptions}
         />
         <PopupMessage
            modalOpen={addButton}
            message="asdf"
            setModalOpen={setAddButton}
            setInfoModalOpen={setInfoModalOpen}
         />
         <AlertMessage
            type={alertModalOptions.type}
            modalOpen={alertModalOpen}
            message={alertModalOptions.alertMessage}
            setModalOpen={setAlertModalOpen}
         />

         <div className={`${styles['add-button']} ${styles['side-button']}`} onClick={() => setAddButton(true)}>
            <span className="material-symbols-outlined"> add_location_alt </span>
         </div>
      </>
   )
}

export default AddButton
