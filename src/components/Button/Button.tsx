import styles from '@assets/css/button/button.module.css'
import { requestApi } from '@plugins/apiSetting.ts'
import { SpotType } from '@src/App.tsx'

interface ButtonPropsType {
   content?: string
   width?: string
   height?: string
   fontSize?: string
   color?: string
   background?: string
   spotData?: SpotType
   setSpotData: Function
   setModalOpen?: Function
   setAlertModalOpen?: Function
   setAlertModalOptions?: Function
}

const uploadSpot = (
   spotData: SpotType,
   setModalOpen: Function,
   setAlertModalOpen: Function,
   setAlertModalOptions: Function,
) => {
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
         setAlertModalOptions((prev: any) => ({
            ...prev,
            type: 'success',
            alertMessage: '추가 완료되었습니다.',
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
      setSpotData: props.setSpotData,
   }

   return (
      <>
         <button
            className={styles['button-6']}
            role="button"
            style={buttonStyle}
            onClick={() => {
               if (props.spotData && props.setModalOpen && props.setAlertModalOpen && props.setAlertModalOptions) {
                  uploadSpot(props.spotData, props.setModalOpen, props.setAlertModalOpen, props.setAlertModalOptions)
               }
               props.setSpotData((prev: any) => ({
                  ...prev,
                  spotUUID: '',
                  spotName: '',
                  spotExplain: '',
                  address: '',
                  roadAddress: '',
                  spotLat: '',
                  spotLng: '',
               }))
            }}
         >
            {props.content}
         </button>
      </>
   )
}

export default Button