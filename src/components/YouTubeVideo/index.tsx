import { useAmp } from 'next/amp';

import * as S from './styles';

export type YouTubeVideoProps = {
  videoId: string;
};

export const YouTubeVideo = ({ videoId }: YouTubeVideoProps) => {
  const isAmp = useAmp();

  return (
    <S.Wrapper>
      {isAmp ? (
        <amp-youtube
          data-videoid={videoId}
          layout="responsive"
          width="480"
          height="270"
        />
      ) : (
        <iframe
          title="Embed YouTube video"
          loading="lazy"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '16/9',
          }}
        />
      )}
    </S.Wrapper>
  );
};
