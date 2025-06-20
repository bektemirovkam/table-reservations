import { useStrictContext } from '@/shared/lib/react';
import { ModalContext } from './modal-context';

export const useModal = () => {
  const context = useStrictContext(ModalContext);
  return context;
};