import { Outlet } from 'react-router-dom'
import MetaTag from '@components/SEOMetaTag.tsx'

function AppLayout() {

   return (
      <>
         {/*<MetaTag title="포토 스팟" description="사진 명소들을 모아볼 수 있습니다." url="https://photo-spot.info" />*/}
         <div id="map"></div>
         <Outlet />
      </>
   )
}

export default AppLayout