import config from "../config/AppConfig";

const ServiceLocator = {
     headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
        client_secret: "cfdfef56-75e7-4eb2-9d95-f875af5d8a3a",
        client_id: "5ced240f-ae3b-4434-95dc-fc2bda61a88e",
      },

    getRecentlyAccessedCases: config.ServiceConfig.ApiServiceUrl + "/api/Utility/RecentlyAccessedCases",
    updateRecentlyAccessedCase: config.ServiceConfig.ApiServiceUrl + "/api/Utility/UserPreference",
    caseSearch: config.ServiceConfig.ApiServiceUrl + "/api/Search/SearchPatientCaseByCriteria",
    taskSearch: config.ServiceConfig.ApiServiceUrl + "/api/task/SearchTaskInformation",
    saveTaskNotes: config.ServiceConfig.ApiServiceUrl + "/api/Task/Details/Save",
    GetAllRolesForPersona:    config.ServiceConfig.ApiServiceUrl + "GetAllRolesforPersona",

};

ServiceLocator.headers["client_secret"] = ServiceLocator.headers.client_id;

export default ServiceLocator;
