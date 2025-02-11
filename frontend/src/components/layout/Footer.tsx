import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <MuiLink color="inherit" href="/">
            Note & Todo App
          </MuiLink>{' '}
          {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};
