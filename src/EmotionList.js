import { useEffect, useState } from "react";
import { Box, Container, Text } from "@chakra-ui/react";

const generateImage = (groupedEmotions) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    const title = 'My Emotions';
    const dateTime = new Date().toLocaleString(undefined, {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
  
    const canvasWidth = 400;
    const titleFontSize = 30;
    const textFontSize = 20;
    const lineHeight = 30;
    const padding = 20;
    const additionalSpace = 20; // Additional space below the date
  
    const totalEmotions = Object.values(groupedEmotions).reduce((total, emotions) => total + emotions.length, 0);
    const totalCategories = Object.keys(groupedEmotions).length;
    const canvasHeight = (totalEmotions + totalCategories + 2) * lineHeight + padding * 2 + additionalSpace;
  
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context.fillStyle = '#FFFFFF'; // White background
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    context.font = `${titleFontSize}px Helvetica, Arial, sans-serif`;
    context.fillStyle = '#000000'; // Black text
    context.textAlign = 'center';
    context.fillText(title, canvasWidth / 2, lineHeight + padding);
  
    context.font = `${textFontSize}px Helvetica, Arial, sans-serif`;
    context.fillText(dateTime, canvasWidth / 2, 2 * lineHeight + padding);
  
    let yPos = 3 * lineHeight + padding + additionalSpace; // start position for y
    Object.entries(groupedEmotions).forEach(([category, emotions]) => {
      context.fillText(category, canvasWidth / 2, yPos);
      yPos += lineHeight;
      emotions.forEach(emotion => {
        context.fillText(emotion, canvasWidth / 2, yPos);
        yPos += lineHeight;
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
    <Container maxW="container.md" justify="center">
      <Box py="3" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Text fontSize="xl">Emotions:</Text>
        {Object.entries(groupedEmotions).map(([category, emotions], index) => (
          <Text key={index}>
            {category}: {emotions.join(", ")}
          </Text>
        ))}
      </Box>
      <Box py="3" display="flex" justifyContent="center">
        {imageUrl && <img src={imageUrl} alt="Emotion text" />}
      </Box>
    </Container>
  );

};

export default EmotionList;
