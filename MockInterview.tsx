import React from 'react';
import { motion } from 'framer-motion';
import { Mic, User, Bot, AlertCircle, BarChart, Book, Clock, Loader2, Sparkles, Volume2, Timer } from 'lucide-react';
import axios from 'axios';

const jobRoles = [
  'Core Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'AI/ML Engineer',
  'Cloud Engineer',
];

const experienceLevels = ['Intern', 'Junior', 'Mid', 'Senior'];
const MAX_RECORDING_TIME = 50;

interface Question {
  question: string;
  difficulty?: "Easy" | "Medium" | "Hard";  // <-- add this line
  requiredKeywords: string[];
}


interface DetailedAnalysis {
  wordCount: number;
  sentenceCount: number;
  averageWordLength: number;
  uniqueWords: number;
}

interface AnalysisResult {
  classification: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  matchPercentage: number;
  feedback: string;
  detailedAnalysis: DetailedAnalysis;
}

export function MockInterview() {
  const [selectedRole, setSelectedRole] = React.useState('');
  const API = import.meta.env.VITE_API_BASE_URL || '/api';

  const [questionSource, setQuestionSource] = React.useState<'static' | 'ai'>('static');
  const [company, setCompany] = React.useState('');
  const [experienceLevel, setExperienceLevel] = React.useState('');
  const [isRecording, setIsRecording] = React.useState(false);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState('');
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [suggestedAnswer, setSuggestedAnswer] = React.useState<string>('');
  const [isLoadingSuggestion, setIsLoadingSuggestion] = React.useState(false);
  const [recordingTime, setRecordingTime] = React.useState(0);
  const [audioStream, setAudioStream] = React.useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = React.useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [volume, setVolume] = React.useState(0);
  const [transcribedText, setTranscribedText] = React.useState<string>('');

  const timerRef = React.useRef<NodeJS.Timeout>();
  const volumeRef = React.useRef<NodeJS.Timeout>();
  const audioContextRef = React.useRef<AudioContext>();
  const analyserRef = React.useRef<AnalyserNode>();
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);

  React.useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(' ');
        setTranscribedText(transcript);
        setAnswer(transcript);
      };
    }

    return () => {
      recognitionRef.current?.stop();
      timerRef.current && clearInterval(timerRef.current);
      volumeRef.current && clearInterval(volumeRef.current);
      audioStream?.getTracks().forEach((track) => track.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, []);

  const fetchQuestions = async (role: string) => {
    try {
      setIsLoading(true);
      setError(null);
      let response;

      if (questionSource === 'ai') {
  response = await axios.post(`${API}/generate-question`, {
    company: company || 'Google',
    role,
    experienceLevel: experienceLevel || 'Senior',
  });
} else {
  let url = `${API}/questions/${encodeURIComponent(role)}`;
  if (experienceLevel)
    url += `?experienceLevel=${encodeURIComponent(experienceLevel)}`;
  response = await axios.get(url);
}



      if (response.data && Array.isArray(response.data)) {
        const cleanQuestions = response.data
          .filter((q) => q.question && Array.isArray(q.requiredKeywords))
          .map((q) => ({
            question: q.question.trim(),
            requiredKeywords: q.requiredKeywords,
            difficulty: q.difficulty || undefined,
          }));

        if (cleanQuestions.length === 0) throw new Error('No valid questions found.');

        setQuestions(cleanQuestions);
        setCurrentQuestionIndex(0);
        setAnswer('');
        setAnalysis(null);
        setSuggestedAnswer('');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to fetch questions. Please try again.');
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (selectedRole) fetchQuestions(selectedRole);
  }, [selectedRole, questionSource, experienceLevel]);

  const startVolumeMonitoring = (stream: MediaStream) => {
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    volumeRef.current = setInterval(() => {
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        setVolume(average);
      }
    }, 100);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      startVolumeMonitoring(stream);
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) setAudioChunks((chunks) => [...chunks, event.data]);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      recorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
      recognitionRef.current?.start();
    } catch (err) {
      console.error('Mic access error:', err);
      setError('Microphone permission denied or unavailable.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    audioStream?.getTracks().forEach((track) => track.stop());
    timerRef.current && clearInterval(timerRef.current);
    volumeRef.current && clearInterval(volumeRef.current);
    audioContextRef.current?.close();
    recognitionRef.current?.stop();
    setIsRecording(false);
    setVolume(0);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim() || !questions[currentQuestionIndex]) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API}/evaluate`, {
  answer,
  question: questions[currentQuestionIndex],
  role: selectedRole,
  company,
  experienceLevel,
});


      setAnalysis(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze answer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetSuggestion = async () => {
    if (!questions[currentQuestionIndex]) return;
    setIsLoadingSuggestion(true);
    try {
     const response = await axios.post(`${API}/suggest-answer`, {
  question: questions[currentQuestionIndex].question,
  requiredKeywords: questions[currentQuestionIndex].requiredKeywords,
});


      setSuggestedAnswer(response.data?.suggestedAnswer || '');
    } catch (err) {
      console.error(err);
      setError('AI suggestion failed.');
    } finally {
      setIsLoadingSuggestion(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setAnswer('');
      setAnalysis(null);
      setSuggestedAnswer('');
      setTranscribedText('');
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const getConfidenceColor = (p: number) =>
    p >= 75 ? 'bg-green-500' : p >= 40 ? 'bg-yellow-500' : 'bg-red-500';
  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  const getRemainingTime = () => MAX_RECORDING_TIME - recordingTime;

  if (isLoading && !questions.length)
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground mt-4">Loading questions...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Technical Interview Practice</h1>

        {/* 🎯 Role, Source, Company, Level */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-lg font-medium mb-2">Select Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary"
            >
              <option value="">Choose a role...</option>
              {jobRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Question Source:</label>
            <select
              value={questionSource}
              onChange={(e) => setQuestionSource(e.target.value as 'static' | 'ai')}
              className="w-full p-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary"
            >
              <option value="static">Predefined (Static)</option>
              <option value="ai">AI Generated</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Experience Level:</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full p-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary"
            >
              <option value="">Select...</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        {questionSource === 'ai' && (
          <div className="mb-8">
            <label className="block text-lg font-medium mb-2">Company (Optional):</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g., Google"
              className="w-full p-3 rounded-lg bg-card border border-border focus:ring-2 focus:ring-primary"
            />
          </div>
        )}

        {/* ----------------------------- */}
        {/*  Question and Answer Section  */}
        {/* ----------------------------- */}
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive text-destructive rounded-lg">
            <p className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> {error}
            </p>
          </div>
        )}

        {selectedRole && questions.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-card rounded-lg p-6 shadow-lg mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                   <div className="flex items-center justify-between">
  <p className="text-lg font-medium">
    {questions[currentQuestionIndex].question}
  </p>
  {questions[currentQuestionIndex].difficulty && (
    <span
      className={`px-3 py-1 text-sm rounded-full font-medium ${
        questions[currentQuestionIndex].difficulty === 'Easy'
          ? 'bg-green-100 text-green-700'
          : questions[currentQuestionIndex].difficulty === 'Medium'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {questions[currentQuestionIndex].difficulty}
    </span>
  )}
