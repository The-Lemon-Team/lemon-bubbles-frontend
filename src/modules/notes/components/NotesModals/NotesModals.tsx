import { EditNoteModalContainer } from '../../containers/EditNoteModalContainer';
import { CreateNoteModal } from '../CreateNoteModal';
import { DeleteModal } from '../DeleteModal';

export const NotesModals: React.FC = () => {
  return (
    <>
      <CreateNoteModal />
      <EditNoteModalContainer />
      <DeleteModal />
    </>
  );
};
