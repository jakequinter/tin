import type { NextPage } from 'next';
import Head from 'next/head';

import Container from '@/components/Container';

const Home: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Tin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </Container>
  );
};

export default Home;
