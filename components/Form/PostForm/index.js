import { Avatar, Button, Form, Upload } from 'antd';
import React, { useCallback, useRef } from 'react';
import Img from 'next/image';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import {
  CloseCircleTwoTone,
  PictureTwoTone,
  UserOutlined,
} from '@ant-design/icons';

import { Input } from 'antd';
import useInput from '../../../lib/hooks/useInput';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  addPost,
  removeImage,
  uploadImages,
} from '../../../reducers/post/post.slice';
import { useDispatch, useSelector } from 'react-redux';

const { TextArea } = Input;

const StyledButton = styled(Button)`
  background: #8ed0f9;
`;
const StyledTextArea = styled(TextArea)`
  padding: 12px;
  background-color: black;
`;
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
  /* background-color: black; */
  border-top: 1px solid #ebeef0;
  /* align-self: flex-end;
  justify-self: flex-end; */
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
  const [value, onChange, setValue] = useInput('');
  const imageInput = useRef();
  const { imagePaths } = useSelector(({ post }) => post);
  const dispatch = useDispatch();
  const onChangeImages = useCallback(
    (e) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (file) => {
        imageFormData.append('image', file);
      });
      dispatch(uploadImages(imageFormData));
    },
    [dispatch],
  );
  const onUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
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
      alert('서버 에러');
    }
  }, [value, imagePaths, dispatch]);
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

          {imagePaths.map((v, i) => (
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
            <StyledButton
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
            >
              트윗
            </StyledButton>
          </RightBottom>
        </RightWrapper>
      </Wrapper>
    </Form>
  );
};

export default PostForm;
