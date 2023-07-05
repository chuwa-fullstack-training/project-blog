import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMessages, createMessage, deleteMessage } from 'services/messages';
import { removeError, addError } from './errorSlice';

const initialState = {
  messages: [],
  status: 'idle'
};

export const fetchMessagesAction = createAsyncThunk(
  'messages/fetchMessages',
  async (data, thunkAPI) => {
    try {
      const messages = await fetchMessages(data);
      thunkAPI.dispatch(removeError());
      return messages;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createMessageAction = createAsyncThunk(
  'messages/createMessage',
  async (data, thunkAPI) => {
    try {
      const message = await createMessage(data);
      thunkAPI.dispatch(removeError());
      return message;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMessageAction = createAsyncThunk(
  'messages/deleteMessage',
  async (data, thunkAPI) => {
    try {
      const message = await deleteMessage(data);
      thunkAPI.dispatch(removeError());
      return message;
    } catch (error) {
      const { message } = error;
      thunkAPI.dispatch(addError(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // loadMessages: (state, action) => {
    //   state.status = 'pending';
    //   state.messages = action.payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchMessagesAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.messages = action.payload;
    });
    builder.addCase(fetchMessagesAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(fetchMessagesAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(createMessageAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.messages.push(action.payload);
    });
    builder.addCase(createMessageAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(createMessageAction.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(deleteMessageAction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.messages = state.messages.filter(
        message => message._id !== action.payload._id
      );
    });
    builder.addCase(deleteMessageAction.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(deleteMessageAction.pending, (state, action) => {
      state.status = 'pending';
    });
  }
});

// export const { loadMessages } = messageSlice.actions;

export default messageSlice.reducer;
