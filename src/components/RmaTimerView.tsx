import RmaTimeOutItem from './RmaTimeOutItem';

const TIME_ZONE = 9 * 60 * 60 * 1000; 

const dataChange = (dateString : string) => {
  const year    = dateString.substring(0,4);
  const month   = dateString.substring(6,8);
  const day     = dateString.substring(10,12);
  const hour    = dateString.substring(15,17);
  const minute  = dateString.substring(18,20);
  const second  = dateString.substring(21,23);

  const newDate = new Date(Number(year), Number(month)-1, Number(day), Number(hour), Number(minute), Number(second));
  const deadLineDate = new Date(newDate);

  deadLineDate.setDate(deadLineDate.getDate() + 2);
  const KoDeadLineDate = new Date(deadLineDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);

  const deadYear    = KoDeadLineDate.substring(0,4);
  const deadMonth   = KoDeadLineDate.substring(5,7);
  const deadDay     = KoDeadLineDate.substring(8,10);
  const deadHour    = KoDeadLineDate.substring(11,13);
  const deadMinute  = KoDeadLineDate.substring(14,16);
  const deadSecond  = KoDeadLineDate.substring(17,19);

  return deadYear+"년 "+deadMonth+"월 "+deadDay+"일 "+deadHour+":"+deadMinute+":"+deadSecond
  // return new Date(Number(year), Number(month)-1, Number(day), Number(hour), Number(minute), Number(second));
}

const RmaTimerView = ({ rmaData } : any) => {
  console.log(rmaData)
  const rmaDataList = rmaData.map((el:any)=>{
    return {
      RMA : el.RMA,
      증상 : el.증상,
      KEYIN : el.KEYIN,
      deadline : dataChange(el.KEYIN)
    }
  })
  return (
   <table className="rma-timer-view">
    <thead>
      <tr>
        <th scope="cols">RMA</th>
        <th scope="cols">증상</th>
        <th scope="cols">KEYIN</th>
        <th scope="cols">마감일</th>
        <th scope="cols">남은 시간</th>
      </tr>
    </thead>
    <tbody>
      {
        rmaDataList.map((el:any) => {
          return (
            <tr key={el.RMA}>
              <td><p>{el.RMA}</p></td>
              <td><p>{el.증상}</p></td>
              <td><p>{el.KEYIN}</p></td>
              <td><p>{el.deadline}</p></td>
              <td><RmaTimeOutItem deadline={el.deadline}/></td>
            </tr>
          )
        })
      }
    </tbody>
   </table>
  )
}
export default RmaTimerView