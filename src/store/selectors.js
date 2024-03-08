import { selector } from 'recoil';
import { formState } from './atoms';

export const formDataSelector = selector({
  key: 'formDataSelector',
  get: ({ get }) => {
    const form = get(formState);
    return form;
  },
});
