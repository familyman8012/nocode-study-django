import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { Priority, Status, TodoParams } from '@/interfaces/todo';
import { SelectChangeEvent } from '@mui/material/Select';


interface TodoFilterProps {
  filters: TodoParams;
  onFilterChange: (filters: TodoParams) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filters, onFilterChange }) => {
  const handleChange = (
    field: keyof TodoParams,
    value: string | Priority | Status | null
  ) => {
    onFilterChange({
      ...filters,
      [field]: value || undefined,
    });
  };

  const handleDateChange = (
    field: 'due_date__gte' | 'due_date__lte',
    value: string
  ) => {
    onFilterChange({
      ...filters,
      [field]: value || undefined,
    });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>우선순위</InputLabel>
        <Select
          value={filters.priority || ''}
          label="우선순위"
          onChange={(e: SelectChangeEvent) =>
            handleChange('priority', e.target.value as Priority)
          }
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="high">높음</MenuItem>
          <MenuItem value="medium">중간</MenuItem>
          <MenuItem value="low">낮음</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>상태</InputLabel>
        <Select
          value={filters.status || ''}
          label="상태"
          onChange={(e: SelectChangeEvent) =>
            handleChange('status', e.target.value as Status)
          }
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="pending">진행중</MenuItem>
          <MenuItem value="completed">완료</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="시작일"
        type="date"
        value={filters.due_date__gte || ''}
        onChange={(e) => handleDateChange('due_date__gte', e.target.value)}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="종료일"
        type="date"
        value={filters.due_date__lte || ''}
        onChange={(e) => handleDateChange('due_date__lte', e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};

export default TodoFilter;
