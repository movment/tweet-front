import 'antd/dist/antd.css';
import Head from 'next/head';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../reducers/store';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
