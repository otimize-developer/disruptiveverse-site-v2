import { ErrorPage } from '~/components/ErrorPage';
import { ErrorEnum } from '~/enums';

type ErrorProps = {
  statusCode: ErrorEnum;
};

export default function Error({ statusCode }: ErrorProps) {
  return <ErrorPage code={statusCode} />;
}

Error.getInitialProps = ({ res }: { res: { statusCode?: number } }) => {
  const statusCode = res?.statusCode || 500;
  return { statusCode: String(statusCode) };
};
