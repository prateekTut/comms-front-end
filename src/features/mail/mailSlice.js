import {  createSlice } from '@reduxjs/toolkit';



export const mailSlice = createSlice({
  name: 'mail',
  initialState:{
    sendMessageIsOpen: false,
    selectedMessage:null
  },
  reducers: {
    OpenSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    CloseSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    OpenMessage: (state,action) => {
      state.selectedMessage = action.payload;
    },
  },

});

export const { OpenSendMessage, CloseSendMessage ,OpenMessage} = mailSlice.actions;

export const selectSendMessageIsOpen = (state) => state.mail.sendMessageIsOpen;

export const selectedMail = (state) => state.mail.selectedMessage;

export default mailSlice.reducer;
