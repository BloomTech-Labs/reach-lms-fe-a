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
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
      };
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      };
    
      handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
      };