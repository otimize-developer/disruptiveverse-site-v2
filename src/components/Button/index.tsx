import { ReactNode } from 'react';

import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

import * as S from './styles';

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => (
  <S.Button colorScheme="blue" {...props}>
    {children}
  </S.Button>
);
