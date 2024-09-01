import {createSlice} from '@reduxjs/toolkit';

export const profilePictureSlice = createSlice({
  name: 'profilePicture',
  initialState: {
    uri: 'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/96/external-user-web-and-seo-tanah-basah-basic-outline-tanah-basah.png',
  },
  reducers: {
    setProfilePicture: (state, action) => {
      state.uri = action.payload;
    },
    clearProfilePicture: state => {
      state.uri =
        'https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/96/external-user-web-and-seo-tanah-basah-basic-outline-tanah-basah.png';
    },
  },
});

export const {setProfilePicture, clearProfilePicture} =
  profilePictureSlice.actions;

export default profilePictureSlice.reducer;
