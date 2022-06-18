import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
const decoder = require('html-entity-decoder');
import { shuffle } from '../utils/functions/shuffle';
import { useRouter } from 'next/router';
import ConfettiGenerator from 'confetti-js';
import styled from '@emotion/styled';

function Questions({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [rongAnswer, setRongAnswer] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  console.log(questions[currentQuestion].correct_answer);
  const handleClick = answer => {
    if (answer === questions[currentQuestion].correct_answer) {
      setCorrectAnswer(correctAnswer + 1);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setRongAnswer(rongAnswer + 1);
      setCurrentQuestion(currentQuestion + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRestart = () => {
    router.push({
      pathname: '/',
    });
  };
  React.useEffect(() => {
    const confettiSettings = { target: 'my-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    if (open) confetti.render();

    return () => confetti.clear();
  }, [open]);
  return (
    <>
      <canvas id="my-canvas"></canvas>
      <Box
        width="50%"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '2rem',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          zIndex: `${open ? '-1' : '1'}`,
        }}
      >
        <Typography
          marginBottom="2rem"
          variant="body"
          component="h4"
          textAlign="right"
        >
          Correct Answers : {correctAnswer}/{questions.length}
        </Typography>
        <Typography
          marginBottom="2rem"
          variant="body"
          component="h2"
          textAlign="center"
        >
          {decoder.feed(questions[currentQuestion].question)}
        </Typography>
        <List sx={{ width: '78%', margin: '0 auto' }}>
          {shuffle([
            ...questions[currentQuestion].incorrect_answers,
            questions[currentQuestion].correct_answer,
          ]).map((answer, index) => (
            <ListItem
              disablePadding
              key={index}
              sx={{ backgroundColor: '#85C6FC', marginBottom: '1rem' }}
            >
              <ListItemButton onClick={e => handleClick(answer)}>
                <ListItemText
                  primary={`${decoder.feed(answer)}`}
                  sx={{ textAlign: 'center' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box ml="auto" width="50%">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={e => {
              setCurrentQuestion(currentQuestion + 1);
              if (currentQuestion === questions.length - 1) {
                setCurrentQuestion(0);
                setOpen(true);
              }
            }}
          >
            Next question
          </Button>
        </Box>
      </Box>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="Congrats"
      >
        <DialogTitle textAlign="center" id="Congrats">
          {'Congrats'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            You answerd {(correctAnswer / questions.length) * 100}%
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="contained"
            color="secondary"
            onClick={handleRestart}
            fullWidth
          >
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Questions;
