import React from 'react';
import SplitFrame from './SplitFrame';
import { Checkbox, Card } from 'antd';

const UserEnrolledCheckbox = props => {
  const [checked, setChecked] = React.useState(props.value);

  const onChange = e => {
    setChecked(e.target.checked);
    if (!checked) {
      props.attach(props.userid, props.courseid);
    } else {
      props.detach(props.userid, props.courseid);
    }
  };

  return (
    <div>
      <SplitFrame
        left={<Checkbox checked={checked} onChange={onChange} />}
        right={
          <Card style={{ width: '250px' }}>
            <p>{props.username}</p>
          </Card>
        }
      />
    </div>
  );
};

export default UserEnrolledCheckbox;
