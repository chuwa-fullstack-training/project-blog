import React, { useEffect, useState } from 'react';
import { List, Avatar, Skeleton, Space, Button, Typography, Modal } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { fetchMessagesAction, deleteMessageAction } from 'app/messageSlice';
import styles from './style.module.css';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default function MessageList() {
  const dispatch = useDispatch();
  const { messages, status } = useSelector(state => state.messages);
  const { user } = useSelector(state => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageId, setMessageId] = useState(null);

  const showModal = id => () => {
    setIsModalOpen(true);
    setMessageId(id);
  };

  useEffect(() => {
    dispatch(fetchMessagesAction());
  }, []);

  const handleDelete = () => {
    const { user } = messages.find(message => message._id === messageId);
    dispatch(deleteMessageAction({ messageId, userId: user._id })).then(() => {
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <List
        className={styles.list}
        itemLayout="vertical"
        size="large"
        loading={status === 'pending'}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 4
        }}
        dataSource={messages}
        renderItem={(item, idx) => (
          <List.Item
            key={idx}
            actions={
              user.id === item.user._id && [
                <Button type="link" key="edit" size="small">
                  edit
                </Button>,
                <Button
                  key="delete"
                  type="link"
                  size="small"
                  onClick={showModal(item._id)}
                >
                  delete
                </Button>
              ]
            }
            extra={
              <IconText
                icon={LikeOutlined}
                text={Math.floor(Math.random() * 100 + 1)}
              />
            }
          >
            <Skeleton
              avatar
              title={false}
              loading={status === 'pending'}
              active
            >
              <List.Item.Meta
                avatar={<Avatar src={item.user.profileImageUrl} size="large" />}
                title={item.user.username}
                description={dayjs(item.createdAt).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              />
              <Typography.Paragraph style={{ fontSize: '1.1rem' }}>
                {item.text}
              </Typography.Paragraph>
            </Skeleton>
          </List.Item>
        )}
      />
      <Modal
        title="Delete Confirm"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleDelete}
        confirmLoading={status === 'pending'}
      >
        <p>Are you sure you want to delete this message?</p>
      </Modal>
    </>
  );
}
