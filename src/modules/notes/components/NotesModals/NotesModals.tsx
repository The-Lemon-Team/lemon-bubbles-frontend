import { EditNoteModalContainer } from '../../containers/EditNoteModalContainer';
import { CreateNoteModalContainer } from '../../containers/CreateNoteModalContainer';
import { DeleteModal } from '../DeleteModal';

export const NotesModals: React.FC = () => {
  return (
    <>
      <CreateNoteModalContainer />
      <EditNoteModalContainer />
      <DeleteModal />
    </>
  );
};
