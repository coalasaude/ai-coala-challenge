import { ChatPreTag } from '@/gemini-chat/components/ChatPreTag';
import { ChatState, chatState } from '@/gemini-chat/states/chatState';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

const StyledContainerWrapper = styled.div`
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing(8)};
  width: 100%;
  height: 100%;
  overflow-y: auto;

  /* Width of the entire scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Handle (the draggable part) */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border.color.strong};
    border-radius: 5px;
    cursor: pointer;
  }
`;

const StyledMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-end;
  width: 100%;
`;

export const MessagesDisplay = () => {
  const [{ threadId, messages }] = useRecoilState<ChatState>(chatState);
  return (
    <StyledContainerWrapper>
      <StyledMessageContainer>
        {messages.map((message) => (
          <ChatPreTag
            value={message.content}
            key={`${threadId}${Math.random() * Math.random()}`}
            variant={message.type}
          />
        ))}
      </StyledMessageContainer>
    </StyledContainerWrapper>
  );
};
