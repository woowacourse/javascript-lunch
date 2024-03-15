// import createElementByTag from "../../../utils/createElementByTag";

// class RestaurantDetail{
//   #element:HTMLElement=document.createElement("section");

//   #categoryDiv=this.#createCategoryDiv();

//   #name:HTMLElement= createElementByTag({
//     tag: "h2",
//     classes: ["text-title"],
//   });

//   #distance:HTMLElement = createElementByTag({
//     tag: "span",
//     classes: [ "text-body"],
//   });

//   #description:HTMLElement= createElementByTag({
//     tag: "p",
//     classes: [ "text-body"],
//   });

//   #url:HTMLElement= createElementByTag({
//     tag: "a"
//   });

//   constructor(){
//     this.#element.append(this.#categoryDiv,this.#name,this.#distance,this.#description,this.#url);
//   }

//   setDetail(restaurant:Restaurant){
//     this.#name.textContent=restaurant.name;
//     this.#distance=
//   }
//   #createCategoryDiv() {
//     const div = createElementByTag({
//       tag: "div",
//       classes: ["restaurant__category"],
//     });
//     const img = createElementByTag({
//       tag: "img",
//       classes: ["category-icon"],
//     });

//     div.appendChild(img);
//     return div;
//   }

// }
