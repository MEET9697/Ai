import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText
} from '@mui/material';


import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Container,
  Card,
  CardContent,
  TextField,
  Box,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Menu as MenuIcon,
  Code as CodeIcon,
  Search as SearchIcon,
  BugReport as BugReportIcon,
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { InputAdornment } from '@mui/material';

// ===============================
// Custom Components
// ===============================

const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        color: theme.palette.mode === 'dark' ? '#fff' : '#333',
    },
    '& .MuiInput-underline:before': {
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)',
    },
    '& .MuiInput-underline:hover:before': {
        borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
    '& .MuiInput-underline:after': {
        borderColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '& .MuiInputBase-input': {
        color: theme.palette.mode === 'dark' ? '#fff' : '#333',
      }
    },
    '& label': {
        color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
    },
    '& label.Mui-focused': {
        color: theme.palette.primary.main,
    },
}));

const ErrorItem = styled(Card)(({ theme }) => ({
    borderLeft: `4px solid ${theme.palette.error.main}`,
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.mode === 'dark' ? '#311e1e' : '#fef0f0',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
}));

const SuggestionCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.mode === 'dark' ? '#2d3748' : '#f7fafc',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#4a5568' : '#e2e8f0'}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

const CodeBlock = styled('pre')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#2d3748' : '#edf2f7',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    overflowX: 'auto',
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    margin: theme.spacing(0.5, 0),
    color: theme.palette.mode === 'dark' ? '#fff' : '#2d3748',
}));

const ApplyFixButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(1),
}));

const NoErrorsMessage = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  color: theme.palette.success.main,
}));

const TipContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    }
}));

const TipImage = styled(Box)(({ theme }) => ({
    width: 100,
    height: 100,
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginRight: theme.spacing(2),
}));

const StatsContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

const StatCard = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
}));

const Footer = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#0f172a' : '#1e293b',
    color: '#f8fafc',
    padding: theme.spacing(8, 0, 4),
    marginTop: theme.spacing(8),
}));

const FooterLinksContainer = styled(Container)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(6),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
        textAlign: 'left',
    },
}));

const FooterLinks = styled(Box)(({ theme }) => ({
    '& h3': {
        marginBottom: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        fontSize: '1.1rem',
    },
    '& a': {
        color: '#9ca3af',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        margin: theme.spacing(1, 0),
        transition: 'color 0.3s ease, transform 0.3s ease',
        '&:hover': {
            color: theme.palette.primary.light,
            transform: 'translateX(5px)',
        },
    },
    '& i': {
        fontSize: '0.8rem',
    },
}));

const NewsletterForm = styled('form')(({ theme }) => ({
    marginTop: theme.spacing(1),
    display: 'flex',
    gap: theme.spacing(1),
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row'
    }
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
    padding: theme.spacing(1.25, 1),
    border: 'none',
    borderRadius: theme.shape.borderRadius,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    transition: 'background-color 0.3s ease',
    '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)',
    },
    '&:focus': {
        outline: 'none',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    '& .MuiInputBase-input': {
        color: '#fff'
    }
}));

const NewsletterButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    border: 'none',
    padding: theme.spacing(1, 3),
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const SocialIcons = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
    },
    '& a': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            transform: 'translateY(-3px)',
        },
    },
    '& i': {
        color: '#fff',
        fontSize: '1.1rem',
    },
}));

const Copyright = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginTop: theme.spacing(6),
    paddingTop: theme.spacing(4),
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#9ca3af',
    fontSize: '0.9rem',
}));

// ===============================
// Main App Component
// ===============================

