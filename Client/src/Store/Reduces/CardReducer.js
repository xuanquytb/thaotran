import {
  ADD_PRODUCT_CARD,
  DELETE_PRODUCT_CARD,
  SET_SUMMONEY_CARD,
} from "../Context/Constants";

const InitCard = {
  cards: [],
  sumMoney: 0,
};

const cardReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCT_CARD:
      return {
        ...state,
        cards: payload,
      };
    case SET_SUMMONEY_CARD:
      return {
        ...state,
        sumMoney: payload,
      };
    case DELETE_PRODUCT_CARD:
      let newcart = state.cards;
      const objIndex = newcart.findIndex((obj) => obj.id == payload.id);
      newcart.splice(objIndex, 1);
      return { cards: [...newcart], totalprice: 0 };
    default:
      return state;
  }
};

// export { InitCard };
// export default cardReducer;

// import { ADD_PRODUCT_CARD, DELETE_PRODUCT_CARD } from "../Context/Constants";

// const InitCard = {
//   cards: [],
// };

// const cardReducer = (state, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case ADD_PRODUCT_CARD:
//       const productInCart = state.cards.find((p) => p.id === payload.id);
//       if (!productInCart) {
//         return {
//           cards: [...state.cards, payload],
//         };
//       } else {
//         let newcart = state.cards;
//         const objIndex = newcart.findIndex((obj) => obj.id == payload.id);
//         if (newcart[objIndex].quantity === undefined) {
//           newcart[objIndex].quantity = 2;
//         } else {
//           newcart[objIndex].quantity = newcart[objIndex].quantity + 1;
//         }

//         return { cards: [...newcart] };
//       }
//     case DELETE_PRODUCT_CARD:
//       let newcart = state.cards;
//       const objIndex = newcart.findIndex((obj) => obj.id == payload.id);
//       newcart.splice(objIndex, 1);
//       return { cards: [...newcart], totalprice: 0 };
//     default:
//       return state;
//   }
// };

export { InitCard };
export default cardReducer;
