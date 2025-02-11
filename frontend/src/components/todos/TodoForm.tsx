import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { TodoInput } from '@/interfaces/todo';
import dayjs from 'dayjs';

interface TodoFormProps {
  initialData?: TodoInput;
  onSubmit: (data: TodoInput) => Promise<void>;
  onDelete?: () => Promise<void>;
  submitLabel?: string;
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialData,
  onSubmit,
  onDelete,
  submitLabel = '저장',
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TodoInput>({
    defaultValues: initialData || {
      task: '',
      due_date: dayjs().format('YYYY-MM-DD'),
      priority: 'medium',
      status: 'pending',
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%', mt: 2 }}
    >
      <Controller
        name="task"
        control={control}
        rules={{
          required: '할 일을 입력해주세요',
          minLength: {
            value: 1,
            message: '최소 1자 이상 입력해주세요',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="할 일"
            error={!!errors.task}
            helperText={errors.task?.message}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Controller
        name="due_date"
        control={control}
        rules={{ required: '마감일을 선택해주세요' }}
        render={({ field }) => (
          <TextField
            {...field}
            type="date"
            fullWidth
            label="마감일"
            error={!!errors.due_date}
            helperText={errors.due_date?.message}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        rules={{ required: '우선순위를 선택해주세요' }}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.priority} sx={{ mb: 2 }}>
            <InputLabel>우선순위</InputLabel>
            <Select {...field} label="우선순위">
              <MenuItem value="high">높음</MenuItem>
              <MenuItem value="medium">중간</MenuItem>
              <MenuItem value="low">낮음</MenuItem>
            </Select>
            {errors.priority && (
              <FormHelperText>{errors.priority.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      {initialData && (
        <Controller
          name="status"
          control={control}
          rules={{ required: '상태를 선택해주세요' }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.status} sx={{ mb: 2 }}>
              <InputLabel>상태</InputLabel>
              <Select {...field} label="상태">
                <MenuItem value="pending">진행중</MenuItem>
                <MenuItem value="completed">완료</MenuItem>
              </Select>
              {errors.status && (
                <FormHelperText>{errors.status.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      )}

      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {submitLabel}
        </Button>
        {onDelete && (
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={onDelete}
            disabled={isSubmitting}
          >
            삭제하기
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TodoForm;
