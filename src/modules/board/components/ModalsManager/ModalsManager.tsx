import { EditNoteModal } from '../EditNoteModal';
import { CreateNoteModal } from '../CreateNoteModal';

export const ModalsManager = () => {
  return (
    <>
      <CreateNoteModal />
      <EditNoteModal />
    </>
  );
};
