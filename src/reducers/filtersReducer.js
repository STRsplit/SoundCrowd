const initialState = {
  mood: '',
  activity: '',
  location: '',
  weather: ''
};

const filtersReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FILTERS':
      state = {
        ...action.payload
      };
      break;
  }
  return state;
};

export default filtersReducer;