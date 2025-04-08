import { CreateNoteModal } from '../CreateNoteModal';
import { DeleteModal } from '../DeleteModal';
import { EditNoteModal } from '../EditNoteModal';

export const ModalsManager = () => {
  return (
    <>
      <CreateNoteModal />
      <EditNoteModal />
      <DeleteModal />
    </>
  );
};
