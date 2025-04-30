import { CreateNoteModalContainer } from '../../containers/CreateNoteModalContainer';
import { DeleteModal } from '../DeleteModal';
import { EditNoteModal } from '../EditNoteModal';

export const NotesModals: React.FC = () => {
  return (
    <>
      <CreateNoteModalContainer />
      <EditNoteModal />
      <DeleteModal />
    </>
  );
};
