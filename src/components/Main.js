import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
function Main({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const router = useRouter();

  const submitHandler = e => {
    e.preventDefault();
    if (selectedCategory === '') setSelectedCategory(false);
    if (selectedDifficulty === '') setSelectedDifficulty(false);
    if (selectedAmount === '') setSelectedAmount(false);
    if (selectedCategory && selectedDifficulty && selectedAmount) {
      router.replace({
        pathname: '/questions',
        query: {
          amount: selectedAmount,
          category: selectedCategory,
          difficulty: selectedDifficulty,
        },
      });
    }
  };
  return (
    <Box
      width="35%"
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        borderRadius: '5px',
        padding: '2rem',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography marginBottom="2rem" variant="body" component="h1">
        Setup Quiz
      </Typography>
      <Box component="form" autoComplete="off" onSubmit={e => submitHandler(e)}>
        <Box marginBottom="1rem">
          <Typography variant="body" component="h4">
            Number Of Questions
          </Typography>
          <TextField
            id="quizNumber"
            type="number"
            inputProps={{ min: 1, max: 50 }}
            variant="filled"
            size="small"
            margin="dense"
            fullWidth
            value={selectedAmount}
            onChange={e => setSelectedAmount(e.target.value)}
            error={selectedAmount === false}
            helperText={selectedAmount === false ? 'Required' : ''}
          />
        </Box>
        <Box marginBottom="1rem">
          <Typography variant="body" component="h4">
            Category
          </Typography>
          <TextField
            id="quizCategory"
            select
            variant="filled"
            size="small"
            margin="dense"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            fullWidth
            error={selectedCategory === false}
            helperText={
              selectedCategory === false ? 'plz select a category' : ''
            }
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box marginBottom="1rem">
          <Typography variant="body" component="h4">
            Difficulty
          </Typography>
          <TextField
            id="quizDifficulty"
            select
            variant="filled"
            size="small"
            margin="dense"
            fullWidth
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            error={selectedDifficulty === false}
            helperText={
              selectedDifficulty === false ? 'plz select a difficulty' : ''
            }
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>
        </Box>
        <Box marginTop="2rem">
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Start Quiz
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Main;
