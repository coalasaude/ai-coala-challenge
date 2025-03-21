import { createState } from '@ui/utilities/state/utils/createState';
import { AtomEffect } from 'recoil';

const STORAGE_KEY = 'chatHistory';

export const syncStorageEffect =
  <T extends ChatState>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet, trigger }) => {
    if (trigger === 'get') {
      const chatHistory = sessionStorage.getItem(key);
      if (chatHistory !== null) {
        setSelf(JSON.parse(chatHistory));
      }
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export type ChatMessages = {
  type: 'human' | 'ai';
  content: string;
};

export type ChatState = {
  threadId: string;
  messages: ChatMessages[];
  query: string;
};

export const chatState = createState<ChatState>({
  key: 'chatState',
  defaultValue: {
    threadId: '',
    messages: [],
    query: '',
  },
  effects: [syncStorageEffect<ChatState>(STORAGE_KEY)],
});
