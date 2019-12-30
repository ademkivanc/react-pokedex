import { combineReducers } from 'redux';
const initialState = { items:[] }

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FAV':
      return {items:[...state.items, action.item]} ;
    case 'REMOVE_FAV':
      state.items.splice(action.index, 1);
      return {items:[...state.items]} ;  
    default:
      return state
  }
}

const allReducer = combineReducers({ favorites });
export default allReducer;