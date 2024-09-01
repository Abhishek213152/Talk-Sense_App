import {configureStore} from '@reduxjs/toolkit';
import CartReducer from './CartReducer';
import ProductReducer from './ProductReducer';
import EmailReducer from './EmailReducer';
import ProfilePictureReducer from './ProfilePictureReducer';

export default configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductReducer,
    email: EmailReducer,
    profilePicture: ProfilePictureReducer,
  },
});
