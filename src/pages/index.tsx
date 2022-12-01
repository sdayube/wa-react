import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import {
  Container,
  Card,
  Header,
  FilmsContainer,
  Image,
  Button,
} from '../styles/pages/index';

export interface Film {
  id: number;
  title: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  created_at: string;
}

interface Props {
  films: Film[];
  pageCount: number;
}

axios.defaults.headers.common['Accept-Encoding'] = 'gzip, deflate';

export default function Films({ films, pageCount }: Props) {
  const [paginatedFilms, setPaginatedFilms] = useState(films);
  const [updatedPageCount, setUpdatedPageCount] = useState(pageCount);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleFilmUpdate() {
    setPaginatedFilms([]);
    setLoading(true);
    setPage(1);
    await axios
      .put(`${process.env.BACKEND_URL}/films`)
      .catch((err: AxiosError) => console.log(err));
    await axios
      .get(`${process.env.BACKEND_URL}/films`)
      .then((response) => {
        setPaginatedFilms(response.data.films);
        setUpdatedPageCount(response.data.pageCount);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  }

  async function handlePageChange(newPage: number) {
    await axios
      .get(`${process.env.BACKEND_URL}/films?page=${newPage}`)
      .then((response) => {
        setPaginatedFilms(response.data.films);
        setPage(newPage);
      })
      .catch((err: AxiosError) => {
        console.error(err);
      });
  }

  return (
    <div>
      <Header>
        <h1>Studio Ghibli Films</h1>
      </Header>

      <Container>
        <Button onClick={handleFilmUpdate}>Update Films</Button>
      </Container>

      <FilmsContainer>
        {paginatedFilms.map((film) => (
          <Card key={film.id}>
            <Image src={film.movie_banner} alt={film.title} />
            <h2>{film.title}</h2>
            <h3>
              Director: {film.director} | Producer: {film.producer}
            </h3>
            <p>{film.description}</p>
          </Card>
        ))}
      </FilmsContainer>

      <Container>
        {!loading && !paginatedFilms.length && <h2>No films found</h2>}
        {loading && <h2>Loading...</h2>}
        {page > 1 && (
          <Button type="button" onClick={() => handlePageChange(page - 1)}>
            Previous Page
          </Button>
        )}
        {page < pageCount && (
          <Button type="button" onClick={() => handlePageChange(page + 1)}>
            Next Page
          </Button>
        )}
      </Container>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await axios.put(`${process.env.BACKEND_URL}/films`);
  } catch (err) {
    console.error('Error updating films: ', (err as AxiosError).message);
  }

  try {
    const paginatedFilms = await axios.get(`${process.env.BACKEND_URL}/films`);
    const { data } = paginatedFilms;
    return {
      props: { ...data },
    };
  } catch (err) {
    console.error('Error getting films: ', err);
    return {
      props: { films: [], pageCount: 0 },
    };
  }
};
