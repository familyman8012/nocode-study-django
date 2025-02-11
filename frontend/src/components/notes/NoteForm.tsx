import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { NoteInput } from '@/interfaces/note';

interface NoteFormProps {
  initialData?: NoteInput;
  onSubmit: (data: NoteInput) => Promise<void>;
  submitLabel?: string;
}

const NoteForm: React.FC<NoteFormProps> = ({
  initialData,
  onSubmit,
  submitLabel = '저장',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: initialData || {
      content: '',
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: '100%', mt: 2 }}
    >
      <TextField
        {...register('content', {
          required: '내용을 입력해주세요',
          minLength: {
            value: 1,
            message: '최소 1자 이상 입력해주세요',
          },
        })}
        fullWidth
        multiline
        rows={4}
        label="노트 내용"
        error={!!errors.content}
        helperText={errors.content?.message}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {submitLabel}
      </Button>
    </Box>
  );
};

export default NoteForm;
