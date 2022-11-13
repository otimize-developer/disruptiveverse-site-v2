import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;

  color: ${({ theme }) => theme.colors.text};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.link};

    * {
      color: ${({ theme }) => theme.colors.link};
    }

    span {
      color: ${({ theme }) => theme.colors.link};
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  p,
  li {
    line-height: 28px;
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  strong {
  }

  ul,
  ol {
    margin-left: 1.5rem;
  }

  figure.table {
    overflow: auto;
  }

  table {
    * {
      margin: 0;
      padding: 0;
    }
  }

  table {
    margin: 1rem auto;
    width: 100%;
    border-radius: 1rem 1rem 0 0;

    overflow: hidden;
    box-sizing: border-box;
    border-collapse: collapse;

    thead {
      tr {
        background-color: ${({ theme }) => theme.colors.primary};
        color: #ffffff;
        text-align: left;

        th {
          padding: 0.75rem;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #dddddd;
      }

      tr:nth-of-type(even) {
        background-color: ${({ theme }) => theme.colors.tableEvenBackground};
        color: ${({ theme }) => theme.colors.tableEvenColor};
      }

      tr:last-of-type {
        border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
      }

      tr.active-row {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary};
      }
    }

    td {
      padding: 0.75rem;
    }
  }

  span.next-image {
    margin: 1rem auto;
  }

  amp-img + * {
    padding-top: 1rem;
  }

  span,
  svg {
    color: ${({ theme }) => theme.colors.text};
  }

  figure {
    flex-direction: column;
    align-items: center;
    display: flex;
  }

  figcaption {
    margin-top: 0.5rem;
    margin-bottom: 1rem;

    font-size: 0.9rem;
    opacity: 0.75;
    text-align: center;
  }

  img,
  iframe,
  amp-img,
  span.next-image {
    max-width: 100%;
    max-height: 700px;
    border-radius: 0.5rem;
  }
`;
