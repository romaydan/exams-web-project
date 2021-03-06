import http from './httpService';

const apiEndpoint = '/questions';

function questionUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getQuestions(fieldOfStudy) {
  return http.get(apiEndpoint, { params: fieldOfStudy });
}

export function getQuestion(questionId) {
  return http.get(questionUrl(questionId));
}

export function saveQuestion(question, fieldOfStudy) {
  if (question._id) {
    const body = { ...question };
    delete body._id;
    body.possibleAnswers.forEach((a) => delete a._id);

    return http.put(questionUrl(question._id), body);
  }

  question.fieldsOfStudy = [fieldOfStudy];

  return http.post(apiEndpoint, question);
}

export function deleteQuestion(questionId) {
  return http.delete(questionUrl(questionId));
}
