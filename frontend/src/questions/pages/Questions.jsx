import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Pagination from '../components/Pagination';
import QuestionsTable from '../components/QuestionsTable';

import {
  deleteQuestion,
  getQuestions,
} from '../../shared/services/questionService';
import { paginate } from '../../shared/utils/paginate';

function Questions(props) {
  const { fieldOfStudy } = props;

  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

  useEffect(() => {
    async function populateQuestions() {
      const { data } = await getQuestions(fieldOfStudy);

      setQuestions(data);
    }

    populateQuestions();
  }, [fieldOfStudy]);

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const getPagedData = () => {
    const sorted = _.orderBy(questions, [sortColumn.path], [sortColumn.order]);
    const newQuestions = paginate(sorted, currentPage, pageSize);

    return newQuestions;
  };

  return (
    <div>
      <h1>
        Available questions for
        <span className="text-primary">
          {` ${fieldOfStudy && fieldOfStudy.name}`}
        </span>
      </h1>

      <p>Showing {questions.length} questions in the database.</p>

      <QuestionsTable
        questions={getPagedData()}
        sortColumn={sortColumn}
        onDelete={handleDelete}
        onSort={handleSort}
      />

      <Pagination
        itemsCount={questions.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        setPageSize={setPageSize}
      />

      <Link to="/questions/new" className="btn btn-primary pull-right">
        New Question &raquo;
      </Link>

      <button onClick={props.history.goBack} className="btn btn-primary">
        &laquo; Back
      </button>
    </div>
  );
}

export default Questions;
