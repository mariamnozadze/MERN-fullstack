import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// initial state for the alerts array
const initialState = [];

// Reducer function
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      // Removing an alert from the state array based on its id
      return state.filter((alert) => alert.id !== payload);
    // Default case returns the current state if the action type is not recognized
    default:
      return state;
  }
}
