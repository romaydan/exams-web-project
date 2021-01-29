import { useEffect, useState } from 'react';

import { getExams } from '../../shared/services/examService';

function ExamReport(props) {
  const { fieldOfStudy } = props;

  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    async function populateExams() {
      const { data } = await getExams(fieldOfStudy);
      setExams(data);
    }

    populateExams();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    const newExam = exams[input.value];

    setExam(newExam);
  };

  return (
    <div>
      <h1>Exam Report for {fieldOfStudy && fieldOfStudy.name}</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exam">Select Exam:</label>

          <select
            name="exam"
            id="exam"
            onChange={handleChange}
            className="form-control"
          >
            <option value="" />
            {exams.map((item, index) => (
              <option key={item._id} value={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dateRange">Date Range:</label>

          <div className="form-group">
            <div className="form-inline">
              <label htmlFor="from">From:</label>

              <input
                name="from"
                id="from"
                type="date"
                className="form-control ml-2 mr-4"
                onChange={(e) =>
                  setStartDate(new Date(e.currentTarget.value).toISOString())
                }
              />

              <label htmlFor="to">To:</label>

              <input
                name="to"
                id="to"
                type="date"
                className="form-control ml-2"
                onChange={(e) =>
                  setEndDate(new Date(e.currentTarget.value).toISOString())
                }
              />
            </div>
          </div>
        </div>

        <button className="btn btn-primary">Generate Report</button>
      </form>
    </div>
  );
}

export default ExamReport;
