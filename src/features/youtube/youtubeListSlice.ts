import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getYoutubeData } from 'api/youtubeAPI';
// import getYoutubeList from 'api/getYoutubeList';

export interface YoutubeData {
  id: string;
  thumbnail: string;
  title: string;
  channelTitle: string;
}

interface youtubeListState {
  youtubeList: YoutubeData[];
  loading: 'idle' | 'pending';
  error?: string;
}

const initialState: youtubeListState = {
  youtubeList: [
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
    { id: '', thumbnail: '', title: '', channelTitle: '' },
  ],
  loading: 'idle',
};

export const getYoutubeList = createAsyncThunk(
  'youtube/getYoutubeList',
  async (query: string, { rejectWithValue }) => {
    try {
      return getYoutubeData(query);
    } catch (error) {
      return rejectWithValue('error!');
    }
  }
);

export const youtubeListSlice = createSlice({
  name: 'youtubeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getYoutubeList.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(
        getYoutubeList.fulfilled,
        (state, { payload }: PayloadAction<YoutubeData[]>) => {
          state.loading = 'idle';
          state.youtubeList = payload;
        }
      )
      .addCase(getYoutubeList.rejected, (state, { error }) => {
        state.loading = 'idle';
        state.error = error.message;
      });
  },
});

export default youtubeListSlice.reducer;
