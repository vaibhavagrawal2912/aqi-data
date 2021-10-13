import { useEffect, useState } from "react";
import * as moment from 'moment'

function useWebSocketData() {
    const [aqiData, setAqiData] = useState([]);
    const [errorData, setErrorData] = useState({});
    let finalArr = [],
        aqiStandards = {
            good: { level: 50, label: 'Good' },
            satisfactory: { level: 100, label: 'Satisfactory' },
            moderate: { level: 200, label: 'Moderate' },
            poor: { level: 300, label: 'Poor' },
            veryPoor: { level: 400, label: 'Very Poor' },
            severe: { level: 500, label: 'Severe' },
        };
    useEffect(() => {
        const ws = new WebSocket('ws://city-ws.herokuapp.com/');
        ws.onopen = () => {
            ws.send(JSON.stringify({}));
        };
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response) {
                response.forEach(i => {
                    if (i.aqi > 0 && i.aqi <= aqiStandards.good.level) {
                        i.class = "light-green";
                    } else if (i.aqi > aqiStandards.good.level && i.aqi <= aqiStandards.satisfactory.level) {
                        i.class = "green"
                    } else if (i.aqi > aqiStandards.satisfactory.level && i.aqi <= aqiStandards.moderate.level) {
                        i.class = "yellow";
                    } else if (i.aqi > aqiStandards.moderate.level && i.aqi <= aqiStandards.poor.level) {
                        i.class = "orange";
                    } else if (i.aqi > aqiStandards.poor.level && i.aqi <= aqiStandards.veryPoor.level) {
                        i.class = "red";
                    } else if (i.aqi > aqiStandards.veryPoor.level && i.aqi <= aqiStandards.severe.level) {
                        i.class = "dark-red";
                    }
                    i.aqi = i.aqi?.toFixed(2)
                    let existingIndex = finalArr.findIndex(data => data.city === i.city);
                    if (existingIndex > -1) {
                        finalArr[existingIndex].timestamp = moment(new Date()).fromNow();
                        finalArr[existingIndex].aqi = i.aqi;
                    } else {
                        i.timestamp = moment(new Date()).fromNow();
                        finalArr.push(i);
                    }
                })
                setAqiData(finalArr);
                setErrorData({});
            } else {
                setErrorData({ isError: true })
            }
        };
        ws.onerror = (error) => {
            const err = JSON.parse(error.data);
            setErrorData({
                isError: true,
                err
            });
        }
        ws.onclose = () => {
            ws.close();
        };
        return () => {
            ws.close();
        };
    }, []);

    return {
        aqiData,
        errorData
    }
}

export default useWebSocketData;
