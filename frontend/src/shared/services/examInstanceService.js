import http from './httpService';

const apiEndpoint = '/examInstances';

function examInstanceUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getExamInstances(exam, dateRange) {
  return http.get(apiEndpoint, { params: { exam, dateRange } });
}

export function getExamInstance(examInstanceId) {
  return http.get(examInstanceUrl(examInstanceId));
}
