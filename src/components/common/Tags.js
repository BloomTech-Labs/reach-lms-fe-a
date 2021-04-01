import React from 'react';
import { CirclePicker } from 'react-color';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class Tags extends React.Component {
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

  render() {
    const {
      tags,
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    return (
      <>
        <CirclePicker
          colors={['#673ab7', '#3f51b5', '#ffc107', '#ff9800', '#ff5722']}
          circleSize={20}
          onChangeComplete={this.handleColorChange}
        />
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.title.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag.title}
              closable={index !== 0}
              onClose={() => this.handleClose(tag)}
              color={tag.hexcode}
            >
              <span
                onDoubleClick={e => {
                  if (index !== 0) {
                    this.setState(
                      { editInputIndex: index, editInputValue: tag.title },
                      () => {
                        this.editInput.focus();
                      }
                    );
                    e.preventDefault();
                  }
                }}
              >
                {isLongTag ? `${tag.title.slice(0, 20)}...` : tag.title}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag.title} key={tag.title}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    );
  }
}

export default Tags;