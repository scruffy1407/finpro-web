import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store";

import AppWithModal from "@/components/AppWithModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {" "}
      {/* Wrap your component with the Redux Provider */}
      {/*<Component {...pageProps} />*/}
      <AppWithModal Component={Component} pageProps={pageProps} />
      {/*<Toaster*/}
      {/*  closeButton={true}*/}
      {/*  richColors={true}*/}
      {/*  theme={`light`}*/}
      {/*  position={`top-right`}*/}
      {/*/>*/}
    </Provider>
  );
}
