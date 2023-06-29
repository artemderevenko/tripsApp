import { IPerson } from './person';
import { IManager } from './manager';

export interface IAddManagerModalProps {
  onClose: () => void;
  onAddManager: (manager: IPerson) => void;
  data?: IManager;
}