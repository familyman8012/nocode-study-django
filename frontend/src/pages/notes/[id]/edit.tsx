import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import NoteForm from '@/components/notes/NoteForm';
import { noteService } from '@/services/note-service';
import { NoteInput } from '@/interfaces/note';

const EditNotePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const noteId = Number(id);

  // 노트 상세 정보 조회
  const { data: note, isLoading } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => noteService.getNote(noteId),
    enabled: !!noteId && !isNaN(noteId),
  });

  // 노트 수정
  const updateNoteMutation = useMutation({
    mutationFn: (data: NoteInput) => noteService.updateNote(noteId, data),
    onSuccess: () => {
      toast.success('노트가 수정되었습니다.');
      router.push('/notes');
    },
    onError: (error) => {
      console.error('노트 수정 실패:', error);
      toast.error('노트 수정에 실패했습니다.');
    },
  });

  // 노트 삭제
  const deleteNoteMutation = useMutation({
    mutationFn: () => noteService.deleteNote(noteId),
    onSuccess: () => {
      toast.success('노트가 삭제되었습니다.');
      router.push('/notes');
    },
    onError: (error) => {
      console.error('노트 삭제 실패:', error);
      toast.error('노트 삭제에 실패했습니다.');
    },
  });

  const handleSubmit = async (data: NoteInput) => {
    await updateNoteMutation.mutateAsync(data);
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteNoteMutation.mutateAsync();
    }
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

  if (!note) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography>노트를 찾을 수 없습니다.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          노트 수정
        </Typography>
        <NoteForm
          initialData={{ content: note.content }}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          submitLabel="수정하기"
        />
      </Box>
    </Container>
  );
};

export default EditNotePage;
