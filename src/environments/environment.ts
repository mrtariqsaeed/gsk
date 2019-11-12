// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  typesAPI: "http://localhost:8080/gsk/types.php",
  assessorsAPI: "http://localhost:8080/gsk/assessors.php",
  currentAPI: "http://localhost:8080/gsk/current.php",
  empDataAPI: "http://localhost:8080/gsk/emp.php",
  reviewAPI: "http://localhost:8080/gsk/review.php",
  updateCurrentAPI: "http://localhost:8080/gsk/updateCurrent.php",
  teamsAPI: "http://localhost:8080/gsk/teams.php",
  currentIDsAPI: "http://localhost:8080/gsk/currentIDs.php",
  nextEmpAPI: "http://localhost:8080/gsk/nextEmp.php"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
