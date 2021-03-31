import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBaseParams } from '../../utils/axiosWithAuth.js';

const uploadprops = url => {
  return {
    ...getBaseParams(),
    name: 'file',
    action: url,

    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
};

const FileUploader = props => {
  return (
    <Upload {...uploadprops(props.url)}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default FileUploader;
