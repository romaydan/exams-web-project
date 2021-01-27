import http from './httpService';

const apiEndpoint = '/students';

const studentUrl = (id) => {

    return `${apiEndpoint}/${id}`;
}

export const getstudents = () => {
    return http.get(apiEndpoint);
}

export const getStudent = (studentId) => {
    return http.get(studentUrl(studentId));
}
export const submitStudentExam = (questionId, studentId, examId, answers) => {
    const body = { questionId: questionId, studentId: studentId, examId: examId, answers: answers };
    return http.put(`${apiEndpoint}/submit/${studentId}`, body)
}
export const saveStudent = (student) => {
    if (student._id) {
        const body = { ...student };
        delete body._id;
        return http.put(studentUrl(student._id), body);
    }
    return http.post(apiEndpoint, student);
}
export const saveStudentQuestion = (questionId, studentId, examId, answers) => {

    const body = { questionId: questionId, studentId: studentId, examId: examId, answers: answers };
    return http.put(`${apiEndpoint}/exam/${studentId}`, body);
}


export const deleteStudent = (studentId) => {
    return http.delete(studentUrl(studentId));
}
