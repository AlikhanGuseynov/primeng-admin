// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const REST_API_URL = 'https://tab.az/api';


export const environment = {
  production: false,
  gnocaptcha: '6LckpqwZAAAAAHlUd5G-4kyiwC9zyjjKLUWA9JTG',
  nspSecretKey: 't0s5j-!fi5@((=vv6)kktn!0%95jks9kh==*&o$v!^ya6wtcl%',
  authKey: 'Authorization',
  imagePath: 'https://tab.az/api/files/',
  URLS: {
    REGISTER: REST_API_URL + '/auth/users/register-tenant',
    LOGIN: REST_API_URL + '/auth/token',
    LOGOUT: REST_API_URL + '/auth/log-out',
    PROFILEINFO: REST_API_URL + '/tenant/users',
    REFRESHTOKEN: REST_API_URL + '/auth/refresh-token',// POST
    LOCALIZATION_PREFIX: REST_API_URL + '/localization/translation/tab-',
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
