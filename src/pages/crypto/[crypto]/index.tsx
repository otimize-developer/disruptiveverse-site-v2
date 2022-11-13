import {
  CryptoPageProps,
  getStaticProps,
  getStaticPaths,
  CryptoPage,
} from '~/templates/cryptos/pages/Crypto';

export default function Crypto(props: CryptoPageProps) {
  return <CryptoPage {...props} />;
}

export { getStaticProps, getStaticPaths };
