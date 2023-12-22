import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import EmotionList from "./EmotionList";
import EmotionForm from "./EmotionForm";
import EmotionCalendar from "./EmotionCalendar";
import Install from "./Install"; // Import the new Install component
import theme from './theme';
import useUpdateThemeColor from './updateThemeColorHook';
import usePwaStatus from './usePwaStatus'; // Make sure this path is correct
import useOS from './useOS'; // Assuming you have a hook for OS detection


const App = () => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const isPwaInstalled = usePwaStatus();
  const os = useOS(); // 'iOS', 'Android', or 'unknown'

  useUpdateThemeColor();

  const handleSubmit = (emotions) => {
    setSelectedEmotions(emotions);
    logEmotions(emotions);
  };

  const logEmotions = (emotions) => {
    const groupedEmotions = groupByCategory(emotions);
    const logEntry = {
        dateTime: new Date().toISOString(),
        emotions: groupedEmotions
    };

    let existingLog = JSON.parse(localStorage.getItem('emotionLog')) || [];
    existingLog.push(logEntry);
    localStorage.setItem('emotionLog', JSON.stringify(existingLog));
  };

  const groupByCategory = (emotions) => {
    return emotions.reduce((grouped, emotionObj) => {
        const { category, emotion } = emotionObj;
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(emotion);
        return grouped;
    }, {});
  };

  const initialRoute = () => {
    if (isPwaInstalled) {
      return <EmotionForm onSubmit={handleSubmit} />;
    } else if (os === 'iOS' || os === 'Android') {
      return <Install />;
    } else {
      return <EmotionForm onSubmit={handleSubmit} />;
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={initialRoute()} />
          <Route path="/form" element={<EmotionForm onSubmit={handleSubmit} />} />
          <Route path="/list" element={<EmotionList emotions={selectedEmotions} />} />
          <Route path="/calendar" element={<EmotionCalendar />} />
          <Route path="/install" element={<Install />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;