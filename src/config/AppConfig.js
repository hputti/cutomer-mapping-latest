let ApiServiceUrl = "";
let OktaAuthURI = "";
let OKtaClientID="";

const environment = [
    { key: "localhost", value: "local" },
    { key: "", value: "dev" },
    { key: "", value: "test" },
    { key: "", value: "uat" },
    { key: "", value: "prod" }
];

let config = "";
config = environment.find((x) => window.location.hostname.includes(x.key)).value;

if (config === "local" || config === "dev") {
    ApiServiceUrl =  "https://apimule-dev.nonprod.gcp.mckesson.com/biologics-client-management-sapi-dev/biologics-dev/api/";
    OktaAuthURI = "https://dev-64386197.okta.com/oauth2/default";
    OKtaClientID = "0oa5b4tdcgJynBxjJ5d7";
} else if (config === "test") {
    // For Sprint/Boot services QA env will be considered UI Test
   
} else if (config === "uat") {
   // For Sprint/Boot services QA env will be considered UI Test
   
} else if (config === "prod") {
   
}

export default {
    ServiceConfig: {
        ApiServiceUrl: ApiServiceUrl,
        OktaAuthURI: OktaAuthURI,
        OKtaClientID: OKtaClientID,     
    }
};
