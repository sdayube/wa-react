import { styled } from '..';

export const Header = styled('header', {
  padding: '2rem 0',
  backgroundColor: '$title',
  color: '$background',
  textAlign: 'center',
  h1: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.25,
    margin: '0 0 0.5rem',
  },
});

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  margin: '2rem 0',
  gap: '0.5rem',
  '@bp1': {
    flexDirection: 'column',
    padding: '0 1.5rem',
  },
});

export const Input = styled('input', {
  padding: '0.5rem 1rem',
  outline: 'none',
  border: '1px solid $borderGray',
  borderRadius: '4px',
  fontSize: '1rem',
  lineHeight: 1.25,
  color: '$text',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:focus': {
    border: '1px solid $borderBlue',
  },
});

export const Button = styled('button', {
  padding: '0.5rem 1rem',
  background: 'none',
  outline: 'none',
  border: '1px solid $borderBlue',
  borderRadius: '4px',
  fontSize: '1rem',
  lineHeight: 1.25,
  color: '$borderBlue',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '$borderGray',
  },
});

export const JobsContainer = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  justifyContent: 'center',
  listStyle: 'none',
  padding: '1rem',
  width: '100%',
  maxWidth: '1500px',
  margin: '0 auto',
});

export const Card = styled('li', {
  padding: '1.25rem',
  border: '1px solid $borderGray',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  width: '28rem',
  '&:hover': {
    borderLeft: '4px solid $borderBlue',
    boxShadow: '0 15px 20px -19px rgb(0 0 0 / 20%)',
  },
  h2: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '$title',
    marginBottom: '0.5rem',
    lineHeight: '1.375rem',
    maxWidth: '310px',
  },
  h3: {
    fontSize: '0.8125rem',
    fontWeight: '600',
    lineHeight: '1.125rem',
  },
  div: {
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    display: '-webkit-box',
    margin: '0.75rem 0 1rem',
    maxHeight: '65px',
    overflow: 'hidden',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
});
