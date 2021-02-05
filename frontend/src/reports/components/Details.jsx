import PropTypes from 'prop-types';
import { Accordion, Card } from 'react-bootstrap';

const Details = (props) => {
  const { answeredQuestions } = props;

  const applyDynamicClassNames = (answeredQ, possibleA) => {
    let className = '';

    if (possibleA.isCorrect) className = 'text-success';

    if (answeredQ.answers.some((a) => a._id === possibleA._id && a.isCorrect))
      className = 'font-weight-bold text-success';

    if (answeredQ.answers.some((a) => a._id === possibleA._id && !a.isCorrect))
      className = 'font-weight-bold text-danger';

    return className;
  };

  return (
    <div>
      <h3>Details</h3>

      <p>
        Click a question to see which of its answers were selected and whether
        they were correct.
      </p>

      <Accordion defaultActiveKey="0">
        {answeredQuestions.map((answeredQ, index) => (
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{answeredQ.question.text}</span>

                {answeredQ.answers.every((a) => a.isCorrect === true) ? (
                  <span className="font-weight-bold text-success">Correct</span>
                ) : (
                  <span className="font-weight-bold text-danger">
                    Incorrect
                  </span>
                )}
              </div>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                <h6>Answers:</h6>

                {answeredQ.question.possibleAnswers.map((possibleA) => (
                  <div className={applyDynamicClassNames(answeredQ, possibleA)}>
                    {possibleA.answer}
                  </div>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

Details.propTypes = {
  answeredQuestions: PropTypes.array.isRequired,
};

export default Details;
