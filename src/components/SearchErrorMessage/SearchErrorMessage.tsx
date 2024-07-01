import React from 'react';

import styles from './SearchErrorMessage.module.css';

type Props = {
  errorMessage: string | null;
};

function SearchErrorMessage({ errorMessage }: Props) {
  return (
    <div className={styles.searchErrorMessage}>
      {errorMessage}
    </div>
  );
}

export default SearchErrorMessage;