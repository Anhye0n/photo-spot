import { Outlet } from 'react-router-dom'

function AppLayout() {

   return (
      <>
         <div id="map"></div>
         <Outlet />
      </>
   )
}

export default AppLayout