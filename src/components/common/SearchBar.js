import React from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = value => console.log(value);

const SearchBar = () => {
  return (
    <Space direction="vertical">
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </Space>
  );
};

export default SearchBar;
