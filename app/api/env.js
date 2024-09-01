const environment = process.env.NODE_ENV;

let EES_BASE_URL;
let REGISTRATION_SERVICE_BASE_URL;
let RECAPTCHA_KEY;
let DEFAULT_WS_NODE;
let WS_NODE_LIST_URL_NODE1;
let WS_NODE_LIST_URL_NODE2;
let WS_NODE_LIST_URL_NODE3;

if (environment === "development") {
    EES_BASE_URL = "http://r2-ees-service:3000";
    REGISTRATION_SERVICE_BASE_URL = "http://r2-registration-service";
    RECAPTCHA_KEY = "6LcF99ApAAAAAEYJMPOzDJX6nT9ZLNtFEqCucTmP";
    DEFAULT_WS_NODE = "wss://node01-test.rsquared.digital:8090";
    WS_NODE_LIST_URL_NODE1 = "wss://node01-test.rsquared.digital:8090";
    WS_NODE_LIST_URL_NODE2 = "wss://node01-test.rsquared.digital:8090";
    WS_NODE_LIST_URL_NODE3 = "wss://node01-test.rsquared.digital:8090";
} else if (environment === "production") {
    EES_BASE_URL = "http://r2-ees-service:3000";
    REGISTRATION_SERVICE_BASE_URL = "http://r2-registration-service";
    RECAPTCHA_KEY = "6LcF99ApAAAAAEYJMPOzDJX6nT9ZLNtFEqCucTmP";
    DEFAULT_WS_NODE = "wss://node01.rsquared.digital:8090";
    WS_NODE_LIST_URL_NODE1 = "wss://node01.rsquared.digital:8090";
    WS_NODE_LIST_URL_NODE2 = "wss://node02.rsquared.digital:8090";
    WS_NODE_LIST_URL_NODE3 = "wss://node03.rsquared.digital:8090";
}

export {
    EES_BASE_URL,
    REGISTRATION_SERVICE_BASE_URL,
    RECAPTCHA_KEY,
    DEFAULT_WS_NODE,
    WS_NODE_LIST_URL_NODE1,
    WS_NODE_LIST_URL_NODE2,
    WS_NODE_LIST_URL_NODE3
};