</div>

                    <p className="text-sm text-muted-foreground mt-2">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                    {questionSource === 'ai' && (
                      <p className="text-xs text-blue-500 mt-1">🧠 AI Generated</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Type your answer here or use voice recording..."
                      className="w-full min-h-[200px] p-4 rounded-lg bg-secondary/50 border border-border focus:ring-2 focus:ring-primary"
                      disabled={isRecording}
                    />
                  </div>
                </div>

                {/* Answer preview removed as requested */}

                {/* AI Suggested Answer (separate card) */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">AI Suggested Answer</h4>
                  <div className="bg-card rounded-lg p-4">
                    {isLoadingSuggestion ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="w-4 h-4 animate-spin" /> Generating suggestion...
                      </div>
                    ) : suggestedAnswer ? (
                      <div>
                        <pre className="whitespace-pre-wrap text-sm text-muted-foreground">{suggestedAnswer}</pre>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => setAnswer(suggestedAnswer)}
                            className="px-3 py-2 rounded bg-primary text-primary-foreground text-sm"
                          >
                            Use suggestion
                          </button>
                          <button
                            onClick={() => setSuggestedAnswer('')}
                            className="px-3 py-2 rounded border bg-card text-sm"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Click Get AI Suggestion to generate a sample answer.</div>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center gap-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isRecording ? handleStopRecording : handleStartRecording}
                      className={`px-6 py-3 rounded-full flex items-center gap-2 ${
                        isRecording
                          ? 'bg-destructive text-destructive-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <Mic className="w-5 h-5" />
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGetSuggestion}
                      className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground flex items-center gap-2"
                    >
                      {isLoadingSuggestion ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Getting Suggestion...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" /> Get AI Suggestion
                        </>
                      )}
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSubmitAnswer}
                      className="px-6 py-3 rounded-full bg-primary text-primary-foreground flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                        </>
                      ) : (
                        'Submit Answer'
                      )}
                    </motion.button>

                    {/* Next button: disabled at last question, and for Hard questions until user submits */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNextQuestion}
                      disabled={
                        currentQuestionIndex >= questions.length - 1 ||
                        (questions[currentQuestionIndex]?.difficulty === 'Hard' && !analysis)
                      }
                      className={`px-5 py-2 rounded-full border ${
                        currentQuestionIndex >= questions.length - 1 ||
                        (questions[currentQuestionIndex]?.difficulty === 'Hard' && !analysis)
                          ? 'opacity-50 cursor-not-allowed bg-card'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      Next
                    </motion.button>
                  </div>
                </div>

                {/* Difficulty hint for locked Next */}
                {questions[currentQuestionIndex]?.difficulty === 'Hard' && !analysis && (
                  <p className="text-xs text-muted-foreground mt-2">
                    This is a Hard question — submit your answer to get detailed feedback and unlock Next.
                  </p>
                )}
              </div>
            </div>

            {/* Right Analysis Pane */}
            <div className="md:col-span-1">
              <div className="bg-card rounded-lg p-6 shadow-lg sticky top-24">
                <h3 className="text-xl font-semibold mb-6">Real-time Analysis</h3>
                {analysis ? (
                  <div className="space-y-4">
                    {/* Confidence card */}
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Confidence</div>
                        <div className="text-sm font-medium">{Math.round(analysis.matchPercentage)}%</div>
                      </div>
                      <div className="w-full h-3 bg-card rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${analysis.matchPercentage}%` }}
                          className={`${getConfidenceColor(analysis.matchPercentage)} h-full`}
                        />
                      </div>
                    </div>

                    {/* Stats card */}
                    {analysis.detailedAnalysis && (
                      <div className="bg-secondary/30 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Stats</div>
                          <div className="text-xs text-muted-foreground">Detailed NLP metrics</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="p-2 bg-card rounded">Words: {analysis.detailedAnalysis.wordCount}</div>
                          <div className="p-2 bg-card rounded">Sentences: {analysis.detailedAnalysis.sentenceCount}</div>
                          <div className="p-2 bg-card rounded">Avg word length: {analysis.detailedAnalysis.averageWordLength.toFixed(1)}</div>
                          <div className="p-2 bg-card rounded">Unique: {analysis.detailedAnalysis.uniqueWords}</div>
                        </div>
                      </div>
                    )}

                    {/* Feedback card */}
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <div className="text-sm font-medium mb-2">Feedback</div>
                      <div className="text-sm text-muted-foreground">{analysis.feedback}</div>
                    </div>

                    {/* Keywords card */}
                    <div className="bg-secondary/30 p-3 rounded-lg">
                      <div className="text-sm font-medium mb-2">Keywords</div>
                      <div className="flex flex-wrap gap-2">
                        {analysis.matchedKeywords && analysis.matchedKeywords.length > 0 ? (
                          analysis.matchedKeywords.map((k) => (
                            <div key={k} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {k}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">No keywords matched.</div>
                        )}

                        {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
                          analysis.missingKeywords.map((k) => (
                            <div key={k} className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">
                              {k}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">Submit your answer to see feedback.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
