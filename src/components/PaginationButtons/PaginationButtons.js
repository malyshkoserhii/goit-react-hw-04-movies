import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as moviesApi from '../../services/movies-api';
import Button from './../Button/Button';
import s from './PaginationButtons.module.css';

const PaginationButtons = ({
  page,
  query,
  setTrendingMovies,
  setMovies,
  onLoadingNextPage,
  onLoadingPreviousPage,
}) => {
  const url = useRouteMatch();

  useEffect(() => {
    if (url !== '/') {
      return;
    }

    const homepageRequest = async page => {
      try {
        await moviesApi.fetchTrendingMovies(page).then(setTrendingMovies);
      } catch (error) {
        console.log(error);
      }
    };

    homepageRequest();
  }, [page, setTrendingMovies, url]);

  useEffect(() => {
    if (url !== '/movies') {
      return;
    }

    const moviesPageRequest = async (query, page) => {
      try {
        await moviesApi.fetchMoviesWithQuery(query, page).then(setMovies);
      } catch (error) {
        console.log(error);
      }
    };
    moviesPageRequest(query, page);
  }, [page, query, setMovies, url]);

  return (
    <div className={s.buttonsWrapper}>
      {page > 1 && (
        <Button
          type="submit"
          className={s.paginationButton}
          onClick={onLoadingPreviousPage}
          text="Previous"
        />
      )}
      <span className={s.counter}>{page}</span>
      <Button
        type="submit"
        className={s.paginationButton}
        onClick={onLoadingNextPage}
        text="Next"
      />
    </div>
  );
};

export default PaginationButtons;
