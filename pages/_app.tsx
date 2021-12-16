import { client } from "@/graphql/client";
import { theme } from "@/utils/chakraTheme";
import { ChakraProvider } from "@chakra-ui/react";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import type { AppProps } from "next/app";
import { Provider } from "urql";
import AuthProvider from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
