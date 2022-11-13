import { useState } from 'react';

import { PostListSection, Post } from '~/components/sections/PostList';
import { News as NewsInterface } from '~/interfaces/news.interface';
import { getNews } from '~/services/cms-api/functions';

import * as S from './styles';

type NewsProps = {
  coinSlug: string;
  totalNews: number;
  news: NewsInterface[];
};

export const News = ({ coinSlug, totalNews, news = [] }: NewsProps) => {
  const [posts, setPosts] = useState<Post[]>(news);
  const [totalPosts, setTotalPosts] = useState(totalNews || posts.length);

  const onPagination = async ({ page }: { page: number }) => {
    const { pagination, news: newsArticles } = await getNews({
      tags: [coinSlug],
      pageSize: 28,
      proxy: true,
      page,
      populate: {
        featured_image: true,
      },
    });

    return { total: pagination.total, posts: newsArticles };
  };

  const paginationEnabled = posts.length < totalPosts;

  return (
    <S.Wrapper>
      <PostListSection
        paginationEnabled={paginationEnabled}
        setTotalPosts={setTotalPosts}
        onPagination={onPagination}
        setPosts={setPosts}
        posts={posts}
      />
    </S.Wrapper>
  );
};
