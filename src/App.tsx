import { useEffect, useState } from 'react'
import '@assets/css/map.css'
import SidebarLayout from '@pages/Sidebar/SidebarLayout.tsx'
import AddButton from '@pages/SideButton/AddButton.tsx'
import { requestApi } from '@plugins/apiSetting.ts'
import markerImages from '@assets/images/spot-marker.webp'
import SpotInfo from '@components/Modal/SpotInfo.tsx'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import AppLayout from '@src/AppLayout.tsx'
import InfoButton from '@pages/SideButton/InfoButton.tsx'

const { kakao } = window

let map: any
let geocoder: any

export interface SpotType {
   spotUUID?: string
   spotName?: string
   spotExplain?: string
   address: string
   roadAddress: string
   spotLat: number
   spotLng: number
}

function App() {
   const [isView, setIsView] = useState(false)
   const [markers, setMarkers] = useState<any[]>([])

   const [spotList, setSpotList] = useState([])
   const [modalOpen, setModalOpen] = useState(true)

   const navigate = useNavigate()

   useEffect(() => {
      const script = document.createElement('script')
      script.async = true
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f21cd87f2a97826468d68560fd5dcf1f&libraries=services`
      document.head.appendChild(script)

      script.addEventListener('load', () => {
         kakao.maps.load(() => {
            const container = document.getElementById('map')

            const options = {
               center: new kakao.maps.LatLng(37.56628407757217, 126.98144819978414),

               level: 3, // 지도 확대 레벨
            }
            map = new kakao.maps.Map(container, options)
            geocoder = new kakao.maps.services.Geocoder()

            setTimeout(() => {
               setIsView(true)
            }, 100)

            kakao.maps.event.addListener(map, 'idle', () => {
               getSpot()
            })

            getSpot()
         })
      })
   }, [])

   const getSpot = async () => {
      removeMarker()

      const bounds = map.getBounds()

      // api 불러오기
      const regionArray = await requestApi.get('/spot/get', {
         params: {
            latMin: bounds.qa,
            latMax: bounds.pa,
            lonMin: bounds.ha,
            lonMax: bounds.oa,
         },
      })

      for (let index in regionArray.data) {
         // lat: 가로, lon; 세로
         addMarker(
            new kakao.maps.LatLng(regionArray.data[index].spot_lat, regionArray.data[index].spot_lng),
            index,
            regionArray.data[index],
         )
      }

      setSpotList((prev) => [...regionArray.data])
   }

   const addMarker = (position, idx, spotData) => {
      let imageSrc = markerImages, // 마커이미지의 주소입니다
         // 마커이미지의 크기입니다
         imageSize = new kakao.maps.Size(44, 60),
         // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
         imageOption = { offset: new kakao.maps.Point(19, 60) }

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

      const marker = new kakao.maps.Marker({
         position: position, // 마커의 위치
         image: markerImage,
      })

      marker.setMap(map) // 지도 위에 마커를 표출합니다
      // markers.push(marker) // 배열에 생성된 마커를 추가합니다



      setMarkers((prev: any) => {
         return [...prev, marker]
      })

      kakao.maps.event.addListener(marker, 'click', function () {
         navigate(`/spot?spotName=${spotData.spot_name}&spotUUID=${spotData.spot_uuid}`)
         setModalOpen(true)
      })

      return marker
   }

   const removeMarker = () => {
      for (let i = 0; i < markers.length; i++) {
         markers[i].setMap(null)
      }
      setMarkers((prev)=> [])
   }
   return (
      <>
         <Routes>
            <Route path="/" element={<AppLayout />}>
               <Route
                  path="spot"
                  element={isView ? <SpotInfo map={map} modalOpen={modalOpen} setModalOpen={setModalOpen} /> : null}
               />
            </Route>
         </Routes>
         {/*{!!queryData.spotName && <SpotInfo spotList={spotList} />}*/}
         {isView ? <InfoButton /> : null}
         {isView ? <AddButton map={map} geocoder={geocoder} /> : null}
         {isView ? <SidebarLayout map={map} markers={markers} setMarkers={setMarkers} spotList={spotList} removeMarker={removeMarker}/> : null}
      </>
   )
}

export default App
