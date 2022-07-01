import axios from "axios";
import ServiceLocator from "../config/ServiceLocator";


// export function* searchPhysicianExisting(postObj) {
//     yield axios.post(ServiceLocator.searchPhysicianExisting, postObj).then((response) => {
//         return response.data.Success;
//     });
// }


// export function* getPhysicianContactInfo(programName, CaseId, PatientId, entityType) {
//     yield axios
//         .get(ServiceLocator.getEntityValuesByEntityType + `${programName}/${CaseId}/${PatientId}/${entityType}`)
//         .then((response) => {
//             return response.data.Success;
//         });
// }


// export function* saveNewPhysician(payload) {
//     yield axios.post(ServiceLocator.saveNewPhysician, payload).then((response) => {
//         return response.data.Success;
//     });
// }

export function caseSearch(FormData) {
    return axios
      .post(ServiceLocator.caseSearch, FormData, {
        headers: { ...ServiceLocator.headers },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.toJSON();
      });
  }


  export function getAllRolesForPersona() {
    return axios
      .get(ServiceLocator.GetAllRolesForPersona, {
        headers: { ...ServiceLocator.headers },
        data: {},
      })
      .then(({ data }) => {
        return data.resultSet;
      });
  }