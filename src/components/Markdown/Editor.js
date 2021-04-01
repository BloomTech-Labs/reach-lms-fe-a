import React from 'react';
import { useParams } from 'react-router-dom';
import { useRestfulFetch } from '../../hooks';
import marked from 'marked';
import { sampleText } from './sampleText';
import { Button } from 'antd';
import Styled from './Editor.styles';
import { client } from '../../utils/api';

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

  function submitForm(e) {
    e.preventDefault();

    client.putMarkdown(moduleId, text);
  }

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
              className="textarea-html"
              dangerouslySetInnerHTML={renderText(text)}
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        <Button onClick={submitForm} type="secondary" className="button">
          Submit
        </Button>
      </div>
    </Styled.Content>
  );
};

export default EditorFn;
