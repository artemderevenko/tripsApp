import styles from './TourInfo.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomSelect } from '../CustomSelect';
import { CustomInput } from '../CustomInput';

interface ITourInfo {
  // children: ReactNode,
};

const TourInfo: React.FC<ITourInfo> = ({ }) => {
  return (
    <div className={styles['tour-info']}>
      <PageHeader align={'left'}>
        <div className={styles['block-title']}>Tour Info</div>
      </PageHeader>
      <div className={styles['form']}>
        <div className={styles['row']}>
          <CustomInput
            type="text"
            value={''}
            onChange={(e) => null}
            // onBlur={checkFirstNameError}
            placeholder="Tour name"
            textError={''}
          />
        </div>
        <div className={styles['row']}>
          <CustomInput
            type="text"
            value={''}
            onChange={(e) => null}
            // onBlur={checkFirstNameError}
            placeholder="Tour description"
            textError={''}
          />
        </div>
        <div className={styles['column']}>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={''}
              onChange={(e) => null}
              // onBlur={checkFirstNameError}
              placeholder="Start date"
              textError={''}
            />
          </div>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={''}
              onChange={(e) => null}
              // onBlur={checkFirstNameError}
              placeholder="End date"
              textError={''}
            />
          </div>
        </div>
        <div className={styles['column']}>
          <div className={styles['row']}>
            <CustomInput
              type="text"
              value={''}
              onChange={(e) => null}
              // onBlur={checkFirstNameError}
              placeholder="Location"
              textError={''}
            />
          </div>
          <div className={styles['row']}>
            <CustomSelect
              placeholder="Manager"
              selectValue={null}
              selectOptions={[]}
              onChange={(option) => null}
              onBlur={() => null}
              textError={''}
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export { TourInfo };