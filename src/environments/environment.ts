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
  nextEmpAPI: "http://localhost:8080/gsk/nextEmp.php",
  assessorLoginAPI: "http://localhost:8080/gsk/assessorLogin.php",
  currentAssessorsAPI: "http://localhost:8080/gsk/currentAssessors.php",
  revoteAPI: "http://localhost:8080/gsk/revote.php",
  skipAPI: "http://localhost:8080/gsk/skip.php",
  statusAPI: "http://localhost:8080/gsk/status.php",
  deleteAssessorAPI: "http://localhost:8080/gsk/deleteAssessor.php",
  deleteAllAssessorsAPI: "http://localhost:8080/gsk/deleteAllAssessors.php",
  resetAPI: "http://localhost:8080/gsk/reset.php",
  newAPI: ""
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
