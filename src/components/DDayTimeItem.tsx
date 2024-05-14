// @ts-nocheck
import { useRef, useState, useEffect }from 'react'

const DDayTimeItem = ({ deadline } : any) => {
  const timerRef = useRef();
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timeRemainingText, setTimeRemainingText] = useState(null);

  const stateHandler = () => {
    const timeGap = timeCalculate();
    
    if(timeGap <= 0){
      clearInterval(timerRef.current);
      setTimeRemainingText(<strong className="deadline-expires">기간만료</strong>)
    }else{
      setTimeRemaining(timeGap)
      let timer = timeGap;
      const dDay = Math.floor(timer/86400000);
      timer -= dDay*86400000;
      let dDayHours   = Math.floor(timer/3600000);
      timer -= dDayHours*3600000;
      if(dDayHours<10){dDayHours="0"+dDayHours;}
      let dDayMin  = Math.floor(timer/60000);
      timer -= dDayMin*60000;
      if(dDayMin<10){
        dDayMin = "0"+dDayMin;
      }
      let dDaySec = Math.floor(timer/1000);
      if(dDaySec<10){
        dDaySec = "0"+dDaySec;
      }
  
      const htmlText = dDay+"D-" + dDayHours + "H-" + dDayMin + "M-" + dDaySec + "S";
  
      if(dDay==0 && dDayHours < 24){
        setTimeRemainingText(<strong className="deadline-soon_day">{htmlText}</strong>)
      }else if(dDay==0 && dDayHours < 12){
        setTimeRemainingText(<strong className="deadline-soon_time">{htmlText}</strong>)
      }else{
        setTimeRemainingText(<p>{htmlText}</p>)
      }
    }
  }

  useEffect(() => {
    if(deadline !== undefined){
      timerRef.current = setInterval(stateHandler, 1000);
    }
    // stateHandler();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  
  const timeCalculate = () => {
    const year    = deadline.substring(0,4);
    const month   = deadline.substring(5,7);
    const day     = deadline.substring(8,10);
    const hour    = deadline.substring(11,13);
    const minute  = deadline.substring(14,16);
    const second  = deadline.substring(17,19);

    const deadLineDate = new Date(Number(year), Number(month)-1, Number(day), Number(hour), Number(minute), Number(second));
    const today = new Date();
  
    const timeGap = deadLineDate.getTime() - today.getTime();
    return timeGap;
  }

  return (
    <>
      {timeRemainingText}
    </>
  )
}
export default DDayTimeItem