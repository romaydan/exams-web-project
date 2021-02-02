import http from './httpService';

const apiEndpoint = '/examInstances';

function examInstanceUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getExamInstances(exam) {
  return http.get(apiEndpoint, { params: exam });
}

export function getExamInstance(examInstanceId) {
  return http.get(examInstanceUrl(examInstanceId));
}
