import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import TodoForm from '@/components/todos/TodoForm';
import { todoService } from '@/services/todo-service';
import { TodoInput } from '@/interfaces/todo';

const CreateTodoPage = () => {
  const router = useRouter();

  const createTodoMutation = useMutation({
    mutationFn: (data: TodoInput) => todoService.createTodo(data),
    onSuccess: () => {
      toast.success('Todo가 생성되었습니다.');
      router.push('/todos');
    },
    onError: (error) => {
      console.error('Todo 생성 실패:', error);
      toast.error('Todo 생성에 실패했습니다.');
    },
  });

  const handleSubmit = async (data: TodoInput) => {
    await createTodoMutation.mutateAsync(data);
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          새 Todo 작성
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          새로운 할 일을 추가하세요.
        </Typography>
        <TodoForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default CreateTodoPage;
