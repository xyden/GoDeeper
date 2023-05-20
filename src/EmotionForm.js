import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Checkbox, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Button, Container, Flex, Stack } from "@chakra-ui/react";

const emotionsData = {
        "ANNOYED": ["Bitter", "edgy", "exasperated", "frustrated", "grumpy", "impatient", "irritable", "irked"],
        "ANGRY": ["agitated", "enraged", "exasperated", "furious", "irate", "outraged", "resentful", "upset"],
        "AVERSION": ["appalled", "contempt", "disgusted", "dislike", "horrified", "repulsed"],
        "CONFUSED": ["baffled", "bewildered", "dazed", "hesitant", "lost", "mystified", "perplexed", "puzzled", "torn"],
        "DISCOMFORT": ["agitated", "alarmed", "discombobulated", "disturbed", "perturbed", "rattled", "restless", "shocked", "startled", "surprised", "troubled", "turbulent", "uncomfortable", "uneasy", "unsettled"],
        "DISCONNECTED": ["apathetic", "bored", "distant", "distracted", "indifferent", "numb", "uninterested", "withdrawn"],
        "EMBARRASSED": ["ashamed", "flustered", "guilty", "self-conscious"],
        "FEARFUL": ["afraid", "apprehensive", "anxious", "distress", "frightened", "hesitant", "nervous", "panicked", "paralyzed", "petrified", "scared", "tense", "terrified", "worried"],
        "PAIN": ["agony", "devastated", "grief", "heartbroken", "hurt", "lonely", "miserable", "regretful", "remorseful"],
        "SAD": ["depressed", "despondent", "disappointed", "discouraged", "disheartened", "dismayed", "gloomy", "heavy hearted", "hopeless", "troubled", "unhappy", "wretched"],
        "STRESSED/TIRED": ["burnt out", "depleted", "exhausted", "fatigued", "listless", "overwhelmed", "restless", "sleep", "weary", "worn out"],
        "VULNERABLE": ["fragile", "guarded", "helpless", "insecure", "leery", "reserved", "sensitive", "shaky", "tender"],
        "YEARNING": ["envious", "jealous", "longing", "pining", "wishful"],
        "AFFECTION": ["compassionate", "friendly", "loving", "sympathetic", "tender", "warm"],
        "INTERESTED": ["absorbed", "alert", "curious", "enchanted", "engaged", "fascinated", "intrigued", "spellbound", "stimulated"],
        "GLAD": ["alive", "amazed", "amused", "awed", "encouraged", "energetic", "enthusiastic", "excited", "grateful", "happy", "hopeful", "inspired", "invigorated", "joyful", "motivated", "optimistic", "pleased", "thrilled", "wonder"],
        "GRATEFUL": ["appreciative", "moved", "thankful", "touched"],
        "HOPEFUL": ["encouraged", "expectant", "optimistic"],
        "PEACEFUL": ["calm", "comfortable", "centered", "composed", "content", "fulfilled", "relaxed", "relieved", "satisfied"],
        "RESTED": ["Alert", "alive", "energized", "invigorated", "refreshed", "rejuvenated", "relaxed", "renewed", "strong"]    
};

function EmotionForm({ onSubmit }) {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (emotion, category) => {
    setSelectedEmotions((prevSelected) => {
      const emotionObject = { emotion, category };
      const found = prevSelected.find((selectedEmotion) => selectedEmotion.emotion === emotion && selectedEmotion.category === category);
      if (found) {
        return prevSelected.filter((selectedEmotion) => selectedEmotion !== found);
      } else {
        return [...prevSelected, emotionObject];
      }
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedEmotions);
    navigate("/list");
  };

  const isSubmitDisabled = selectedEmotions.length === 0;

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Container maxW="container.md">
        <Accordion allowMultiple>
          {Object.keys(emotionsData).map((category) => (
            <AccordionItem key={category}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {category}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Stack spacing={3}>
                  {emotionsData[category].map((emotion) => (
                    <Checkbox key={emotion} onChange={() => handleCheckboxChange(emotion, category)}>
                      {emotion}
                    </Checkbox>
                  ))}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
     
        <Flex position="sticky" bottom="0" bg="gray.700" width="100%" justify="center" px="4" py="2">
          <Button type="submit" isDisabled={isSubmitDisabled} flex="1" maxW="container.md">Share your feelings</Button>
        </Flex>

    </Box>
  );
}

export default EmotionForm;

