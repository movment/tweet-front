import {
  CloseCircleTwoTone,
  PictureTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { Avatar, Button, Form, Input, message } from 'antd';
import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img from 'next/image';
import styled from 'styled-components';
import useInput from '../../../lib/hooks/useInput';
import {
  addPost,
  removeImage,
  uploadImages,
} from '../../../reducers/post/post.slice';

const { TextArea } = Input;

const Wrapper = styled.div`
  display: flex;
  min-height: 122px;
  padding: 4px 16px;
`;
const LeftWrapper = styled.div`
  min-height: 122px;
  margin-right: 12px;
  padding-top: 4px;
  width: 48px;
`;
const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const RightBottom = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 52px;
  border-top: 1px solid #ebeef0;
`;
const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  & svg {
    font-size: 22px;
  }
  transition: background-color 0.2s;
  &:hover {
    background-color: rgb(232, 245, 254);
  }
`;

const PostForm = () => {
  const imageInput = useRef();
  const [value, onChange, setValue] = useInput('');

  const { imagePaths } = useSelector(({ post }) => post);
  const dispatch = useDispatch();

  const onChangeImages = useCallback(
    async (e) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (file) => {
        imageFormData.append('image', file);
      });
      try {
        const result = await dispatch(uploadImages(imageFormData));
        unwrapResult(result);
      } catch (error) {
        message.warning('Server Error');
      }
    },
    [dispatch],
  );
  const onUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput]);
  const onFinish = useCallback(async () => {
    try {
      const result = await dispatch(
        addPost({
          content: value,
          imagePaths,
        }),
      );
      unwrapResult(result);
      setValue('');
    } catch (error) {
      message.warning('Server Error');
    }
  }, [value, imagePaths, dispatch, setValue]);
  const onRemove = useCallback(() => {
    dispatch(removeImage());
  }, [dispatch]);

  return (
    <Form encType="multipart/form-data" onFinish={onFinish}>
      <Wrapper>
        <LeftWrapper>
          <Avatar size={48} icon={<UserOutlined />} />
        </LeftWrapper>
        <RightWrapper>
          <TextArea
            value={value}
            onChange={onChange}
            bordered={false}
            maxLength={140}
            placeholder="What's happening?"
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
          <div>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              hidden
              ref={imageInput}
              onChange={onChangeImages}
            />
          </div>
          {imagePaths.map((v) => (
            <ImgWrapper key={v}>
              <Img
                width="100%"
                height="100%"
                src={`https://doinki.com/images/${v}`}
                alt={v}
              />
              <CloseCircleTwoTone onClick={onRemove} />
            </ImgWrapper>
          ))}
          <RightBottom>
            <IconWrapper onClick={onUpload}>
              <PictureTwoTone />
            </IconWrapper>
            <Button htmlType="submit" type="primary" shape="round" size="large">
              트윗
            </Button>
          </RightBottom>
        </RightWrapper>
      </Wrapper>
    </Form>
  );
};

export default PostForm;
