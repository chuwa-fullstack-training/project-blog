import apiCall from './api';

export const createMessage = async ({ userId, text }) => {
  return await apiCall({
    url: `http://localhost:8080/api/users/${userId}/messages`,
    method: 'POST',
    data: { text }
  });
};

export const fetchMessages = async () => {
  return await apiCall({
    url: 'http://localhost:8080/api/messages',
    method: 'GET'
  });
};

export const deleteMessage = async ({ userId, messageId }) => {
  console.log(userId, messageId);
  return await apiCall({
    url: `http://localhost:8080/api/users/${userId}/messages/${messageId}`,
    method: 'DELETE'
  });
};

// export const likeMessage = async (userId, messageId) => {
//   return await apiCall({
//     url: `http://localhost:8080/api/users/${userId}/messages/${messageId}/like`,
//     method: 'POST'
//   });
// };
