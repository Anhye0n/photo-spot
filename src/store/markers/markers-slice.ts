import { createSlice } from '@reduxjs/toolkit'

export interface MarkersType {
   markers: any[]
}

const markers = createSlice({
   name: 'markers',
   initialState: {
      markers: [],
   },
   reducers: {
      addMarkers(state: MarkersType, { payload }: { payload: MarkersType }) {
         state.markers.push(payload)
      },
      removeMarkers(state: MarkersType, { payload }: { payload: MarkersType }) {
         state.markers = []
      },
   },
})

export const { addMarkers, removeMarkers } = markers.actions

export default markers