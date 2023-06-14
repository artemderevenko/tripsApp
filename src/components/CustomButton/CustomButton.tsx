import styles from './CustomButton.module.sass';

interface ICustomButton {
  label: string,
  onClick: () => void,
  className?: string | null,
}

const CustomButton: React.FC<ICustomButton> = ({ label, onClick, className }) => {
  return (
    <button
      className={`${styles['custom-button']} ${className || ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
};

export { CustomButton };