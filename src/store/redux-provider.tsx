"use client";

import { Provider } from "react-redux";
import { store } from "./index"; // Ensure this path is correct
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
