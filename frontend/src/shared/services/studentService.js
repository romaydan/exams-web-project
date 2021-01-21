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

export const saveStudent = (student) => {
    if (student._id) {
        const body = { ...student };
        delete body._id;
        return http.put(studentUrl(student._id), body);
    }
    return http.post(apiEndpoint, student);
}
export const saveStudentQuestion = (question, studentID, answers) => {

    const body = { questionId: question, studentID: studentID, answers: answers };
    return http.put(studentUrl(studentID), body);
}


export const deleteStudent = (studentId) => {
    return http.delete(studentUrl(studentId));
}
