import { ChatPreTag } from '@/gemini-chat/components/ChatPreTag';
import { ChatState, chatState } from '@/gemini-chat/states/chatState';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

const StyledMessageContainer = styled.div`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing(8)};
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-end;
  overflow-y: auto;
`;

export const MessagesDisplay = () => {
  const [{ threadId, messages }] = useRecoilState<ChatState>(chatState);
  return (
    <StyledMessageContainer>
      {messages.map((message) => (
        <ChatPreTag
          value={message.content}
          key={`${threadId}${Math.random() * Math.random()}`}
          variant={message.type}
        />
      ))}
    </StyledMessageContainer>
  );
};
