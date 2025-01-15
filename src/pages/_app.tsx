import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store"
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>  {/* Wrap your component with the Redux Provider */}
      <Component {...pageProps} />
      <Toaster
        closeButton={true}
        richColors={true}
        theme={`light`}
        position={`top-right`}
      />
    </Provider>
  )

}
