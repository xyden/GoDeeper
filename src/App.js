import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import EmotionList from "./EmotionList";
import EmotionForm from "./EmotionForm";
import EmotionCalendar from "./EmotionCalendar";
import theme from './theme';
import useUpdateThemeColor from './updateThemeColorHook';

const App = () => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);

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

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
                       || window.navigator.standalone
                       || document.referrer.includes('android-app://');

    if (isStandalone) {
      alert('This is running as a standalone PWA.');
    } else {
      alert('This is NOT running as a standalone PWA.');
    }
  }, []);


  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/form" element={<EmotionForm onSubmit={handleSubmit} />} />
          <Route path="/list" element={<EmotionList emotions={selectedEmotions} />} />
          <Route path="/calendar" element={<EmotionCalendar />} />
          <Route path="*" element={<EmotionForm onSubmit={handleSubmit} />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
