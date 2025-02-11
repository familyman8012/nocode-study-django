import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import NoteList from '@/components/notes/NoteList';
import { noteService } from '@/services/note-service';


const NotesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  // 노트 목록 조회
  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', currentPage],
    queryFn: () => noteService.getNotes({ page: currentPage }),
  });

  // 노트 수정
  const updateNoteMutation = useMutation({
    mutationFn: ({ id, content }: { id: number; content: string }) =>
      noteService.updateNote(id, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.error('노트 수정 실패:', error);
      toast.error('노트 수정에 실패했습니다.');
    },
  });

  // 노트 삭제
  const deleteNoteMutation = useMutation({
    mutationFn: (id: number) => noteService.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.error('노트 삭제 실패:', error);
      toast.error('노트 삭제에 실패했습니다.');
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUpdateNote = async (id: number, content: string) => {
    await updateNoteMutation.mutateAsync({ id, content });
  };

  const handleDeleteNote = async (id: number) => {
    await deleteNoteMutation.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography>로딩 중...</Typography>
        </Box>
      </Container>
    );
  }

  if (!notesData) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography>노트를 불러올 수 없습니다.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          노트 목록
        </Typography>
        <NoteList
          notesData={notesData}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
        />
      </Box>
    </Container>
  );
};

export default NotesPage;
