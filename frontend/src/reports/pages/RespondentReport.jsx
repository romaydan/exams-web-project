import { useEffect, useState } from 'react';

import SearchBox from '../components/SearchBox';
import RespondentsTable from '../components/RepondentsTable';
import ExamsTable from '../components/ExamsTable';

import { getStudents } from '../../shared/services/studentService';

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

    return students.filter((s) =>
      s.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  };

  const calculateAverageGrade = (exams) => {
    const grades = [];

    exams.forEach((e) => grades.push(e.grade));

    return grades.reduce((a, c) => a + c) / grades.length;
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
            Activity Report for:{' '}
            {`${respondent.firstName} ${respondent.lastName}`}
          </h3>

          <p>
            Average grade for a test: {calculateAverageGrade(respondent.exams)}
          </p>

          <ExamsTable exams={respondent.exams} />
        </div>
      )}
    </div>
  );
}

export default RespondentReport;
