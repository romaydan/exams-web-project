import http from './httpService';

const apiEndpoint = '/exams';

const examUrl = (id) => {
    return `${apiEndpoint}/${id}`;
}

export const getExams = () => {
    return http.get(apiEndpoint);
}

export const getExam = (examId) => {
    return http.get(examUrl(examId));
}

export const saveExam = (exam) => {
    if (exam._id) {
        const body = { ...exam };
        delete body._id;
        return http.put(examUrl(exam._id), body);
    }

    return http.post(apiEndpoint, exam);
}

export const deleteExam = (examId) => {
    return http.delete(examUrl(examId));
}
