import { Button, Modal, Heading } from 'rsuite';

import { useDeleteNote } from '../../hooks/useDeleteNote';

export const DeleteModal = () => {
  const { deletingId, onDelete, resetDelitingId } = useDeleteNote();

  return (
    <Modal
      backdrop="static"
      size="md"
      open={!!deletingId}
      onClose={resetDelitingId}
    >
      <Modal.Header>
        <Heading level={4}>Удалить?</Heading>
      </Modal.Header>
      <Modal.Body></Modal.Body>

      <Modal.Footer>
        <Button appearance="primary" onClick={onDelete}>
          Ok
        </Button>
        <Button onClick={resetDelitingId} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
