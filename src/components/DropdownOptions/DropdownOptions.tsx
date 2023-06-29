import styles from './DropdownOptions.module.sass';
import { ISelectOption } from '../../types/selectOption';

interface IDropdownOptionsProps {
  positionDropDown?: string;
  options: ISelectOption[];
  changeOption: (value: ISelectOption) => void;
  checkSelectedClass?: (option: ISelectOption) => boolean;
  className?: string;
}

const DropdownOptions: React.FC<IDropdownOptionsProps> = ({
  positionDropDown,
  options,
  changeOption,
  checkSelectedClass,
  className,
}) => {
  return (
    <div className={`${styles['dropdown-menu']} ${className || ''} ${positionDropDown === 'left' ? styles.left : styles.right}`}>
      {
        options && options.length ?
          options.map((item: ISelectOption, ind: number) => (<div
            key={ind}
            className={`${styles['dropdown-menu-item']} ${checkSelectedClass && checkSelectedClass(item) ? styles['is-selected'] : ''}`}
            onClick={() => changeOption(item)}
          >
            {item.optionRenderer ? item.optionRenderer : item.label}
          </div>)) :
          <div className={`${styles['no-result']}`}>
            No options
          </div>
      }
    </div>
  )
};

export { DropdownOptions };