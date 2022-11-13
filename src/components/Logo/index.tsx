import { Image } from '../Image';
import * as S from './styles';

type LogoProps = {
  type?: 'text' | 'icon' | 'string';
  width?: number;
  height?: number;
};

type LogoTypesRendererProps = {
  isAmp?: boolean;
  width: number;
  height: number;
};

type LogoTypes = {
  text(props: LogoTypesRendererProps): JSX.Element;
  icon(props: LogoTypesRendererProps): JSX.Element;
  string(props: LogoTypesRendererProps): JSX.Element;
};

const logoTypes: LogoTypes = {
  text: ({ width, height }) => (
    <Image
      src="/images/logo-text.png"
      width={width}
      height={height}
      alt="Logo DisruptiveVerse"
    />
  ),
  icon: ({ width, height }) => (
    <Image
      src="/images/logo-icon.png"
      width={width}
      height={height}
      alt="Logo DisruptiveVerse"
    />
  ),
  string: () => (
    <S.LogoTextWrapper>
      <strong>Disruptive Verse</strong>
    </S.LogoTextWrapper>
  ),
};

export function Logo({ type = 'text', width = 200, height = 40 }: LogoProps) {
  return logoTypes[type]({ width, height });
}
