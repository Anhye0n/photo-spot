import { useEffect, useState } from 'react'
import '@assets/css/search-address.css'
import SearchAddress from '@pages/Sidebar/SearchAddress.tsx'
import '@assets/css/sidebar-layout.css'
import SpotSearch from '@pages/Sidebar/SpotSearch.tsx'

function SidebarLayout({
   map,
   markers,
   setMarkers,
   spotList,
}: {
   map: any
   markers: any
   setMarkers: Function
   spotList: any
}) {
   const [menuName, setMenuName] = useState('spot')
   const [isShowSidebar, setIsShowSidebar] = useState(true)

   const [searchMarkers, setSearchMarkers] = useState<any[]>([])

   useEffect(() => {

      removeMarker()

   }, [menuName])

   const removeMarker = () => {
      if (searchMarkers.length !==0) {
         for (let i = 0; i < searchMarkers.length; i++) {

            searchMarkers[i].setMap(null);
         }
         setSearchMarkers((prev)=> [])
      }
   }

   const activeButton = {
      background: '#f8f8f8',
      color: '#000000',
   }

   return (
      <>
         <div
            id="search-button"
            onClick={() => {
               setIsShowSidebar(!isShowSidebar)
            }}
            style={{
               left: isShowSidebar ? '350px' : '0',
            }}
         >
            <span className="material-symbols-outlined">menu</span>
         </div>
         <div
            id="menu_wrap"
            style={{
               left: isShowSidebar ? '0' : '-350px',
            }}
         >
            <div id="sidebar-select-container">
               <div
                  className="sidebar-select-button"
                  onClick={() => {
                     setMenuName('location')
                  }}
                  style={menuName === 'location' ? activeButton : null}
               >
                  <p>
                     <span className="material-symbols-outlined"> location_searching </span>
                     <span>위치 검색</span>
                  </p>
               </div>
               <div
                  className="sidebar-select-button"
                  onClick={() => {
                     setMenuName('spot')
                  }}
                  style={menuName === 'spot' ? activeButton : null}
               >
                  <p>
                     <span className="material-symbols-outlined"> location_on </span>
                     <span>명소 검색</span>
                  </p>
               </div>
            </div>
            {menuName === 'location' ? (
               <SearchAddress map={map} searchMarkers={searchMarkers} setSearchMarkers={setSearchMarkers} removeMarker={removeMarker}/>
            ) : (
               <SpotSearch map={map} spotList={spotList} />
            )}
         </div>
      </>
   )
}

export default SidebarLayout