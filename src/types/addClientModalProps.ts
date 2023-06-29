import { IPerson } from './person';
import { IClient } from './client';

export interface IAddClientModalProps {
  onClose: () => void;
  onAddClient: (client: IPerson) => void;
  data?: IClient;
}