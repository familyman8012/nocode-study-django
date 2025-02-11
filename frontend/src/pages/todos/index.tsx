import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Typography, Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import TodoList from '@/components/todos/TodoList';
import TodoFilter from '@/components/todos/TodoFilter';
import { todoService } from '@/services/todo-service';
import { TodoParams, Status } from '@/interfaces/todo';

const TodosPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TodoParams>({});

  // Todo 목록 조회
  const { data: todosData, isLoading } = useQuery({
    queryKey: ['todos', currentPage, filters],
    queryFn: () =>
      todoService.getTodos({
        page: currentPage,
        ...filters,
      }),
  });

  // Todo 상태 변경
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: Status }) =>
      todoService.patchTodo(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo 상태가 변경되었습니다.');
    },
    onError: (error) => {
      console.error('Todo 상태 변경 실패:', error);
      toast.error('Todo 상태 변경에 실패했습니다.');
    },
  });

  // Todo 삭제
  const deleteMutation = useMutation({
    mutationFn: (id: number) => todoService.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo가 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('Todo 삭제 실패:', error);
      toast.error('Todo 삭제에 실패했습니다.');
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: TodoParams) => {
    setFilters(newFilters);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
  };

  const handleStatusChange = async (id: number, status: Status) => {
    await updateStatusMutation.mutateAsync({ id, status });
  };

  const handleEdit = (id: number) => {
    router.push(`/todos/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
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

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Todo 목록
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => router.push('/todos/create')}
          >
            새 Todo 작성
          </Button>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          할 일을 관리하고 진행 상황을 추적하세요.
        </Typography>

        <TodoFilter filters={filters} onFilterChange={handleFilterChange} />

        {todosData && (
          <TodoList
            todosData={todosData}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onStatusChange={handleStatusChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Box>
    </Container>
  );
};

export default TodosPage;
