import React from 'react';

const CollectionGameCard = props => {
  const { card, flipCard, showHint, toggleHint, visibleSide } = props;
  const { id, question, answer, hint } = card;

  return (
    <div className="card border-info text-center">
      <div className="card-header">
        <h2>{visibleSide}</h2>
        <h3>{id}</h3>
      </div>
      {visibleSide === 'question'
        ? <div className="card-body">
            <div className="card-question">
              {question}
            </div>
            <div className="card-hint">
              <div>Hint:</div>
              {showHint && <p>{hint}</p>}
              <button className="btn btn-info" onClick={() => toggleHint()}>{showHint ? 'Hide' : 'Show'}</button>
            </div>
          </div>
        : <div className="card-body">
            <div className="card-answer">
              {answer}
            </div>
          </div>}
      <div className="card-footer">
        <button onClick={() => flipCard()} className="btn btn-warning">
          View {visibleSide === 'question' ? 'Answer' : 'Question'}
        </button>
      </div>
    </div>
  );
};

export default CollectionGameCard;
