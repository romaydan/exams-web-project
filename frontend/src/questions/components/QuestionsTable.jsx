function QuestionsTable({ questions, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Question Text</th>
          <th>Last Update</th>
          <th>Question Type</th>
          <th># of Tests</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {questions.map((q) => (
          <tr key={q._id}>
            <td>
              {q.text}
              <div style={{ fontSize: 12, color: 'blue' }}>
                {q.tags.map((t) => `${t} | `)}
              </div>
            </td>
            <td>{new Date(q.lastUpdate).toLocaleDateString()}</td>
            <td>{q.type === 0 ? 'Single' : 'Multiple'}</td>
            <td></td>
            <td>
              <button className="btn btn-info btn-sm mr-4">Edit</button>
              <button
                onClick={() => onDelete(q)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default QuestionsTable;
