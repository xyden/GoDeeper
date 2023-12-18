import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { Container, Box, useColorModeValue } from '@chakra-ui/react';
import './css/calendar.css';


const EmotionCalendar = () => {
    const [emotionData, setEmotionData] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());

    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('black', 'white');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const calendarStyles = {};

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('emotionLog')) || [];
    
        let allEmotions = [];
        storedData.forEach(entry => {
            const dateTime = new Date(entry.dateTime);
            const dateStr = dateTime.toDateString();
            const timeStr = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
            Object.entries(entry.emotions).forEach(([category, emotions]) => {
                emotions.forEach(emotion => {
                    allEmotions.push({ dateTime, dateStr, timeStr, category, emotion });
                });
            });
        });
    
        allEmotions.sort((a, b) => a.dateTime - b.dateTime);
    
        const mappedData = allEmotions.reduce((acc, { dateStr, timeStr, category, emotion }) => {
            if (!acc[dateStr]) {
                acc[dateStr] = {};
            }
            if (!acc[dateStr][timeStr]) {
                acc[dateStr][timeStr] = {};
            }
            if (!acc[dateStr][timeStr][category]) {
                acc[dateStr][timeStr][category] = [];
            }
            acc[dateStr][timeStr][category].push(emotion);
            return acc;
        }, {});

        setEmotionData(mappedData);
    }, []);

    const handleDayClick = (value) => {
        setSelectedDate(value);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            let dateString = date.toDateString();
            if (emotionData[dateString]) {
                return 'emotion-day';
            }
        }
    };

    const renderEmotions = (date) => {
        const dateString = date.toDateString();
        const emotionsForDate = emotionData[dateString];
    
        if (emotionsForDate) {
            return Object.entries(emotionsForDate).map(([time, categories]) => (
                <div key={time}>
                    <div style={{marginTop:"24px", fontWeight:"bold"}}>{time}</div>
                    {Object.entries(categories).map(([category, emotions]) => (
                        <div key={category}>
                            <strong>{category}:</strong>
                            <ul className="emotions">
                                {emotions.map((emotion, index) => <li key={index}>{emotion}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            ));
        }
        return <li style={{textAlign:"center"}}>No emotions recorded for this date.</li>;
    };       

    return (
        <Container maxW="container.md" justify="center">
          <Box p="8" display="flex" justifyContent="center" flexDirection="column" bg={bgColor} color={textColor} borderColor={borderColor}>
            <Calendar
                onChange={handleDayClick}
                value={selectedDate}
                tileClassName={tileClassName}
                style={calendarStyles}
            />
            <Box p="8" display="flex" justifyContent="center" flexDirection="column">
                <ul className="emotions">
                    {renderEmotions(selectedDate)}
                </ul>
            </Box>
           </Box>
           </Container>
    );
};

export default EmotionCalendar;