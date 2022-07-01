import {  FETCH_ROLES_PERSONA_INFO  } from "../actions/ActionConstant";


  
const intialState = {
    PersonaRolesInfo: [],
  };


  const PendingMapReducer = (state = intialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case FETCH_ROLES_PERSONA_INFO:
        return {
          ...state,
          PersonaRolesInfo: action.PersonaRolesInfo,
        };     
      default:
        return state;
    }
  };
  
  export default PendingMapReducer;