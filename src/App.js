import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import EmotionList from "./EmotionList";
import EmotionForm from "./EmotionForm";
import theme from './theme';
import useUpdateThemeColor from './updateThemeColorHook';


const App = () => {
  const [selectedEmotions, setSelectedEmotions] = useState([]);

  useUpdateThemeColor();

  const handleSubmit = (emotions) => {
    setSelectedEmotions(emotions);
  };

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/form" element={<EmotionForm onSubmit={handleSubmit} />} />
          <Route path="/list" element={<EmotionList emotions={selectedEmotions} />} />
          <Route path="*" element={<EmotionForm onSubmit={handleSubmit} />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;


