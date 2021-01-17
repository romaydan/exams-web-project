import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  deleteQuestion,
  getQuestions,
} from '../../shared/services/questionService';
import QuestionsTable from '../components/QuestionsTable';

function Questions(props) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function populateQuestions() {
      const { data: questions } = await getQuestions();
      setQuestions(questions);
    }

    populateQuestions();
  }, []);

  const handleDelete = async (question) => {
    const originalQuestions = questions;
    const newQuestions = originalQuestions.filter(
      (q) => q._id !== question._id
    );
    setQuestions(newQuestions);

    try {
      await deleteQuestion(question._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This question has already been deleted.');

      setQuestions(originalQuestions);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <QuestionsTable questions={questions} onDelete={handleDelete} />
        <Link
          to="/questions/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Question
        </Link>
      </div>
    </div>
  );
}

export default Questions;
