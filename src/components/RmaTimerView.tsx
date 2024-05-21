//@ts-nocheck
import { useState, useEffect } from 'react';
import useFilterStore from '../stores/filterList'
import useTranOwner from '../stores/tranOwnerList'
import RmaItems from './RmaItems';

const TIME_ZONE = 9 * 60 * 60 * 1000; 

const deadlineCalculate = (dateString : string) => {
  if(dateString === undefined || dateString === ''){
    return undefined
  }

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

  return KoDeadLineDate;
}

const RmaTimerView = ({ rmaData } : any) => {
  const [ defaultData, setDefaultData ] = useState(undefined);
  const [ dataList, setDataList ] = useState(undefined);
  const { setUserTranOwnerList } = useTranOwner((state) => ({
    setUserTranOwnerList: state.setUserTranOwnerList,
  }));
  const { userFilterTranOwnerList, setUserFilterTranOwnerList } = useFilterStore((state) => ({
    userFilterTranOwnerList: state.userFilterTranOwnerList,
    setUserFilterTranOwnerList: state.setUserFilterTranOwnerList,
  }));
  const [ filterActive, setFilterActive ] = useState(0);

  useEffect(()=>{
    init()
  }, [])
  
  useEffect( () => {
    if(defaultData){
      filterDataSet(defaultData);
    }
  }, [userFilterTranOwnerList])


  const init = () => {
    const tranOwnerLists = [];
    const rmaDefaultDataList = rmaData.map((el:any) => {
      if(tranOwnerLists.indexOf(el.TRAN_OWNER) === -1){
        tranOwnerLists.push(el.TRAN_OWNER);
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
        REPAIR_TAT : el.REPAIR_TAT,
        deadline : deadlineCalculate(el.ALLOCATED_DATE)
      }
    })
    setDefaultData(rmaDefaultDataList);
    setUserTranOwnerList(tranOwnerLists.sort());
    filterDataSet(rmaDefaultDataList);
  }

  const filterDataSet = (defaultData) => {
    const currentData = filterActive > 0 ? dataList : defaultData;
    let currntFilterAcitve = filterActive;
    let showDataList = undefined;
    let filterData = [];
    let filterState = false;

    if(userFilterTranOwnerList.length > 0){
      userFilterTranOwnerList.forEach(el => {
        const newData = currentData.filter((ele) => ele.TRAN_OWNER === el)
        filterData = filterData.concat(newData);
      });
      filterState = true;
    }
    
    if(filterState){
      showDataList = filterData;
    }else{
      showDataList = defaultData;
    }

    setDataList(showDataList)
  }
  
  return (
    <table className={`rma-timer-view`}>
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
        {dataList && (
          <RmaItems rmaDataList={dataList} />
        )}
      </tbody>
    </table>
  )
}
export default RmaTimerView