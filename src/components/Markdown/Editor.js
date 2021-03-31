import React from 'react';
import { useParams } from 'react-router-dom';
import { useRestfulFetch } from '../../hooks';
import marked from 'marked';
import { sampleText } from './sampleText';
import Styled from './Editor.styles';

const EditorFn = () => {
  const { moduleId } = useParams();
  const { data } = useRestfulFetch(`/modules/markdown/${moduleId}`);
  const [text, setText] = React.useState(sampleText);

  React.useEffect(() => {
    if (data) {
      setText(data);
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
    <Styled.Content>
      <div className="container">
        <Styled.Header>
          <h2>Module Markdown Editor</h2>
        </Styled.Header>
        <div className="row">
          <div className="col-sm-6">
            <textarea
              onChange={handleChange}
              value={text}
              className="form-control"
              rows="100"
            />
          </div>
          <div className="col-sm-6">
            <div
              className="dark-mode"
              dangerouslySetInnerHTML={renderText(text)}
            />
          </div>
        </div>
      </div>
    </Styled.Content>
  );
};
export default EditorFn;
