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
      handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, { title: inputValue, hexcode: '#ff5722' }];
        }
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
      };
    
      handleEditInputChange = e => {
        this.setState({ editInputValue: e.target.value });
      };
    
      handleEditInputConfirm = () => {
        this.setState(({ tags, editInputIndex, editInputValue, color }) => {
          const newTags = [...tags];
          newTags[editInputIndex].title = editInputValue;
          newTags[editInputIndex].hexcode = color;
          return {
            tags: newTags,
            editInputIndex: -1,
            editInputValue: '',
          };
        });
      };
    
      handleColorChange = color => {
        this.setState({ color: color.hex });
      };
    
      saveInputRef = input => {
        this.input = input;
      };
    
      saveEditInputRef = input => {
        this.editInput = input;
      };