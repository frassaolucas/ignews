import { GetStaticProps } from 'next';
import Head from "next/head";
import Image from "next/image";

import { stripe } from '../services/stipe';

import { SubscribeButton } from "../components/SubscribeButton";

import AvatarImg from '../../public/images/avatar.svg';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>

          <h1>News about the <span>react</span> world.</h1>

          <p>
            Get access to all articles <br />
            <span>for {product.amount}/month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image src={AvatarImg} alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JPPDuAGzacdFFiYYiQYEtFy');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}