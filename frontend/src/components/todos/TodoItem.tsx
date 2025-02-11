import React from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Chip,
  Box,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Todo, Priority, Status } from '@/interfaces/todo';
import dayjs from 'dayjs';

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: number, status: Status) => Promise<void>;
  onEdit: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
}

const getPriorityColor = (priority: Priority): "error" | "warning" | "info" => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
  }
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const handleStatusChange = async () => {
    const newStatus: Status = todo.status === 'completed' ? 'pending' : 'completed';
    await onStatusChange(todo.id, newStatus);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await onDelete(todo.id);
    }
  };

  return (
    <ListItem
      secondaryAction={
        <Box>
          <IconButton edge="end" onClick={() => onEdit(todo.id)} sx={{ mr: 1 }}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <Checkbox
        edge="start"
        checked={todo.status === 'completed'}
        onChange={handleStatusChange}
      />
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                textDecoration:
                  todo.status === 'completed' ? 'line-through' : 'none',
              }}
            >
              {todo.task}
            </Typography>
            <Chip
              label={todo.priority}
              color={getPriorityColor(todo.priority)}
              size="small"
            />
          </Box>
        }
        secondary={`기한: ${dayjs(todo.due_date).format('YYYY-MM-DD')}`}
      />
    </ListItem>
  );
};

export default TodoItem;
