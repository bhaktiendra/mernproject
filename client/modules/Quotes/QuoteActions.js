import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_QUOTE = 'ADD_QUOTE';
export const ADD_QUOTES = 'ADD_QUOTES';
export const DELETE_QUOTE = 'DELETE_QUOTE';

// Export Actions
export function addQuote(quote) {
  return {
    type: ADD_QUOTE,
    quote,
  };
}

export function addQuoteRequest(quote) {
  return (dispatch) => {
    return callApi('quotes', 'post', {
      quote: {
        name: quote.name,
        title: quote.title,
        content: quote.content,
      },
    }).then(res => dispatch(addQuote(res.quote)));
  };
}

export function addQuotes(quotes) {
  return {
    type: ADD_QUOTES,
    quotes,
  };
}

export function fetchQuotes() {
  return (dispatch) => {
    return callApi('quotes').then(res => {
      dispatch(addQuotes(res.quotes));
    });
  };
}

export function fetchQuote(cuid) {
  return (dispatch) => {
    return callApi(`quotes/${cuid}`).then(res => dispatch(addQuote(res.quote)));
  };
}

export function deleteQuote(cuid) {
  return {
    type: DELETE_QUOTE,
    cuid,
  };
}

export function deleteQuoteRequest(cuid) {
  return (dispatch) => {
    return callApi(`quotes/${cuid}`, 'delete').then(() => dispatch(deleteQuote(cuid)));
  };
}
