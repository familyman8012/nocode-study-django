import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import TodoForm from '@/components/todos/TodoForm';
import { todoService } from '@/services/todo-service';
import { TodoInput } from '@/interfaces/todo';

const EditTodoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const todoId = Number(id);

  // Todo 상세 정보 조회
  const { data: todo, isLoading } = useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => todoService.getTodo(todoId),
    enabled: !!todoId && !isNaN(todoId),
  });

  // Todo 수정
  const updateTodoMutation = useMutation({
    mutationFn: (data: TodoInput) => todoService.updateTodo(todoId, data),
    onSuccess: () => {
      toast.success('Todo가 수정되었습니다.');
      router.push('/todos');
    },
    onError: (error) => {
      console.error('Todo 수정 실패:', error);
      toast.error('Todo 수정에 실패했습니다.');
    },
  });

  // Todo 삭제
  const deleteTodoMutation = useMutation({
    mutationFn: () => todoService.deleteTodo(todoId),
    onSuccess: () => {
      toast.success('Todo가 삭제되었습니다.');
      router.push('/todos');
    },
    onError: (error) => {
      console.error('Todo 삭제 실패:', error);
      toast.error('Todo 삭제에 실패했습니다.');
    },
  });

  const handleSubmit = async (data: TodoInput) => {
    await updateTodoMutation.mutateAsync(data);
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteTodoMutation.mutateAsync();
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

  if (!todo) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography>Todo를 찾을 수 없습니다.</Typography>
        </Box>
      </Container>
    );
  }

  const initialData: TodoInput = {
    task: todo.task,
    due_date: todo.due_date,
    priority: todo.priority,
    status: todo.status,
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo 수정
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          할 일의 내용이나 상태를 수정하세요.
        </Typography>
        <TodoForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          submitLabel="수정하기"
        />
      </Box>
    </Container>
  );
};

export default EditTodoPage;
