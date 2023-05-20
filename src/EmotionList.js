import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const generateImage = (groupedEmotions) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    canvas.width = 400;
    

    const totalEmotions = Object.values(groupedEmotions).reduce((total, emotions) => total + emotions.length, 0);
    const totalCategories = Object.keys(groupedEmotions).length;

    canvas.height = (totalEmotions + totalCategories) * 30 + 50;
    context.fillStyle = '#FFFFFF'; // White background
    context.fillRect(0, 0, canvas.width, canvas.height);

    const fontSize = 20;
    context.font = `${fontSize}px Helvetica, Arial, sans-serif`;
    context.fillStyle = '#000000'; // Black text

  
    let yPos = 30; // start position for y
    Object.entries(groupedEmotions).forEach(([category, emotions]) => {
      context.fillText(category, 10, yPos);
      yPos += 30;
      emotions.forEach(emotion => {
        context.fillText(emotion, 40, yPos);
        yPos += 30;
      });
    });
  
    return canvas.toDataURL('image/png');
  };

  
  

const EmotionList = ({ emotions }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const groupedEmotions = groupByCategory(emotions);
    const imageUrl = generateImage(groupedEmotions);
    setImageUrl(imageUrl);
  }, [emotions]);
  

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

  const groupedEmotions = groupByCategory(emotions);

  return (
    <Box>
      <Text fontSize="xl">Emotions:</Text>
      {Object.entries(groupedEmotions).map(([category, emotions], index) => (
        <Text key={index}>{category}: {emotions.join(', ')}</Text>
      ))}
      {imageUrl && <img src={imageUrl} alt="Emotion text" />}
    </Box>
  );
};

export default EmotionList;
