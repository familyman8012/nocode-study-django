import React, { useState } from 'react';
import { Note } from '@/interfaces/note';
import { Box, Card, CardContent, CardActions, Typography, IconButton, TextField } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await onUpdate(note.id, editContent);
      setIsEditing(false);
      toast.success('노트가 수정되었습니다.');
    } catch (error) {
      console.error(error);
      toast.error('노트 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(note.id);
      toast.success('노트가 삭제되었습니다.');
    } catch (error) {
      console.error(error);
      toast.error('노트 삭제에 실패했습니다.');
    }
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('YYYY-MM-DD HH:mm');
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              minRows={2}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              variant="outlined"
            />
          ) : (
            <Typography
              variant="body1"
              component="div"
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {note.content}
            </Typography>
          )}
        </Box>
        <Typography variant="caption" color="text.secondary">
          작성일: {formatDate(note.created_at)}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={isEditing ? handleSave : handleEdit}
          color="primary"
          aria-label={isEditing ? '저장' : '수정'}
        >
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
        <IconButton
          onClick={handleDelete}
          color="error"
          aria-label="삭제"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteItem;
