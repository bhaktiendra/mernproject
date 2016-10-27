import { ADD_QUOTE, ADD_QUOTES, DELETE_QUOTE } from './QuoteActions';

// Initial State
const initialState = { data: [] };

const QuoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUOTE :
      return {
        data: [action.quote, ...state.data],
      };

    case ADD_QUOTES :
      return {
        data: action.quotes,
      };

    case DELETE_QUOTE :
      return {
        data: state.data.filter(quote => quote.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all quotes
export const getQuotes = state => state.quotes.data;

// Get quote by cuid
export const getQuote = (state, cuid) => state.quotes.data.filter(quote => quote.cuid === cuid)[0];

// Export Reducer
export default QuoteReducer;
