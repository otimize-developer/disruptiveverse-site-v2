import NextLink from 'next/link';
// import { useRouter } from 'next/router';

// import { Link } from '~/components/Link';
import { ErrorEnum } from '~/enums';

// import { Logo } from '../Logo';
// import { Meta } from '../SEO/Meta';
import * as S from './styles';

type ErrorProps = {
  code: ErrorEnum;
};

export const ErrorPage = ({ code }: ErrorProps) => {
  // const { asPath } = useRouter();
  // const canonical = `${SITE_URL}${asPath}`;

  const errors = {
    [ErrorEnum.NotFound]: {
      title: 'Erro 404',
      description: 'Desculpe, não foi possível encontrar a página solicitada!',
    },
    [ErrorEnum.InternalServerError]: {
      title: 'Erro 500',
      description:
        'Ocorreu um erro inesperado. Por favor, seja paciente ou tente novamente mais tarde.',
    },
    [ErrorEnum.BadRequest]: {
      title: 'Erro 400',
      description:
        'Alguma informação está incorreta, revise e tente novamente.',
    },
  };

  return (
    <>
      {/* <Meta
        title={`${errors[code].title} - DisruptiveVerse`}
        description={`${errors[code].description}} - DisruptiveVerse`}
        canonical={canonical}
      /> */}

      <S.Wrapper>
        {/* <Link href="/">
          <Logo type="text" />
        </Link> */}

        <S.InfoWrapper>
          <h1>{errors[code].title}</h1>
          <p>{errors[code].description}</p>

          <NextLink href="/" passHref>
            <S.ButtonGoHome>Voltar para página inicial</S.ButtonGoHome>
          </NextLink>
        </S.InfoWrapper>
      </S.Wrapper>
    </>
  );
};
