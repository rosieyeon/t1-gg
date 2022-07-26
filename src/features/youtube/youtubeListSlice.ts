import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getYoutubeData, YoutubeQuery } from 'api/youtubeAPI';

// TODO Playlis data youtubeData 따로 만들ㄹ기
export interface YoutubeData {
  id: string;
  thumbnail: string;
  title: string;
  channelTitle: string;
  bookmark: boolean;
}

interface youtubeListState {
  youtubeList: YoutubeData[];
  loading: 'idle' | 'pending';
  error?: string;
}

const initialState: youtubeListState = {
  youtubeList: [
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
    { id: '', thumbnail: '', title: '', channelTitle: '', bookmark: false },
  ],
  loading: 'idle',
};

export const getYoutubeList = createAsyncThunk(
  'youtube/getYoutubeList',
  async (query: YoutubeQuery, { rejectWithValue }) => {
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
