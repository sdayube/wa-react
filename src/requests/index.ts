import axios, { AxiosError, AxiosResponseTransformer } from 'axios';
import { BrotliDecompress, createBrotliDecompress } from 'zlib';
import { Film, GetFilmResponse } from '../pages';

export const updateFilms = async () =>
  axios
    .put(`${process.env.BACKEND_URL}/films`)
    .catch((err: AxiosError) => {
      console.error(
        'Error fetching data from Studio Ghibli API.',
        'Fetching data from seed.',
      );
      return axios.put(`${process.env.BACKEND_URL}/films-from-seed`);
    })
    .catch((err: AxiosError) => {
      console.error('Error fetching data from seed', err);
    });

const getPaginatedFilmsStream = (page: number) =>
  axios.get(`${process.env.BACKEND_URL}/films?page=${page}`, {
    decompress: false,
    responseType: 'stream',
    transformResponse(data) {
      return data.pipe(createBrotliDecompress());
    },
  });

const readFilmStream = (data: BrotliDecompress): Promise<GetFilmResponse> =>
  new Promise((resolve, reject) => {
    const chunks: any[] = [];

    data.on('data', (chunk) => {
      chunks.push(chunk);
    });

    data.on('end', () => {
      resolve(JSON.parse(Buffer.concat(chunks).toString()));
    });

    data.on('error', (err) => {
      reject(err);
    });
  });

export const getPaginatedFilms = async (
  page: number = 1,
): Promise<GetFilmResponse> => {
  if (process.env.BACKEND_URL?.includes('localhost')) {
    return axios
      .get(`${process.env.BACKEND_URL}/films?page=${page}`)
      .then((res) => res.data);
  }

  const { data } = await getPaginatedFilmsStream(page);
  return readFilmStream(data);
};
