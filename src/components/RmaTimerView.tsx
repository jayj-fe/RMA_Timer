//@ts-nocheck
import { useRef, useState, useEffect } from 'react';
import useFilterStore from '../stores/filterList'
import useFilterMenuList from '../stores/filterMenuList'
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
  const tableRef = useRef();
  const [ defaultData, setDefaultData ] = useState(undefined);
  const [ dataList, setDataList ] = useState(undefined);
  const { setUserTranOwnerList, setUseFinalRmaStatusLists } = useFilterMenuList((state) => ({
    setUserTranOwnerList: state.setUserTranOwnerList,
    setUseFinalRmaStatusLists: state.setUseFinalRmaStatusLists,
  }));
  const { userFilterList, setUserFilterList } = useFilterStore((state) => ({
    userFilterList: state.userFilterList,
    setUserFilterList: state.setUserFilterList,
  }));

  useEffect(()=>{
    init()
  }, [])
  
  useEffect( () => {
    if(defaultData){
      filterDataSet(defaultData);
    }
  }, [userFilterList])

  const init = () => {
    const tranOwnerLists = [];
    const finalRmaStatusLists  = [];
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
        REPAIR_TAT : el.REPAIR_TAT,
        deadline : deadlineCalculate(el.ALLOCATED_DATE)
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

    tableRef.current.classList.remove('completed-tasks');

    if(userFilterList.length > 0){
      userFilterList.map((el,idx) => {
        if(el.name === 'completed-tasks'){
          tableRef.current.classList.add('completed-tasks');
          
          if(userFilterList.length === 1){
            datas = [...defaultData];
          }
          
          return false;
        }

        if(idx === 0){
          filterTypeCnt.push(el.name)
          defaultData.forEach((ele) => {
            if(el.name === 'completed-tasks'){
              return false;
            }

            if(el.name === 'TRAN_OWNER' && el.id === 'noTranOwner'){
              if(ele[el.name] === ''){
                datas.push(ele)
              }

              return false;
            }
            
            if(el.name === 'FINAL_RMA_STATUS' && el.id === 'noFinalRmaStatus'){
              if(ele[el.name] === ''){
                datas.push(ele)
              }

              return false;
            }
  
            if(ele[el.name] === el.id){
              datas.push(ele)

              return false;
            }
          })
        }
        
        if(filterTypeCnt.indexOf(el.name) > -1 && filterTypeCnt.length === 1){
          defaultData.forEach((ele) => {
            if(el.name === 'TRAN_OWNER' && el.id === 'noTranOwner'){
              if(ele[el.name] === ''){
                datas.push(ele)
              }
            }
            
            if(el.name === 'FINAL_RMA_STATUS' && el.id === 'noFinalRmaStatus'){
              if(ele[el.name] === ''){
                datas.push(ele)
              }
            }
  
            if(ele[el.name] === el.id){
              datas.push(ele)
            }
          })
        }else{
          if(filterTypeCnt.indexOf(el.name) > -1){
            filterTypeCnt.push(el.name)
          }
          datas.forEach((ele) => {
            if(el.name === 'TRAN_OWNER' && el.id === 'noTranOwner'){
              if(ele[el.name] === ''){
                newDatas.push(ele)
              }

              return false;
            }
            
            if(el.name === 'FINAL_RMA_STATUS' && el.id === 'noFinalRmaStatus'){
              if(ele[el.name] === ''){
                newDatas.push(ele)
              }
              return false;
            }
  
            if(ele[el.name] === el.id){
              newDatas.push(ele)
              return false;
            }
          })

          datas = newDatas;
        }
      });

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