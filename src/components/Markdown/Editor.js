import React from 'react';
import { useParams } from 'react-router-dom';
import { useRestfulFetch } from '../../hooks';
import marked from 'marked';
import { sampleText } from './sampleText';

const EditorFn = props => {
  const { moduleId } = useParams();
  const { data } = useRestfulFetch(`/modules/module/${moduleId}`);
  const [text, setText] = React.useState(sampleText);

  React.useEffect(() => {
    if (data) {
      setText(data.modulecontent);
    }
  }, [data]);

  const handleChange = evt => {
    const text = evt.target.value;
    setText(text);
  };

  const renderText = text => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Welcome to the Markdown Zone</h2>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <textarea
            onChange={handleChange}
            value={text}
            className="form-control dark-mode"
            rows="35"
          />
        </div>
        <div className="col-sm-6 dark-mode">
          <div
            className="dark-mode"
            dangerouslySetInnerHTML={renderText(text)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorFn;
