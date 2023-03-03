import IRestaurantInput from '@res/interfaces/IRestaurantInput';

const sortItemsByName = (items: IRestaurantInput[]) => {
  const regex = /([a-zA-Z]+)?([^a-zA-Z]*)/;

  items.sort((a, b) => {
    const aMatches = a.name.match(regex);
    const bMatches = b.name.match(regex);

    if (!aMatches || !bMatches) {
      return a.name.localeCompare(b.name);
    }

    const aEnglish = aMatches[1];
    const bEnglish = bMatches[1];

    if (aEnglish && bEnglish && aEnglish !== bEnglish) {
      return aEnglish.localeCompare(bEnglish);
    }

    return a.name.localeCompare(b.name);
  });
};

export default sortItemsByName;
