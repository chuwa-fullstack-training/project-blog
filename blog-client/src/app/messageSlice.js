import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  status: 'idle'
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    fetchMessages: (state, action) => {
      state.status = 'pending';
      state.messages = action.payload;
    }
  }
});

export const { fetchMessages } = messageSlice.actions;

export default messageSlice.reducer;
