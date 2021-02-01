import http from './httpService';

const apiEndpoint = '/examInstances';

function examInstanceUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// export function getQuestions(fieldOfStudy) {
//   return http.get(apiEndpoint, { params: fieldOfStudy });
// }

export function getExamInstance(examInstanceId) {
  return http.get(examInstanceUrl(examInstanceId));
}
