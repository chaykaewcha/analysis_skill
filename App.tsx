
import React, { useState, useCallback } from 'react';
import { Student, AnalysisResult, AppState, UploadData } from './types';
import SearchForm from './components/SearchForm';
import UploadPanel from './components/UploadPanel';
import AnalysisLoader from './components/AnalysisLoader';
import ResultsDashboard from './components/ResultsDashboard';
import Header from './components/Header';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.SEARCH);
  const [student, setStudent] = useState<Student | null>(null);
  const [uploadData, setUploadData] = useState<UploadData | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleStudentFound = (foundStudent: Student) => {
    setStudent(foundStudent);
    setState(AppState.UPLOAD);
  };

  const handleStartAnalysis = (data: UploadData) => {
    setUploadData(data);
    setState(AppState.ANALYZING);
  };

  const handleAnalysisComplete = (analysisResult: AnalysisResult) => {
    setResult(analysisResult);
    setState(AppState.RESULT);
  };

  const handleReset = () => {
    setStudent(null);
    setUploadData(null);
    setResult(null);
    setState(AppState.SEARCH);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {state === AppState.SEARCH && (
          <SearchForm onStudentFound={handleStudentFound} />
        )}

        {state === AppState.UPLOAD && student && (
          <UploadPanel 
            student={student} 
            onBack={() => setState(AppState.SEARCH)}
            onAnalyze={handleStartAnalysis}
          />
        )}

        {state === AppState.ANALYZING && uploadData && (
          <AnalysisLoader 
            uploadData={uploadData} 
            onComplete={handleAnalysisComplete} 
          />
        )}

        {state === AppState.RESULT && result && student && uploadData && (
          <ResultsDashboard 
            student={student}
            testInfo={uploadData}
            result={result}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        <p>© 2024 Sports Skill Analysis System • Powered by Google Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
