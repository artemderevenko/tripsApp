import styles from './MakePaymentModal.module.sass';
import { CustomModal } from '../../components/CustomModal';
import { useInput } from '../../hooks/useInput';
import { CustomInput } from '../CustomInput';
import { ITourist } from '../../types/tourist';

interface IMakePaymentModalProps {
  onClose: () => void,
  onMakePayment: (data: ITourist | null, value: string) => void,
  data: ITourist | null
}

const MakePaymentModal: React.FC<IMakePaymentModalProps> = ({ onClose, onMakePayment, data }) => {
  const payment = useInput({
    initialValue: data?.paymentAmount ? `${data?.paymentAmount}` : '',
    name: 'Payment amount',
    validations: { 
      isEmpty: true,
      isPrice: true
     }
  });

  const makePayment = () => {
    if (payment.isValid && payment.value) {
      return onMakePayment(data, payment.value)
    } 
    
    if (payment.isValid && !payment.value) {
      payment.onCheckError()
    }
  }

  return (
    <CustomModal
      title={'Make payment'}
      onClose={onClose}
      buttonsList={[
        {
          onButtonClick: onClose,
          buttonText: 'Cancel',
          type: 'cancel',
        },
        {
          onButtonClick: makePayment,
          buttonText: 'Make payment',
          type: 'confirm',
        }
      ]}
    >
      <CustomInput
        type="number"
        value={payment.value}
        onChange={payment.onChange}
        onBlur={payment.onBlur}
        placeholder={payment.name}
        textError={payment.textError}
      />
    </CustomModal>
  )
};

export { MakePaymentModal };