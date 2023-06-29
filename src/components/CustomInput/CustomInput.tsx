import { useState } from 'react';

import styles from './CustomInput.module.sass';

interface ICustomInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder: string;
  className?: string | null;
  textError?: string;
}

const CustomInput: React.FC<ICustomInputProps> = ({ type='text', value, onChange, onBlur, onFocus, placeholder, className, textError }) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);

  const handleBlur = () => {
    setIsFocus(false);

    if (onBlur) {
      onBlur()
    };
  }

  const handleFocus = () => {
    setIsFocus(true);

    if (onFocus) {
      onFocus()
    };
  }

  const getPasswordShowIcon = () => {
    if (passwordShow) {
      return (<svg className={styles.icon} onClick={() => setPasswordShow(false)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="16px" viewBox="0 0 18 16" version="1.1">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="not-show" fill="#A5B7C6" fillRule="nonzero">
            <path d="M3.21069047,11.1663902 C3.39654263,11.3293538 3.41344613,11.6102648 3.24844549,11.7938225 C3.08344486,11.9773802 2.79902247,11.994075 2.61317031,11.8311114 C1.47180339,10.8303092 0.585171711,9.57364747 0.030437415,8.16067902 C-0.010145808,8.05730916 -0.010145808,7.94269084 0.030437415,7.83932098 C1.88214746,3.12281452 7.14843728,0.672643262 11.9945666,2.24468049 C12.230685,2.32127502 12.3592286,2.57241588 12.2816766,2.80561931 C12.2041246,3.03882272 11.9498445,3.16577931 11.7137261,3.08918477 C7.37717265,1.68244901 2.66830855,3.83010183 0.934515081,7.99996267 C1.44033165,9.21540933 2.21952529,10.2972917 3.21069047,11.1663902 Z M9.55776105,4.48692575 C9.80333028,4.52468924 9.97140753,4.75191815 9.93317202,4.99445572 C9.89493651,5.23699331 9.66486717,5.4029955 9.41929794,5.36523201 C9.28158282,5.34405428 9.14155974,5.33333333 9,5.33333333 C7.50883122,5.33333333 6.3,6.52724071 6.3,8 C6.3,8.13832729 6.31062562,8.27516969 6.33161829,8.40979004 C6.36944919,8.65238951 6.20099315,8.87934462 5.9553612,8.91670844 C5.70972924,8.95407236 5.47993719,8.787696 5.44210628,8.54509653 C5.41413792,8.36574284 5.4,8.18366711 5.4,8 C5.4,6.03632089 7.0117749,4.44444444 9,4.44444444 C9.18796257,4.44444444 9.37427715,4.45870972 9.55776105,4.48692575 Z M8.51030829,11.5228841 C8.26405254,11.4897667 8.09160534,11.2657546 8.12513673,11.0225391 C8.15866812,10.7793236 8.38548036,10.6090053 8.63173602,10.6421228 C8.75297385,10.6584273 8.87590008,10.6666667 9,10.6666667 C10.4911688,10.6666667 11.7,9.47275929 11.7,8 C11.7,7.89194898 11.6935167,7.78479413 11.6806689,7.6788808 C11.6511049,7.43516373 11.8271799,7.21392169 12.0739433,7.18472267 C12.3207068,7.15552364 12.5447144,7.32942489 12.5742785,7.57314187 C12.5913803,7.71412498 12.6,7.85658862 12.6,8 C12.6,9.96367911 10.9882251,11.5555556 9,11.5555556 C8.83525617,11.5555556 8.67176172,11.544597 8.51030829,11.5228841 Z M1.66819805,15.8698252 C1.49246212,16.0433916 1.20753788,16.0433916 1.03180195,15.8698252 C0.856066014,15.6962588 0.856066014,15.4148523 1.03180195,15.2412859 L16.3318019,0.130174764 C16.5075379,-0.0433915911 16.7924621,-0.0433915911 16.9681981,0.130174764 C17.143934,0.30374112 17.143934,0.585147769 16.9681981,0.758714124 L1.66819805,15.8698252 Z M14.7893094,4.83361 C14.6034572,4.67064644 14.5865537,4.38973544 14.7515543,4.20617772 C14.9165549,4.02262001 15.2009773,4.00592515 15.3868295,4.16888871 C16.5281965,5.16969068 17.4148282,6.42635236 17.9695626,7.83932098 C18.0101458,7.94269084 18.0101458,8.05730916 17.9695626,8.16067902 C16.1178525,12.8771855 10.8515627,15.3273567 6.00543345,13.7553195 C5.76931499,13.678725 5.64077145,13.4275841 5.71832341,13.1943807 C5.79587538,12.9611772 6.0501555,12.8342207 6.28627396,12.9108152 C10.6228274,14.317551 15.3316914,12.1698981 17.0654849,8.00003733 C16.5596684,6.78459058 15.7804746,5.70270828 14.7893094,4.83361 Z" id="Shape" />
          </g>
        </g>
      </svg>)
    } else {
      return (<svg className={styles.icon} onClick={() => setPasswordShow(true)} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="18px" height="14px" viewBox="0 0 18 14" version="1.1">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="show" fill="#A5B7C6" fillRule="nonzero">
            <path d="M0.030437415,6.84183159 C1.95128027,2.02568317 7.52424102,-0.364679901 12.4779937,1.50280621 C14.9988859,2.45314258 16.9920737,4.39096409 17.9695626,6.84183159 C18.0101458,6.9435863 18.0101458,7.0564137 17.9695626,7.15816841 C16.0487197,11.9743168 10.475759,14.3646799 5.52200634,12.4971938 C3.00111408,11.5468574 1.00792624,9.60903589 0.030437415,7.15816841 C-0.010145808,7.0564137 -0.010145808,6.9435863 0.030437415,6.84183159 Z M5.84738141,11.6813777 C10.2831195,13.3535804 15.2665756,11.2595192 17.0654878,7.00004156 C16.1579578,4.85332298 14.3831861,3.1595109 12.1526185,2.31862235 C7.71688053,0.646419533 2.73342438,2.74048083 0.934512228,6.99995844 C1.84204214,9.14667705 3.61681391,10.8404891 5.84738141,11.6813777 Z M9,10.5 C7.0117749,10.5 5.4,8.93299663 5.4,7 C5.4,5.06700338 7.0117749,3.5 9,3.5 C10.9882251,3.5 12.6,5.06700338 12.6,7 C12.6,8.93299663 10.9882251,10.5 9,10.5 Z M9,9.625 C10.4911688,9.625 11.7,8.44974742 11.7,7 C11.7,5.55025258 10.4911688,4.375 9,4.375 C7.50883122,4.375 6.3,5.55025258 6.3,7 C6.3,8.44974742 7.50883122,9.625 9,9.625 Z" id="Shape" />
          </g>
        </g>
      </svg>)
    }
  };

  const classList = `${styles['custom-input']} ${className || ''} ${isFocus ? styles['custom-input-focus'] : ''} ${textError ? styles['custom-input-error'] : ''}`;

  return (
    <div className={styles['custom-input-wrap']}>
      <div className={classList}>
        <div className={`${type === 'password' ? `${styles['input-box']} ${styles['password']}` : styles['input-box']}`}>
          <input
            className={styles['input']}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
            placeholder=""
            type={type === 'password' && !passwordShow && value ? 'password' : type}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {type === 'password' ? getPasswordShowIcon() : null}
          {
            !textError ?
              <div
                className={`${styles['placeholder']} ${isFocus || value ? styles['placeholder-up'] : ''}`}
              >
                {placeholder}
              </div> : null
          }
          {
            textError ?
              <div
                className={styles['input-error']}
              >
                {textError}
              </div> : null
          }
        </div>
      </div>
    </div>
  )
};

export { CustomInput };