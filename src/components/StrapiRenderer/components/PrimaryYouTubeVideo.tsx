import dynamic from 'next/dynamic';

import type { YouTubeVideoProps } from '~/components/YouTubeVideo';
import type { PrimaryYouTubeVideo as PrimaryYouTubeVideoProps } from '~/services/cms-api/types/components/primary';

const YouTubeVideo = dynamic<YouTubeVideoProps>(
  () => import('~/components/YouTubeVideo').then(mod => mod.YouTubeVideo),
  { ssr: false },
);

const getYouTubeVideoId = (videoUrl: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

  return (videoUrl.match(regExp) || [])[7];
};

export const PrimaryYouTubeVideo = ({ url }: PrimaryYouTubeVideoProps) => {
  const videoId = getYouTubeVideoId(url);

  if (!videoId || videoId.length !== 11) {
    return <></>;
  }

  return <YouTubeVideo videoId={videoId} />;
};
