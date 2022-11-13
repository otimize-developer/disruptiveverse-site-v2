import { Dispatch, SetStateAction, useState } from 'react';

import { useAmp } from 'next/amp';

import { Button } from '~/components/Button';
import { Image } from '~/components/Image';
import { Link } from '~/components/Link';

import * as S from './styles';

export type Post = {
  id: number;
  path: string;
  title: string;
  featuredImage: any | null;
  category?: {
    name?: string;
  };
  publishedAt?: string | null;
};

export type OnPagination = (prop: {
  page: number;
}) => Promise<{ total: number; posts: Post[] }>;

export type Pagination = {
  total?: number;
  page?: number;
};

export type PostListSectionProps = {
  posts: Post[];
  pagination?: {
    total?: number;
    page?: number;
  };
  onPagination?: OnPagination;
  setPosts?: Dispatch<SetStateAction<Post[]>>;
  setTotalPosts?: Dispatch<SetStateAction<number>>;
  paginationEnabled?: boolean;
  linkConfig?: {
    useHtmlTag?: boolean;
  };
};

export const PostListSection = ({
  setTotalPosts,
  onPagination,
  pagination,
  setPosts,
  paginationEnabled = false,
  posts = [],
}: PostListSectionProps) => {
  const isAmp = useAmp();

  const [page, setPage] = useState(pagination?.page || 1);
  const [loading, setLoading] = useState(false);

  const handlePagination = () => {
    if (!paginationEnabled || !onPagination || !setPosts || !setTotalPosts) {
      return;
    }

    setLoading(true);

    onPagination({ page: page + 1 })
      .then(data => {
        setPosts(oldPosts => {
          const uniquePosts = [
            ...new Map(
              [...oldPosts, ...data.posts].map(item => [item.id, item]),
            ).values(),
          ];

          return uniquePosts;
        });

        setTotalPosts(data.total);
      })
      .finally(() => {
        setLoading(false);
        setPage(oldPage => oldPage + 1);
      });
  };

  return (
    <S.Wrapper>
      <S.PostsWrapper isAmp={isAmp}>
        {posts.map(post => (
          <S.Post isAmp={isAmp} key={post.id}>
            <Link href={post.path}>
              <S.ImageWrapper>
                <Image
                  src={
                    post?.featuredImage?.medium?.url ||
                    '/images/placeholder.jpg'
                  }
                  alt={post?.featuredImage?.alternativeText || post.title}
                  layout="fill"
                />
              </S.ImageWrapper>
              <span>
                {!!post.publishedAt && post.publishedAt}
                {post?.category?.name ? (
                  <>
                    {' | '}
                    <strong>{post.category.name.toUpperCase()}</strong>
                  </>
                ) : (
                  ''
                )}
              </span>
              <span>{post.title}</span>
            </Link>
          </S.Post>
        ))}
      </S.PostsWrapper>

      {paginationEnabled && (
        <Button
          onClick={handlePagination}
          isLoading={loading}
          aria-label="Carregar mais artigos"
        >
          Ver mais
        </Button>
      )}
    </S.Wrapper>
  );
};
