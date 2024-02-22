import styles from '@assets/css/button/button.module.css'
import { requestApi } from '@plugins/apiSetting.ts'
import { SpotType } from '@src/App.tsx'

interface ButtonPropsType {
   content?: string
   width?: string
   height?: string
   // padding: string
   fontSize?: string
   color?: string
   background?: string
   spotData?: SpotType
   setModalOpen?: Function
   setAlertModalOpen?: Function
   setAlertModalOptions?: Function
}

const uploadSpot = (spotData, setModalOpen, setAlertModalOpen, setAlertModalOptions) => {
   requestApi
      .post('/spot/upload', {
         userName: 'anhye0n',
         spotName: spotData.spotName,
         roadAddress: spotData.roadAddress === '-' ? null : spotData.roadAddress,
         address: spotData.address === '-' ? null : spotData.address,
         spotExplain: spotData.spotExplain,
         spotLat: spotData.spotLat,
         spotLng: spotData.spotLng,
      })
      .then((res) => {
         setModalOpen(false)
         setAlertModalOptions((prev) => ({
            ...prev,
            type: 'success',
            alertMessage: '추가 완료되었습니다.'
         }))
         setAlertModalOpen(true)
         console.log(res)
      })
      .catch((err) => {
         console.log(err)
      })
}

function Button(props: ButtonPropsType) {
   const buttonStyle: ButtonPropsType = {
      width: props.width,
      height: props.height,
      // padding: props.padding,
      fontSize: props.fontSize,
      color: props.color,
      background: props.background,
   }

   return (
      <>
         <button
            className={styles['button-6']}
            role="button"
            style={buttonStyle}
            onClick={() => {
               uploadSpot(props.spotData, props.setModalOpen, props.setAlertModalOpen, props.setAlertModalOptions)
            }}
         >
            {props.content}
         </button>
      </>
   )
}

export default Button