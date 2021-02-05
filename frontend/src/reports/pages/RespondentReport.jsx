import { useState, useEffect } from 'react';

import SearchBox from '../components/SearchBox';
import RespondentsTable from '../components/RepondentsTable';
import ExamsTable from '../components/ExamsTable';

import { getStudents } from '../../shared/services/studentService';
import { calculateAverageGrade } from '../../shared/utils/calculate';

function RespondentReport(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [respondent, setRespondent] = useState();

  useEffect(() => {
    async function populateStudents() {
      const { data } = await getStudents();

      setStudents(data);
    }

    populateStudents();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const getFilteredData = () => {
    if (!searchQuery) return [];

    if (searchQuery === ' ') return students;

    return students.filter((s) =>
      s.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  };

  const handleExamClick = (id) => {
    props.history.push(`/reports/respondent/${id}`);
  };

  return (
    <div>
      <h1>Report by Respondent Name</h1>

      <br />

      <div>
        <h3>Find a respondent</h3>

        <p>
          To find a respondent, start typing a name below. Then select a
          respondent from the list that will appear.
          <br />
          Tip: To show all respondents, press the spacebar
        </p>

        <SearchBox value={searchQuery} onChange={handleSearch} />

        <RespondentsTable
          respondents={getFilteredData()}
          setRespondent={setRespondent}
        />
      </div>

      <br />

      {respondent && (
        <div>
          <h3>
            Activity Report for:
            <span className="text-primary">{` ${respondent.firstName} ${respondent.lastName}`}</span>
          </h3>

          <div className="d-flex justify-content-between">
            <p>Click a test to show its results</p>

            <p className="font-weight-bold">
              Average grade for a test:{' '}
              {calculateAverageGrade(respondent.exams)}
            </p>
          </div>

          <ExamsTable exams={respondent.exams} onClick={handleExamClick} />
        </div>
      )}

      <button onClick={props.history.goBack} className="btn btn-primary">
        &laquo; Back
      </button>
    </div>
  );
}

export default RespondentReport;
