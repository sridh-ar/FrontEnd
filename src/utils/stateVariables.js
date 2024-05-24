'use client'
import { createSlice, configureStore } from '@reduxjs/toolkit'
import { useEffect } from 'react';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    value: {
      appName:"",
      allowedRegistrationCount:180,
      totalRegisteredPlayers:0,
      remainingSlots:0
    }
  },
  reducers: {
    updateConfigStateValue: (state, action) => {
      state.value = action.payload || state.value;
    },
  }
})

export const { updateConfigStateValue } = configSlice.actions

export default configureStore({
  reducer: {
    config: configSlice.reducer
  }
})