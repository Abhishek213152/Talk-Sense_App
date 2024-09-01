import {initStripe} from '@stripe/stripe-react-native';

// Initialize Stripe with your publishable key
initStripe({
  publishableKey:
    'pk_test_51PcBzhD8vdk9FbZFl9c1TBS03ePOlmRRmZ3ZqkpvztrcTd9BMLy3zbKE1IQxvTEkHWFmZScg5lAgUYJPHkFZKqXC00CkDf4UK3',
  merchantDisplayName: 'Abhi',
});
