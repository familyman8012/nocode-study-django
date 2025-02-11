import React from 'react';
import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Note } from '@/interfaces/note';
import { PaginatedResponse } from '@/interfaces/api';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

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
  currentPage,
}) => {
  const router = useRouter();
  const { results: notes, count } = notesData;
  const pageSize = 10;
  const totalPages = Math.ceil(count / pageSize);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  const handleRowClick = (id: number) => {
    router.push(`/notes/${id}/edit`);
  };

  const formatContent = (content: string) => {
    return content.length > 100 ? content.substring(0, 100) + '...' : content;
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="10%">번호</TableCell>
              <TableCell>내용</TableCell>
              <TableCell width="15%">작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note, index) => (
              <TableRow
                key={note.id}
                hover
                onClick={() => handleRowClick(note.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  {count - (currentPage - 1) * pageSize - index}
                </TableCell>
                <TableCell>{formatContent(note.content)}</TableCell>
                <TableCell>
                  {dayjs(note.created_at).format('YYYY-MM-DD')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
