import '@assets/css/add-button.css'
import { useEffect, useState } from 'react'
import InfoModal from '@components/Modal/InfoModal.tsx'
import PopupMessage from '@components/Modal/PopupMessage.tsx'

import plusPin from '@assets/images/plus-pin.png'
import { SpotType } from '@src/App.tsx'
import AlertMessage from '@components/Modal/AlertMessage.tsx'
import alertMessage from '@components/Modal/AlertMessage.tsx'

const { kakao } = window

function AddButton({
   map,
   markers,
   setMarkers,
   geocoder,
}: {
   map: any
   markers: any
   setMarkers: Function
   geocoder: any
}) {
   const [addButton, setAddButton] = useState(false)

   const [infoModalOpen, setInfoModalOpen] = useState(false)

   const [alertModalOpen, setAlertModalOpen] = useState(false)

   const [alertModalOptions, setAlertModalOptions] = useState({
      type: '',
      alertMessage: ''
   })


   const [addSpot, setAddSpot] = useState<SpotType>({
      spotName: '',
      spotExplain: '',
      address: '',
      roadAddress: '',
      spotLat: 0,
      spotLng: 0,
   })

   const clickFunction = (mouseEvent) => {
      // 클릭한 위도, 경도 정보를 가져옵니다
      let latLng = mouseEvent.latLng

      // 마커 위치를 클릭한 위치로 옮깁니다
      markers[0].setPosition(latLng)

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
      setAddSpot((prev: SpotType) => {
         return {
            ...prev,
            spotLat: latLng.getLat(),
            spotLng: latLng.getLng(),
         }
      })
   }

   useEffect(() => {
      if (addButton) {
         let imageSrc = plusPin, // 마커이미지의 주소입니다
            imageSize = new kakao.maps.Size(64, 64), // 마커이미지의 크기입니다
            // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            imageOption = { offset: new kakao.maps.Point(29, 65) }
         markers[0] = new kakao.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다
            position: map.getCenter(),
            image: new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
         })

         // 지도에 마커를 표시합니다
         markers[0].setMap(map)

         kakao.maps.event.addListener(map, 'click', clickFunction)
      }
      return () => {
         kakao.maps.event.removeListener(map, 'click', clickFunction)

         // console.log(getEventListeners(map))
         for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null)
         }
         // markers = []
         setMarkers([])
      }
   }, [addButton])

   const searchDetailAddrFromCoords = (coords, callback) => {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback)
   }

   useEffect(() => {
      if (addSpot.spotExplain.length > 500) {
         setAlertModalOpen(true)
         setAlertModalOptions((prev) => ({
            ...prev,
            type: 'warning',
            alertMessage: '500자 이상 입력할 수 없습니다.'
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

         <div id="add-button" onClick={() => setAddButton(true)}>
            <span className="material-symbols-outlined"> add_location_alt </span>
         </div>
      </>
   )
}

export default AddButton