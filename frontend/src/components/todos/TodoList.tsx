import React from 'react';
import { List, Paper, Box, Pagination } from '@mui/material';
import { Todo, Status } from '@/interfaces/todo';
import TodoItem from './TodoItem';
import { PaginatedResponse } from '@/interfaces/api';

interface TodoListProps {
  todosData: PaginatedResponse<Todo>;
  currentPage: number;
  onPageChange: (page: number) => void;
  onStatusChange: (id: number, status: Status) => Promise<void>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({
  todosData,
  currentPage,
  onPageChange,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const { results: todos, count } = todosData;
  const pageSize = 10;
  const totalPages = Math.ceil(count / pageSize);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Box>
      <Paper>
        <List>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </List>
      </Paper>
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

export default TodoList;
