import { useReducer } from "react";

const useReducerPersist = <S, A>(
  key: string,
  initialValue: S,
  reducer: (state: S, action: A) => S
) => {
  // const initializer = (initialValue: S): S => {
  //   const v = localStorage.getItem(key);
  //   // if there was nothing saved then initialize it with the default value
  //   if (v === null) {
  //     localStorage.setItem(
  //       key,
  //       JSON.stringify(initialValue)
  //     );
  //     return initialValue;
  //   }
  //   // otherwise try to parse the value saved
  //   // and initialize the state with that value
  //   try {
  //     return JSON.parse(v) as S;
  //   } catch (e) {
  //     // in case that fails or there was bad data saved in the given key
  //     // fall back to the default value
  //     console.error("error parsing saved state from useStickyState");
  //     return initialValue;
  //   }
  // };

  return useReducer(reducer, initialValue /*i nitializer */);
};

export default useReducerPersist;
