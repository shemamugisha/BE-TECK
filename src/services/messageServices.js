import Models from '../database/models';

const { userMessage } = Models;

export const createMessage = async (message) => {
  const createdMessage = await userMessage.create(message);
  return createdMessage;
};

export const findAll = async () => {
  const fetchedMessages = await userMessage.findAll();
  return fetchedMessages;
};

export const findMessage = async (param) => {
  const fetchedMessage = await userMessage.findOne({ where: param });
  return fetchedMessage;
};

export const deleteMessage = async (param) => {
  const deletedMessage = await userMessage.destroy({ where: param });
  return deletedMessage;
};
