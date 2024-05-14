import DDayTimeItem from './DDayTimeItem';
import RepairTatItem from './RepairTatItem';

const TIME_ZONE = 9 * 60 * 60 * 1000; 

const deadlineCalculate = (dateString : string) => {
  const newDate = new Date(dateString);
  
  let deadLineDate = new Date(newDate);
  deadLineDate.setDate(deadLineDate.getDate() + 1);

  if(deadLineDate.getDay() === 6){
    deadLineDate.setDate(deadLineDate.getDate() + 1);
  }
  
  if(deadLineDate.getDay() === 0){
    deadLineDate.setDate(deadLineDate.getDate() + 1);
  }

  deadLineDate.setDate(deadLineDate.getDate() + 1);
  const KoDeadLineDate = new Date(deadLineDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);
  console.log(KoDeadLineDate);

  return KoDeadLineDate;

  // const year    = dateString.substring(0,4);
  // const month   = dateString.substring(6,8);
  // const day     = dateString.substring(10,12);
  // const hour    = dateString.substring(15,17);
  // const minute  = dateString.substring(18,20);
  // const second  = dateString.substring(21,23);

  // const newDate = new Date(Number(year), Number(month)-1, Number(day), Number(hour), Number(minute), Number(second));
  // const deadLineDate = new Date(newDate);

  // deadLineDate.setDate(deadLineDate.getDate() + 2);
  // const KoDeadLineDate = new Date(deadLineDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);

  // const deadYear    = KoDeadLineDate.substring(0,4);
  // const deadMonth   = KoDeadLineDate.substring(5,7);
  // const deadDay     = KoDeadLineDate.substring(8,10);
  // const deadHour    = KoDeadLineDate.substring(11,13);
  // const deadMinute  = KoDeadLineDate.substring(14,16);
  // const deadSecond  = KoDeadLineDate.substring(17,19);

  // // xxD-xxH-xxM-xxS

  // return deadYear+"년 "+deadMonth+"월 "+deadDay+"일 "+deadHour+":"+deadMinute+":"+deadSecond


  // return new Date(Number(year), Number(month)-1, Number(day), Number(hour), Number(minute), Number(second));
}

const RmaTimerView = ({ rmaData } : any) => {
  const rmaDataFilter = rmaData.filter((el:any) => el.ALLOCATED_DATE !== undefined && el.ALLOCATED_DATE !== '')
  const rmaDataList = rmaDataFilter.map((el:any) => {
    return {
      TRAN_OWNER : el.TRAN_OWNER,
      RMA_NO_1 : el.RMA_NO_1,
      SERIAL_NO : el.SERIAL_NO,
      MODEL_ID : el.MODEL_ID,
      CUSTOMER_PROBLEM : el.CUSTOMER_PROBLEM,
      ITEM_MEMO : el.ITEM_MEMO,
      FINAL_RMA_STATUS : el.FINAL_RMA_STATUS,
      STATUS_1 : el.STATUS_1,
      KBO_STATUS : el.KBO_STATUS,
      // 2 ~ 2.5 [노란색], 2.5 ~ 3 [빨간색]
      REPAIR_TAT : el.REPAIR_TAT,
      // 1일 [노란색], 12시간 [빨간색]
      deadline : deadlineCalculate(el.ALLOCATED_DATE)
    }
  })
  return (
   <table className="rma-timer-view">
    <thead>
      <tr>
        <th scope="cols">TRAN_OWNER</th>
        <th scope="cols">RMA_NO_1</th>
        <th scope="cols">SERIAL_NO</th>
        <th scope="cols">MODEL_ID</th>
        <th scope="cols">CUSTOMER_PROBLEM</th>
        <th scope="cols">ITEM_MEMO</th>
        <th scope="cols">FINAL_RMA_STATUS</th>
        <th scope="cols">STATUS_1</th>
        <th scope="cols">KBO_STATUS</th>
        <th scope="cols">REPAIR_TAT</th>
        <th scope="cols">DEADLINE</th>
      </tr>
    </thead>
    <tbody>
      {
        rmaDataList.map((el:any) => {
          return (
            <tr key={el.RMA_NO_1}>
              <td><p>{el.TRAN_OWNER}</p></td>
              <td><p>{el.RMA_NO_1}</p></td>
              <td><p>{el.SERIAL_NO}</p></td>
              <td><p>{el.MODEL_ID}</p></td>
              <td><p>{el.CUSTOMER_PROBLEM}</p></td>
              <td><p>{el.ITEM_MEMO}</p></td>
              <td><p>{el.FINAL_RMA_STATUS}</p></td>
              <td><p>{el.STATUS_1}</p></td>
              <td><p>{el.KBO_STATUS}</p></td>
              <td><RepairTatItem repair_tat={el.REPAIR_TAT}/></td>
              <td><DDayTimeItem deadline={el.deadline}/></td>
            </tr>
          )
        })
      }
    </tbody>
   </table>
  )
}
export default RmaTimerView