const MyStyledApp = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'));
        }
        return false;
    });

    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [consoleOutput, setConsoleOutput] = useState('<i class="fas fa-terminal"></i> Run your code to see output...');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [errorsFixed, setErrorsFixed] = useState(0);
    const [linesAnalyzed, setLinesAnalyzed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [tips, setTips] = useState([
      "Always check for proper variable initialization before using them.",
      "Use a debugger to step through your code and identify the exact location of the error.",
      "Read error messages carefully; they often provide valuable clues.",
      "Break down complex problems into smaller, more manageable parts.",
      "Test your code frequently, even if it seems to be working.",
      "Use comments to explain your code and make it easier to understand.",
      "Don't be afraid to ask for help from other developers.",
      "Learn to use version control to track changes and revert to previous versions if necessary.",
      "Write unit tests to ensure that your code works as expected.",
      "Practice debugging regularly to improve your skills."
    ]);
    const [currentTip, setCurrentTip] = useState(tips[0]);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const theme = useTheme();

    // Theme toggle
    const toggleDarkMode = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        }
    };

    // Language selection
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    // Code input change
    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    // Run code (demo)
    const handleRunCode = () => {
        if (!code.trim()) {
            setConsoleOutput('<i class="fas fa-terminal"></i> Error: No code to execute');
            return;
        }
        setConsoleOutput('<i> class="fas fa-terminal"></i> Running code...\n> Hello, World!\n> Program executed successfully.');
    };

    // Analyze code (demo)
    const handleAnalyzeCode = () => {
        if (!code.trim()) {
            setErrors([]);
            setConsoleOutput('');
            setSnackbarMessage('No code to analyze.');
            setSnackbarOpen(true);
            return;
        }

        setLoading(true);
        setErrors([]);
        setConsoleOutput('');

        setTimeout(() => {
            setLoading(false);
            const hasErrors = Math.random() < 0.5; // Simulate errors

            if (hasErrors) {
                const newErrors = [
                    {
                        title: 'SyntaxError: Invalid syntax',
                        line: 5,
                        explanation: 'The code has a syntax error. Check for correct use of operators and keywords.',
                        suggestion: '// Fix the syntax error here',
                    },
                    {
                        title: 'TypeError: \'undefined\' is not a function',
                        line: 12,
                        explanation: 'You are trying to call a method on an undefined variable.',
                        suggestion: 'Make sure the variable is properly defined and initialized.',
                    },
                    {
                        title: 'NameError: name \'my_variable\' is not defined',
                        line: 20,
                        explanation: 'The variable \'my_variable\' is not defined in the current scope.',
                        suggestion: 'Define the variable or check for typos.',
                    },
                ];
                setErrors(newErrors);
                setLinesAnalyzed(prev => prev + code.split('\n').length);
                setSnackbarMessage('Errors found. Check the analysis results.');
                setSnackbarOpen(true);
            } else {
                setErrors([]);
                setConsoleOutput('<i class="fas fa-check-circle"></i> No errors found!');
                setLinesAnalyzed(prev => prev + code.split('\n').length);
                setAccuracy(prev => prev + 100); //  full accuracy for no errors (demo)
                setSnackbarMessage('No errors found. Great job!');
                setSnackbarOpen(true);
            }
        }, 2000);
    };

    // Correct code (demo)
    const handleCorrectCode = () => {
      if (!code.trim()) {
          setConsoleOutput('<i class="fas fa-terminal"></i> Error: No code to correct');
          return;
        }
        setConsoleOutput('<i class="fas fa-terminal"></i> AI is correcting the code...');
        setTimeout(() => {
            const correctedCode = "// Here is the corrected code! \n" + code;
            setCode(correctedCode);
            setConsoleOutput('<i class="fas fa-terminal"></i> Code corrected!');
            setErrorsFixed(prev => prev + (errors?.length || 0)); // Increment errors fixed.
            setErrors([]);
            setAccuracy(prev => prev + (errors?.length ? 80 : 0)); // 80% accuracy if errors, 0 if no errors
            setSnackbarMessage('Code corrected using AI.');
            setSnackbarOpen(true);
        }, 3000);
    };

    // Apply fix (demo)
    const handleApplyFix = (suggestion) => {
        setCode(prevCode => prevCode.replace(suggestion, '// Fixed code applied here'));
        setErrorsFixed(prev => prev + 1);
        setErrors(prevErrors => prevErrors.filter(error => error.suggestion !== suggestion));
        setSnackbarMessage('Fix applied to code.');
        setSnackbarOpen(true);
    };

    // Random tip
    const displayRandomTip = () => {
        const randomIndex = Math.floor(Math.random() * tips.length);
        setCurrentTip(tips[randomIndex]);
    };

    useEffect(() => {
        const intervalId = setInterval(displayRandomTip, 10000); // Change tip every 10 seconds
        return () => clearInterval(intervalId);
    }, [tips]);

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        CodeFix AI
                    </Typography>
                    <IconButton color="inherit" onClick={() => setIsHelpOpen(true)}>
                        <LightbulbIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={toggleDarkMode}>
                        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    padding: 4,
                    background: theme.palette.mode === 'dark' ? '#121212' : '#f9f9f9',
                    minHeight: '100vh',
                }}
            >
                <Container maxWidth="xl">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            textAlign: 'center',
                            padding: '4rem 1rem',
                            background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #672cbc, #831843)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            color: '#fff',
                            borderRadius: 16,
                            marginBottom: '2.5rem',
                            boxShadow: theme.shadows[8],
                        }}
                    >
                        <Typography variant="h1" sx={{ fontSize: '2.8rem', mb: 3, maxWidth: 800, mx: 'auto' }}>
                            Fix Code Faster with AI-Powered Debugging!
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.25rem', mb: 5, color: 'rgba(255, 255, 255, 0.9)', maxWidth: 700, mx: 'auto' }}>
                            Smart. Simple. Seamless.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => document.getElementById('code-input').focus()}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark
                                }
                            }}
                        >
                            <BugReportIcon sx={{ mr: 1 }} /> Start Debugging Now
                        </Button>
                    </motion.section>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                        <Box display="flex" alignItems="center">
                            <CodeIcon sx={{ mr: 1, fontSize: '1.5rem' }} />
                            <Typography variant="h5">CodeFix AI</Typography>
                        </Box>
                        <Button
                            variant="outlined"
                            onClick={() => setIsHelpOpen(true)}
                            sx={{
                              '&:hover': {
                                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
                              }
                            }}
                        >
                            <LightbulbIcon sx={{ mr: 1 }} /> Help
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: 4,
                            [theme.breakpoints.up('lg')]: {
                                gridTemplateColumns: '1fr 1fr',
                            },
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Typography variant="h6" mb={2}>
                                    <CodeIcon sx={{ mr: 1 }} /> Code Input
                                </Typography>
                                <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                                    <Button
                                        variant={language === 'python' ? 'contained' : 'outlined'}
                                        onClick={() => handleLanguageChange('python')}
                                        sx={{
                                            borderRadius: 20,
                                            ...(language === 'python' && {
                                                backgroundColor: theme.palette.primary.main,
                                                color: '#fff',
                                            }),
                                        }}
                                    >
                                        <CodeIcon sx={{ mr: 0.5 }} /> Python
                                    </Button>
                                    <Button
                                        variant={language === 'javascript' ? 'contained' : 'outlined'}
                                        onClick={() => handleLanguageChange('javascript')}
                                        sx={{
                                            borderRadius: 20,
                                            ...(language === 'javascript' && {
                                                backgroundColor: theme.palette.primary.main,
                                                color: '#fff',
                                            }),
                                        }}
                                    >
                                        <CodeIcon sx={{ mr: 0.5 }} /> JavaScript
                                    </Button>
                                    <Button
                                        variant={language === 'java' ? 'contained' : 'outlined'}
                                        onClick={() => handleLanguageChange('java')}
                                        sx={{
                                            borderRadius: 20,
                                              ...(language === 'java' && {
                                                backgroundColor: theme.palette.primary.main,
                                                color: '#fff',
                                            }),
                                        }}
                                    >
                                        <CodeIcon sx={{ mr: 0.5 }} /> Java
                                    </Button>
                                    <Button
                                       variant={language === 'cpp' ? 'contained' : 'outlined'}
                                        onClick={() => handleLanguageChange('cpp')}
                                        sx={{
                                            borderRadius: 20,
                                            ...(language === 'cpp' && {
                                                backgroundColor: theme.palette.primary.main,
                                                color: '#fff',
                                            }),
                                        }}
                                    >
                                      <CodeIcon sx={{ mr: 0.5 }} /> C++
                                    </Button>
                                    <Button
                                      variant={language === 'ruby' ? 'contained' : 'outlined'}
                                        onClick={() => handleLanguageChange('ruby')}
                                        sx={{
                                            borderRadius: 20,
                                            ...(language === 'ruby' && {
                                                backgroundColor: theme.palette.primary.main,
                                                color: '#fff',
                                            }),
                                        }}
                                    >
                                        <CodeIcon sx={{ mr: 0.5 }} /> Ruby
                                    </Button>
                                </Box>
                                <StyledInput
                                    id="code-input"
                                    multiline
                                    rows={10}
                                    placeholder="Paste your code here..."
                                    value={code}
                                    onChange={handleCodeChange}
                                    fullWidth
                                    variant="outlined"
                                />
                                <Box
                                    sx={{
                                        backgroundColor: '#111827',
                                        borderRadius: 12,
                                        padding: 2,
                                        marginTop: 2,
                                        minHeight: 150,
                                        color: '#f3f4f6',
                                        fontFamily: 'monospace',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.5,
                                        whiteSpace: 'pre-wrap',
                                        overflowX: 'auto',
                                    }}
                                >
                                    {consoleOutput}
                                </Box>
                                <Box display="flex" gap={2} mt={2} flexWrap="wrap">
                                    <Button
                                        variant="contained"
                                        onClick={handleRunCode}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.dark,
                                            },
                                        }}
                                    >
                                        <SearchIcon sx={{ mr: 1 }} /> Run Code
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleAnalyzeCode}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: theme.palette.primary.dark,
                                            },
                                        }}
                                    >
                                        <SearchIcon sx={{ mr: 1 }} /> Analyze Code
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleCorrectCode}
                                        sx={{
                                          backgroundColor: theme.palette.primary.main,
                                          color: '#fff',
                                          '&:hover': {
                                            backgroundColor: theme.palette.primary.dark
                                          }
                                        }}
                                    >
                                        <BugReportIcon sx={{ mr: 1 }} /> Correct Code
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <Typography variant="h6" mb={2}>
                                    <SearchIcon sx={{ mr: 1 }} /> Analysis Results
                                </Typography>
                                {loading && (
                                    <Box
                                        sx={{
                                            textAlign: 'center',
                                            padding: 4,
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                                            zIndex: 10,
                                            borderRadius: 16,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <CircularProgress sx={{ mb: 2 }} />
                                        <Typography>
                                            <BugReportIcon sx={{ mr: 0.5 }} /> Analyzing your code...
                                        </Typography>
                                    </Box>
                                )}
                                {!loading && errors.length === 0 && !code.trim() && (
                                  <Box>
                                    <Typography variant="body1" sx={{ color: '#9ca3af' }}>
                                        <CodeIcon sx={{ fontSize: '2rem', mb: 2, color: '#9ca3af' }} />
                                        Enter some code and click "Analyze Code" to get started.
                                    </Typography>
                                  </Box>
                                )}
                                {!loading && errors.length === 0 && code.trim() && (
                                    <NoErrorsMessage>
                                        <CheckCircleIcon sx={{ fontSize: '4rem', mb: 2 }} />
                                        <Typography variant="h3" sx={{ color: theme.palette.success.main, mb: 0.5 }}>No errors found!</Typography>
                                        <Typography variant="body1">Your code looks good. Great job!</Typography>
                                    </NoErrorsMessage>
                                )}
                                {!loading && errors.length > 0 && (
                                    <Box>
                                        {errors.map((error, index) => (
                                            <ErrorItem key={index}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                        {error.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            backgroundColor: theme.palette.error.light,
                                                            borderRadius: 4,
                                                            padding: '0.25rem 0.5rem',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        Line {error.line}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1" mb={1}>
                                                    {error.explanation}
                                                </Typography>
                                                {error.suggestion && (
                                                  <SuggestionCard>
                                                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                                        <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
                                                            <LightbulbIcon sx={{ mr: 0.5 }} /> Quick Fix Suggestion
                                                        </Typography>
                                                      </Box>
                                                      <CodeBlock>{error.suggestion}</CodeBlock>
                                                      <ApplyFixButton
                                                        onClick={() => handleApplyFix(error.suggestion)}
                                                      >
                                                        <CheckCircleIcon sx={{mr: 0.5}}/> Apply Fix
                                                      </ApplyFixButton>
                                                  </SuggestionCard>
                                                )}
                                            </ErrorItem>
                                        ))}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Box>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{
                            marginTop: '2rem',
                            padding: '2rem',
                            background: theme.palette.mode === 'dark' ? 'linear-gradient(135deg, #672cbc, #831843)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            borderRadius: 16,
                            color: '#fff',
                            boxShadow: theme.shadows[8]
                        }}
                    >
                        <Typography variant="h4" mb={2}>
                            <LightbulbIcon sx={{ mr: 1 }} /> Debugging Tips & Stats
                        </Typography>
                        <TipContainer>
                            <TipImage>
                                <LightbulbIcon sx={{ fontSize: '3rem', color: 'rgba(255, 255, 255, 0.3)' }} />
                            </TipImage>
                            <Box>
                                <Typography variant="h6" mb={1}>
                                    <LightbulbIcon sx={{ mr: 0.5 }} /> Tip of the Day
                                </Typography>
                                <Typography variant="body1" id="current-tip">
                                  {currentTip}
                                </Typography>
                            </Box>
                        </TipContainer>
                        <StatsContainer>
                            <StatCard>
                                <StatNumber id="errors-fixed">
                                    <BugReportIcon sx={{ fontSize: '1.5rem' }} /> {errorsFixed}
                                </StatNumber>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>Errors Fixed</Typography>
                            </StatCard>
                            <StatCard>
                                <StatNumber id="code-analyzed">
                                    <CodeIcon sx={{ fontSize: '1.5rem' }} /> {linesAnalyzed}
                                </StatNumber>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>Lines Analyzed</Typography>
                            </StatCard>
                            <StatCard>
                                <StatNumber id="accuracy">
                                    <CheckCircleIcon sx={{ fontSize: '1.5rem' }} /> {accuracy}%
                                </StatNumber>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>Fix Accuracy</Typography>
                            </StatCard>
                        </StatsContainer>
                    </motion.section>

                    <section id="about" style={{ marginTop: '2rem' }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" mb={2}>
                                    <SearchIcon sx={{ mr: 1 }} /> About CodeFix AI
                                </Typography>
                                <Typography variant="body1">
                                    <BugReportIcon sx={{ mr: 0.5 }} /> CodeFix AI is a cutting-edge platform designed to
                                    streamline the code debugging process. Our intelligent system analyzes your code in
                                    real-time, identifies errors, and provides smart suggestions to help you write better code
                                    faster. Whether you're a beginner or an experienced developer, CodeFix AI helps you
                                    catch bugs before they become problems.
                                </Typography>
                            </CardContent>
                        </Card>
                    </section>
                </Container>
            </Box>

            <Footer>
                <FooterLinksContainer>
                    <FooterLinks>
                        <h3>
                            <SearchIcon sx={{ fontSize: '1rem' }} /> Quick Links
                        </h3>
                        <a href="#home">
                            <SearchIcon sx={{ fontSize: '0.8rem' }} /> Home
                        </a>
                        <a href="#features">
                            <SearchIcon sx={{ fontSize: '0.8rem' }} /> Features
                        </a>
                        <a href="#about">
                            <SearchIcon sx={{ fontSize: '0.8rem' }} /> About
                        </a>
                        <a href="#contact">
                            <SearchIcon sx={{ fontSize: '0.8rem' }} /> Contact
                        </a>
                    </FooterLinks>
                    <FooterLinks>
                        <h3>
                            <CodeIcon sx={{ fontSize: '1rem' }} /> Resources
                        </h3>
                        <a href="#">
                            <SearchIcon sx={{ fontSize: '0.8rem' }} /> Documentation
                        </a>
                        <a href="#">
                            <SearchIcon sx={{ fontSize: '0.8rem' }} /> API Reference
                        </a>
                        <a href="#">
                            <SearchIcon sx={{ fontSize: '0.8rem' }} /> Tutorials
                        </a>
                        <a href="#">
                            <SearchIcon sx={{ fontSize: '0.8rem' }} /> Blog
                        </a>
                    </FooterLinks>
                    <FooterLinks>
                        <h3>
                            <SearchIcon sx={{ fontSize: '1rem' }} /> Newsletter
                        </h3>
                        <Typography variant="body2" sx={{ color: '#9ca3af' }}>
                            Subscribe to get updates and debugging tips
                        </Typography>
                        <NewsletterForm>
                            <NewsletterInput type="email" placeholder="Your email" />
                            <NewsletterButton type="submit">
                                <SearchIcon sx={{ fontSize: '0.8rem' }} />
                            </NewsletterButton>
                        </NewsletterForm>
                    </FooterLinks>
                    <SocialIcons>
                        <a href="#">
                            <svg><use xlinkHref="#twitter-icon" /></svg>
                        </a>
                        <a href="#">
                            <svg><use xlinkHref="#github-icon" /></svg>
                        </a>
                        <a href="#">
                            <svg><use xlinkHref="#linkedin-icon" /></svg>
                        </a>
                        <a href="#">
                            <svg><use xlinkHref="#youtube-icon" /></svg>
                        </a>
                    </SocialIcons>
                </FooterLinksContainer>
                <Copyright>&copy; {new Date().getFullYear()} CodeFix AI. All rights reserved.</Copyright>
            </Footer>

            {/* Help Dialog */}
            <Dialog open={isHelpOpen} onClose={() => setIsHelpOpen(false)}>
                <DialogTitle>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <LightbulbIcon sx={{ mr: 1 }} />
                    Debugging Tips
                    <IconButton onClick={() => setIsHelpOpen(false)}>
                      <CloseIcon/>
                    </IconButton>
                  </Box>
                </DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="1. Understand the Error" secondary="Read the error message carefully. It provides clues about what went wrong and where." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="2. Use Debugging Tools" secondary="Use a debugger to step through your code and inspect variables to find the issue." />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="3. Simplify the Code" secondary="Comment out or remove unnecessary parts of your code to isolate the problem." />
                        </ListItem>
                         <ListItem>
                            <ListItemText primary="4. Test Frequently" secondary="Run your code often, after small changes, to catch errors early." />
                        </ListItem>
                         <ListItem>
                            <ListItemText primary="5. Ask for Help" secondary="Don't hesitate to seek assistance from online forums, colleagues, or mentors." />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsHelpOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message={snackbarMessage}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleCloseSnackbar}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
        </>
    );
};

export default MyStyledApp;