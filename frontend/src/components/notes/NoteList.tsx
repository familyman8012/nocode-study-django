import React from 'react';
import { Box, Pagination } from '@mui/material';
import { Note } from '@/interfaces/note';
import NoteItem from './NoteItem';
import { PaginatedResponse } from '@/interfaces/api';

interface NoteListProps {
  notesData: PaginatedResponse<Note>;
  onPageChange: (page: number) => void;
  onUpdateNote: (id: number, content: string) => void;
  onDeleteNote: (id: number) => void;
  currentPage: number;
}

const NoteList: React.FC<NoteListProps> = ({
  notesData,
  onPageChange,
  onUpdateNote,
  onDeleteNote,
  currentPage,
}) => {
  const { results: notes, count } = notesData;
  const pageSize = 10; // 페이지당 아이템 수
  const totalPages = Math.ceil(count / pageSize);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onUpdate={onUpdateNote}
            onDelete={onDeleteNote}
          />
        ))}
      </Box>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default NoteList;
