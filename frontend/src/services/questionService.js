import http from './httpService';

const apiEndpoint = '/questions';

function questionUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getQuestions() {
  return http.get(apiEndpoint);
}

export function getQuestion(questionId) {
  return http.get(questionUrl(questionId));
}

export function saveQuestion(question) {
  if (question._id) {
    const body = { ...question };
    delete body._id;
    return http.put(questionUrl(question._id), body);
  }

  return http.post(apiEndpoint, question);
}

export function deleteQuestion(questionId) {
  return http.delete(questionUrl(questionId));
}
