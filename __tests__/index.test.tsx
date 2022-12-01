import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';

import Home, { Film, getServerSideProps } from '../src/pages/index';
import { mockedReturns } from '../apiMockedReturn';

jest.mock('axios');

describe('Home', () => {
  const mockError = () =>
    jest.spyOn(console, 'error').mockImplementation((output) => output);

  beforeEach(() => {
    const { page1 } = mockedReturns;

    (axios.get as jest.Mock).mockResolvedValue({ data: page1 });
    (axios.put as jest.Mock).mockResolvedValue({
      message: 'Films have been updated!',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('renders a list of films', async () => {
    const { page1 } = mockedReturns;
    render(<Home films={page1.films as Film[]} pageCount={page1.pageCount} />);

    const films = await screen.findAllByRole('listitem');

    expect(films).toHaveLength(10);

    const firstFilm = films[0];
    const lastFilm = films[9];

    expect(firstFilm).toContainElement(screen.getByText('Castle in the Sky'));
    expect(lastFilm).toContainElement(
      screen.getByText('My Neighbors the Yamadas'),
    );
  });

  it('updates and fetches a list of films on server-side', async () => {
    const { page1 } = mockedReturns;

    const serverSideProps = await getServerSideProps({} as any);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(serverSideProps).toEqual({
      props: {
        films: page1.films,
        pageCount: page1.pageCount,
      },
    });
  });

  it('does not update the list of films on server-side if there is an error', async () => {
    const { page1 } = mockedReturns;

    (axios.put as jest.Mock).mockRejectedValue({
      message: 'There was an error updating the films',
    });

    const error = mockError();

    const serverSideProps = await getServerSideProps({} as any);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(error).toHaveBeenCalledWith(
      'Error updating films: ',
      'There was an error updating the films',
    );

    expect(serverSideProps).toEqual({
      props: {
        films: page1.films,
        pageCount: page1.pageCount,
      },
    });
  });

  it('does not fetch a list of films on server-side if there is an error', async () => {
    const errorMessage = { message: 'There was an error getting the films' };

    (axios.get as jest.Mock).mockRejectedValueOnce(errorMessage);

    const error = mockError();

    const serverSideProps = await getServerSideProps({} as any);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledTimes(1);

    expect(error).toHaveBeenCalledWith('Error getting films: ', errorMessage);

    expect(serverSideProps).toEqual({
      props: {
        films: [],
        pageCount: 0,
      },
    });
  });

  it('has a button that updates the films', async () => {
    const { page1 } = mockedReturns;
    const { page2 } = mockedReturns;

    render(<Home films={page2.films as Film[]} pageCount={page2.pageCount} />);

    const updateButton = await screen.findByText('Update Films');

    expect(updateButton).toBeInTheDocument();

    fireEvent.click(updateButton);

    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const film = await screen.findByText('Castle in the Sky');
    expect(film).toBeInTheDocument();
  });

  it('has a button that fetches the next page of films when pageCount > 1', async () => {
    const { page1 } = mockedReturns;
    const { page2 } = mockedReturns;

    render(<Home films={page1.films as Film[]} pageCount={page1.pageCount} />);

    const nextPageButton = await screen.findByText('Next Page');

    expect(nextPageButton).toBeInTheDocument();

    (axios as jest.Mocked<typeof axios>).get.mockResolvedValueOnce({
      data: page2,
    });

    fireEvent.click(nextPageButton);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const film = await screen.findByText('Spirited Away');
    expect(film).toBeInTheDocument();
  });

  it('does not fetch the next page of films when returns an error', async () => {
    const { page1 } = mockedReturns;
    const errorMessage = { message: 'There was an error getting the films' };

    render(<Home films={page1.films as Film[]} pageCount={page1.pageCount} />);

    const nextPageButton = await screen.findByText('Next Page');

    expect(nextPageButton).toBeInTheDocument();

    (axios.get as jest.Mock).mockRejectedValueOnce(errorMessage);

    const error = mockError();

    fireEvent.click(nextPageButton);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    const film = await screen.findByText('Castle in the Sky');

    expect(film).toBeInTheDocument();
    expect(error).toHaveBeenCalledWith(errorMessage);
  });

  it('does not have a button that fetches the next page of films when pageCount === 1', async () => {
    const { page1 } = mockedReturns;

    render(<Home films={page1.films as Film[]} pageCount={1} />);

    expect(screen.queryByText('Next Page')).not.toBeInTheDocument();
  });
});
