import { regex } from '@res/constants/regex';

interface a {
  [key: string]: (input: string) => boolean;
}

export const validatorUtils: a = {
  name: (input: string): boolean => {
    console.log(regex.nameInputLength.test(input), input, 'name');
    return regex.nameInputLength.test(input);
  },
  category: (input: string): boolean => {
    console.log(input !== '', input, 'category');
    return input !== '';
  },
  distance: (input: string): boolean => {
    console.log(input !== '', input, 'distance');
    return input !== '';
  },
  description: (input: string): boolean => {
    console.log(regex.descriptionInputLength.test(input), input, 'description');
    return regex.descriptionInputLength.test(input);
  },
  link: (input: string): boolean => {
    console.log(input === '' || regex.urlInput.test(input), input, 'link');
    return regex.urlInput.test(input);
  },
};

// export const validatorUtils: a = {
//   name: (input: string): boolean => regex.nameInputLength.test(input),
//   category: (input: string): boolean => input !== '',
//   distance: (input: string): boolean => input !== '',
//   description: (input: string): boolean =>
//     regex.descriptionInputLength.test(input),
//   link: (input: string): boolean => regex.urlInput.test(input),
// };
