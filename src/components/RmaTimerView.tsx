//@ts-nocheck
import { useRef, useState, useEffect } from 'react';
import useFilterStore from '../stores/filterList'
import useFilterMenuList from '../stores/filterMenuList'
import RmaItems from './RmaItems';
const TIME_ZONE = 9 * 60 * 60 * 1000; 

const deadlineCalculate = (idValue, dateString : string, subDataString : string, dayOff : any) => {
  let calcuateData;
  if(dateString === undefined || dateString === ''){
    if(subDataString === undefined || subDataString === ''){
      return undefined
    }else{
      calcuateData = subDataString
    }
  }else{
    calcuateData = dateString;
  }

  const newDate = new Date(calcuateData);
  
  let deadLineDate = new Date(newDate);

  function addDay(){
    while(dayOff.indexOf(checkDayOff) > -1){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
  
    if(deadLineDate.getDay() === 6){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
    
    if(deadLineDate.getDay() === 0){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
  
    while(dayOff.indexOf(checkDayOff) > -1){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
  
    if(deadLineDate.getDay() === 6){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
    
    if(deadLineDate.getDay() === 0){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
  
    while(dayOff.indexOf(checkDayOff) > -1){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
  
    if(deadLineDate.getDay() === 6){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
    
    if(deadLineDate.getDay() === 0){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
  
    while(dayOff.indexOf(checkDayOff) > -1){
      deadLineDate.setDate(deadLineDate.getDate() + 1);
      checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );
    }
  }  

  deadLineDate.setDate(deadLineDate.getDate() + 1);
  let checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );

  addDay();
  deadLineDate.setDate(deadLineDate.getDate() + 1);
  checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );

  addDay();
  deadLineDate.setDate(deadLineDate.getDate() + 1);
  checkDayOff = deadLineDate.getFullYear() + '-' + ( (deadLineDate.getMonth()+1) < 9 ? "0" + (deadLineDate.getMonth()+1) : (deadLineDate.getMonth()+1) )+ '-' + ( (deadLineDate.getDate()) < 9 ? "0" + (deadLineDate.getDate()) : (deadLineDate.getDate()) );

  const KoDeadLineDate = new Date(deadLineDate.getTime() + TIME_ZONE).toISOString().replace('T', ' ').slice(0, -5);

  return KoDeadLineDate;
}

const RmaTimerView = ({ rmaData, rmaDayOff } : any) => {
  const tableRef = useRef();
  const [ defaultData, setDefaultData ] = useState(undefined);
  const [ dataList, setDataList ] = useState(undefined);
  const { userFilterList, setUserFilterList } = useFilterStore((state) => ({
    userFilterList: state.userFilterList,
    setUserFilterList: state.setUserFilterList,
  }));
  const { setUserTranOwnerList, setUseFinalRmaStatusLists } = useFilterMenuList((state) => ({
    setUserTranOwnerList: state.setUserTranOwnerList,
    setUseFinalRmaStatusLists: state.setUseFinalRmaStatusLists,
  }));

  useEffect(()=>{
    init();
  }, [])
  
  useEffect( () => {
    if(defaultData){
      filterDataSet(defaultData);
    }
  }, [userFilterList])

  const init = () => {
    const tranOwnerLists = [];
    const finalRmaStatusLists  = [];
    
    const dayOff = []
    rmaDayOff.map((el)=>{
      dayOff.push(el.DAYOFF)
    })

    const filterData = rmaData.filter((el:any) => el.RMA_NO_1 !== '' );
    const rmaDefaultDataList = filterData.map((el:any) => {
      if(tranOwnerLists.indexOf(el.TRAN_OWNER) === -1){
        tranOwnerLists.push(el.TRAN_OWNER);
      }
      if(finalRmaStatusLists.indexOf(el.FINAL_RMA_STATUS) === -1){
        finalRmaStatusLists.push(el.FINAL_RMA_STATUS);
      }
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
        START_DAY : el.ALLOCATED_DATE !== '' ? el.ALLOCATED_DATE : el.KEYIN_START_DATE,
        REPAIR_TAT : el.REPAIR_TAT,
        deadline : deadlineCalculate(el.RMA_NO_1, el.ALLOCATED_DATE, el.KEYIN_START_DATE, dayOff)
      }
    })
    setDefaultData(rmaDefaultDataList);
    setUserTranOwnerList(tranOwnerLists.sort());
    setUseFinalRmaStatusLists(finalRmaStatusLists.sort());
    filterDataSet(rmaDefaultDataList);
  }

  const filterDataSet = (defaultData) => {
    let datas = []
    const newDatas = []
    const filterTypeCnt = [];

    const filter1 = [];
    const filter2 = [];

    tableRef.current.classList.remove('completed-tasks');
    
    if(userFilterList.length > 0){
      userFilterList.map((el,idx) => {
        if(el.name === 'completed-tasks'){
          tableRef.current.classList.add('completed-tasks');
          
          return false;
        }

        if(el.name === 'TRAN_OWNER'){
          const pushData = el.id === 'noTranOwner' ? '' : el.id;
          filter1.push(pushData)
        }

        if(el.name === 'FINAL_RMA_STATUS'){
          const pushData = el.id === 'noFinalRmaStatus' ? '' : el.id;
          filter2.push(pushData)
        }
      });
        
      if(filter1.length > 0){
        const result = defaultData.filter((item) => filter1.indexOf(item.TRAN_OWNER) > -1);
        datas = result;

        if(filter2.length > 0){
          const result2 = result.filter((item) => filter2.indexOf(item.FINAL_RMA_STATUS) > -1);
          datas = result2;
        }else{
          datas = result;
        }
      }else{
        if(filter2.length > 0){
          const result = defaultData.filter((item) => filter2.indexOf(item.FINAL_RMA_STATUS) > -1);
          datas = result;
        }else{
          datas = defaultData;
        }
      }
      setDataList(datas)
    }else{
      setDataList(defaultData)
    }
  }

  return (
    <table className={`rma-timer-view`} ref={tableRef}>
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
          <th scope="cols">STARTDAY</th>
          <th scope="cols">REPAIR_TAT</th>
          <th scope="cols">DEADLINE</th>
          <th scope="cols">COMPLETED</th>
        </tr>
      </thead>
      <tbody>
        {dataList && (
          <RmaItems
            rmaDataList={dataList}
            />
        )}
      </tbody>
    </table>
  )
}

export default RmaTimerView