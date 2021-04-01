import React from 'react';
import { CirclePicker } from 'react-color';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class ColorPickerUtility extends React.Component {
    state = {
      tags: [
        { title: 'Unremovable', hexcode: '#673ab7' },
        { title: 'Tag 2', hexcode: '#ffc107' },
      ],
      inputVisible: false,
      inputValue: '',
      editInputIndex: -1,
      editInputValue: '',
      color: '#ff5722',
    };