import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import styles from './notFound.module.css'

export function NotFound() {
    const error = useRouteError();

    if (isRouteErrorResponse(error) && error.status === 404) {
        return (
            <div className={styles.container}>
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
                <Link to={`/`} className={styles.links}>
              <img
                src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif"
                alt="Nyan Cat"
                className={styles.img}
              />
            </Link>
            <p>Click the kitteh to follow him back to the main page</p>
          </div>
        );
    }

    // Fallback for other errors
    return (
        <div className={styles}>
            <h1>Something went wrong</h1>
            <p>We're sorry, an unexpected error has occurred.</p>
        </div>
    );
}