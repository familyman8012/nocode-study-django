import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import NoteForm from '@/components/notes/NoteForm';
import { noteService } from '@/services/note-service';
import { NoteInput } from '@/interfaces/note';

const CreateNotePage = () => {
  const router = useRouter();

  const createNoteMutation = useMutation({
    mutationFn: (data: NoteInput) => noteService.createNote(data),
    onSuccess: () => {
      toast.success('노트가 생성되었습니다.');
      router.push('/notes');
    },
    onError: (error) => {
      console.error('노트 생성 실패:', error);
      toast.error('노트 생성에 실패했습니다.');
    },
  });

  const handleSubmit = async (data: NoteInput) => {
    await createNoteMutation.mutateAsync(data);
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          새 노트 작성
        </Typography>
        <NoteForm onSubmit={handleSubmit} submitLabel="작성하기" />
      </Box>
    </Container>
  );
};

export default CreateNotePage;
