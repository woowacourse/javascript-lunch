// const RestaurantValidator = {
//   validateUserInput(userInput) {
//     this.validateRestaurantName(userInput.name);
//     this.validateRestaurantRestaurantCategory(userInput.category);
//     this.validateRestaurantMinutesWalk(userInput.minutesWalk);
//   },

//   validateRestaurantName(inputData: string) {
//     const isNameLengthOutOfRange = inputData.length < 1 || inputData.length > 20;
//     if (isNameLengthOutOfRange) {
//       throw new Error('1글자 이상 20글자 이하로 입력해주세요.');
//     }

//     const isNameBlank = [...new Set(inputData)].join('') === ' ';
//     if (isNameBlank) {
//       throw new Error('공백을 제외하고 1글자 이상 입력해주세요.');
//     }
//   },

//   validateRestaurantRestaurantCategory(inputData) {
//     if (!inputData) {
//       throw new Error('카테고리를 선택해주세요.');
//     }
//   },

//   validateRestaurantMinutesWalk(inputData) {
//     if (!inputData) {
//       throw new Error('거리(도보 이동 시간)을 선택해주세요.');
//     }
//   },

//   validateRestaurantOverlapping(restaurants, inputData) {
//     restaurants.forEach((restaurant) => {
//       if (restaurant.getName() === inputData.name)
//         throw new Error('이미 존재하는 음식점 이름입니다. 다른 음식점을 입력해주세요.');
//     });
//   },
// };

// export default RestaurantValidator;
