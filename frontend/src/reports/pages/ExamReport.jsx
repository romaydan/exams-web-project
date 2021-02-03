import { useEffect, useState } from 'react';

import { getExams } from '../../shared/services/examService';

function ExamReport(props) {
  const { fieldOfStudy } = props;

  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState();
  // const [startDate, setStartDate] = useState();
  // const [endDate, setEndDate] = useState();

  useEffect(() => {
    async function populateExams() {
      const { data } = await getExams(fieldOfStudy);

      setExams(data);
    }

    populateExams();
  }, [fieldOfStudy]);

  const handleSubmit = (e) => {
    e.preventDefault();

    props.history.push(`/reports/exam/${exam._id}`);
  };

  const handleExamChange = (e) => {
    const { currentTarget: input } = e;
    const newExam = exams.find((e) => e.name === input.value);

    setExam(newExam);
  };

  // const handleDateChange = (e) => {
  //   const { currentTarget: input } = e;
  //   const newDate = new Date(input.value);

  //   input.name === 'from' ? setStartDate(newDate) : setEndDate(newDate);
  // };

  return (
    <div>
      <h1>
        Test Report for
        <span style={{ color: '#007bff' }}>
          {` ${fieldOfStudy && fieldOfStudy.name}`}
        </span>
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exam">Select Exam:</label>

          <select
            name="exam"
            id="exam"
            value={exam && exam.name}
            onChange={handleExamChange}
            className="form-control"
          >
            <option value="" />
            {exams.map((item) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="form-group">
          <label htmlFor="dateRange">Date Range:</label>

          <div className="form-group">
            <div className="form-inline">
              <label htmlFor="from">From:</label>

              <input
                name="from"
                id="from"
                type="date"
                className="form-control ml-2 mr-4"
                onChange={handleDateChange}
              />

              <label htmlFor="to">To:</label>

              <input
                name="to"
                id="to"
                type="date"
                className="form-control ml-2"
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div> */}

        <button
          disabled={!exam}
          type="submit"
          className="btn btn-primary pull-right"
        >
          Generate Report &raquo;
        </button>

        <button
          type="button"
          onClick={props.history.goBack}
          className="btn btn-primary"
        >
          &laquo; Back
        </button>
      </form>
    </div>
  );
}

export default ExamReport;
