import styled from '@emotion/styled';

const StyledPre = styled.pre<{
  variant?: 'human' | 'ai' | undefined;
}>`
  align-self: ${({ variant }) =>
    variant === 'human' ? 'flex-end' : 'flex-start'};
  background: ${({ theme }) => theme.background.noisy};
  border: 2px solid ${({ theme }) => theme.border.color.light};
  box-shadow: ${({ theme }) => theme.boxShadow.strong};
  border-radius: ${({ theme }) => theme.border.radius.md};
  color: ${({ theme }) => theme.font.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: ${({ theme }) => theme.font.size.lg};
  max-width: ${({ theme }) => theme.spacing(120)};
  padding: ${({ theme }) => theme.spacing(4)};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

type ChatPreTagProps = {
  variant?: 'human' | 'ai' | undefined;
  value?: string;
};

export const ChatPreTag = ({ value, variant = 'human' }: ChatPreTagProps) => {
  return <StyledPre variant={variant}>{value}</StyledPre>;
};
