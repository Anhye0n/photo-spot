import styles from '@assets//css/side-button.module.css'
import { useState } from 'react'
import SiteInfo from '@components/Modal/SiteInfo.tsx'

function InfoButton() {
   const [siteInfoOpen, setSiteInfoOpen] = useState(false)

   return (
      <>
         <SiteInfo modalOpen={siteInfoOpen} setModalOpen={setSiteInfoOpen} />
         <div className={`${styles['info-button']} ${styles['side-button']}`} onClick={() => setSiteInfoOpen(true)}>
            <span className="material-symbols-outlined"> info </span>
         </div>
      </>
   )
}

export default InfoButton