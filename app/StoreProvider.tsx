"use client"

import { AppStore, makeStore } from "@/lib/store/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({children}:{children:ReactNode}) => {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore();
    //   For the very first render. we can inialize value to our state like getting the data from local storage whenever page refresh
    // beacuse when we refresh the data inside a redux store, it get lost 
   
      // storeRef.current.dispatch(add("Ovesh"))
    }
  return (
    <Provider store={storeRef.current}>{children}</Provider>
  )
}
export default StoreProvider