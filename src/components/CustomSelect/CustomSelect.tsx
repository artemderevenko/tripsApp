import { useState, useRef } from 'react';

import styles from './CustomSelect.module.sass';
import { ICustomSelect } from '../../types/customSelect';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { ICustomSelectOption } from '../../types/customSelectOption';

const CustomSelect: React.FC<ICustomSelect> = ({
  selectIcon,
  placeholder,
  selectValue,
  selectOptions,
  positionDropDown,
  onChange,
}) => {

  const [optionsIsOpened, setOptionsIsOpened] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, setOptionsIsOpened, optionsIsOpened);

  const handleOpenedOptions = (): void => {
    setOptionsIsOpened(!optionsIsOpened)
  }

  const changeOption = (item: any): void => {
    onChange(item);
    setOptionsIsOpened(false);
  }

  const getClassName = (
    selectValue: ICustomSelectOption | null | '' | undefined,
    item: ICustomSelectOption | null | '' | undefined
  ): string => {
    return selectValue && selectValue.value && item && item.value && item.value === selectValue.value ? styles['is-selected'] : ''
  }

  return (
    <div
      className={`${styles['custom-select']} ${selectIcon ? styles['is-icon'] : ''} ${optionsIsOpened ? styles['is-opened'] : ''}`}
      ref={wrapperRef}
    >
      <div className={styles['select-box']} onClick={handleOpenedOptions}>
        {
          selectValue ?
            <div className={styles['select-box-value']}>{selectValue.label}</div> :
            <div className={styles['select-box-placeholder']}>{placeholder || 'Select ...'}</div>
        }
        {
          selectIcon ?
            <div className={styles['custom-select-icon']}>{selectIcon}</div> : null
        }
        <div className={`${styles.arrow} ${optionsIsOpened ? styles['arrow-down'] : styles['arrow-up']}`}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" width="1024px" height="1024px" viewBox="0 0 1024 1024" enableBackground="new 0 0 1024 1024">
            <rect fill="none" width="1024" height="1024" />
            <path d="M411.197,833L26.523,408.205c-56.186-97.145-10.63-175.782,101.79-175.782h769.301  c112.468,0,158.121,78.637,101.789,175.782L614.777,833C557.235,893.85,473.093,903.579,411.197,833z" />
          </svg>
        </div>
      </div>
      {optionsIsOpened ?
        <div className={`${styles['dropdown-menu']} ${positionDropDown === 'right' ? styles.right : styles.left}`}>
          {
            selectOptions && selectOptions.length ?
              selectOptions.map((item, ind: number) => (<div
                key={ind}
                className={`${styles['dropdown-menu-item']} ${getClassName(selectValue, item)}`}
                onClick={() => changeOption(item)}
              >
                {item.optionRenderer ? item.optionRenderer : item.label}
              </div>)) :
              <div className={`${styles['no-result']}`}>No options</div>
          }
        </div> : null
      }
    </div>
  )
};

export { CustomSelect };