import {
    getAllRolesForPersona,
  } from "../../services/PendingMapServices";
import {FETCH_PERSONA_FEATURES,FETCH_ROLES_PERSONA_INFO} from "../actions/ActionConstant"




export const retrivePersonaRoleInfo = (PersonaRolesInfo) => {
    return {
      type: FETCH_ROLES_PERSONA_INFO,
      PersonaRolesInfo,
    };
  };
  
  export const retrievePersonaRoleInfo = (dispatch) => {
    const res = getAllRolesForPersona();
    res.then((PersonaRolesInfo) => {
      dispatch(retrivePersonaRoleInfo(PersonaRolesInfo));
    });
  };