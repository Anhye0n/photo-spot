import { useState } from 'react'
import '@assets/css/spot-search.css'
import { truncateText } from '@plugins/truncateText.ts'
import quotes_1 from '@assets//images/quotes_1.webp'
import quotes_2 from '@assets//images/quotes_2.webp'
import { requestApi } from '@plugins/apiSetting.ts'

const { kakao }: any = window

function SpotSearch({ map, spotList }: { map: any; spotList: any }) {
   const [isSearching, setIsSearching] = useState(false)
   const [spotInput, setSpotInput] = useState('')
   const [searchResult, setSearchResult] = useState<any[]>([])

   const searchSpot = (searchText: string) => {
      requestApi
         .get('/spot/search_spot', {
            params: {
               searchText: searchText,
            },
         })
         .then((res) => {
            setIsSearching(true)
            setSearchResult(() => [...res.data])
         })
   }

   function SpotSearchBox({ spotData }: { spotData: any }) {
      return (
         <>
            <div
               className="spot-search-result-box"
               onClick={() => {
                  map.panTo(new kakao.maps.LatLng(spotData.spot_lat, spotData.spot_lng))
               }}
            >
               <div className="spot-search-result-title-box">
                  <div>
                     <img src={quotes_1} alt="quotes_2" />
                  </div>
                  <p className="spot-search-result-title">{spotData.spot_name}</p>
                  <div>
                     <img src={quotes_2} alt="quotes_2" />
                  </div>
               </div>
               <p className="spot-search-result-address-title">도로명</p>
               <p className="spot-search-result-road-address">
                  {!spotData.spot_road_address ? '-' : spotData.spot_road_address}
               </p>
               <p className="spot-search-result-address-title">지번</p>
               <p className="spot-search-result-address">{!spotData.spot_address ? '-' : spotData.spot_address}</p>
               <p>{truncateText(spotData.spot_explain, 46)}</p>
            </div>
            <hr />
         </>
      )
   }

   return (
      <>
         <div className="option">
            <div>
               <p>명소들 검색합니다.</p>
               <div id="label-box">
                  <label htmlFor="spot-input">명소 검색</label>
               </div>
               <input
                  type="text"
                  value={spotInput}
                  id="spot-input"
                  placeholder="성수구름다리"
                  onChange={(e) => {
                     setSpotInput(e.target.value)
                  }}
                  onKeyUp={(e) => {
                     if (e.key === 'Enter') {
                        searchSpot(spotInput)
                     }
                  }}
               />
            </div>
         </div>
         {isSearching && (
            <p id="spot-search-close">
               <span
                  onClick={() => {
                     setIsSearching(false)
                     setSpotInput('')
                  }}
               >
                  검색 종료
               </span>
            </p>
         )}
         <div id="spot-search-result-container">
            {isSearching
               ? searchResult.map((data: any) => <SpotSearchBox key={data.spot_uuid} spotData={data} />)
               : spotList.map((data: any) => <SpotSearchBox key={data.spot_uuid} spotData={data} />)}
         </div>
      </>
   )
}

export default SpotSearch