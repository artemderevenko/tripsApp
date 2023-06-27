import { useState } from 'react';

import styles from './CustomSearchField.module.sass';

interface ICustomSearchFieldProps {
  placeholder: string;
  disable: boolean;
  onSearch: (value: string) => void;
}

const CustomSearchField: React.FC<ICustomSearchFieldProps> = ({ placeholder = 'Search...', disable, onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onSearch(searchValue);
    }
  }

  return (
    <div
      className={`${styles['search-field']} ${disable ? styles['search-field-disable'] : ''}`}
    >
      <input
        type="text"
        className={styles['input']}
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onBlur={() => onSearch(searchValue)}
        onKeyDown={handleKeyDown}
      />
      <div
        className={styles['icon']}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="25px" height="25px">
          <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
        </svg>
      </div>
    </div>
  )
};

export { CustomSearchField };