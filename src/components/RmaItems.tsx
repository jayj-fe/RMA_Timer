// @ts-nocheck
import { useState, useEffect } from 'react';
import DDayTimeItem from './DDayTimeItem';
import RepairTatItem from './RepairTatItem';
import useCompleteDataList from '../stores/completeDataList'

const RmaItems = ({rmaDataList}) => {
  const { useCompleteData, setUseCompleteData } = useCompleteDataList((state) => ({
    useCompleteData: state.useCompleteData,
    setUseCompleteData: state.setUseCompleteData,
  }));

  const completeClick = (e) => {
    if(useCompleteData.indexOf(e.target.id) > -1){
      const delData = useCompleteData.filter((el)=> el !== e.target.id)
      setUseCompleteData(delData);
    }else{
      const newData = [...useCompleteData]
      newData.push(e.target.id);
      setUseCompleteData(newData);
    }
  }

  return (
    <>
      {
        rmaDataList.map((el:any, idx:Number) => {
          return (
            <tr key={idx} className={`${useCompleteData.indexOf(el.RMA_NO_1) > -1 ? 'checked' : ''}`}>
              <td><p>{el.TRAN_OWNER}</p></td>
              <td><p>{el.RMA_NO_1}</p></td>
              <td><p>{el.SERIAL_NO}</p></td>
              <td><p>{el.MODEL_ID}</p></td>
              <td><p>{el.CUSTOMER_PROBLEM}</p></td>
              <td><p>{el.ITEM_MEMO}</p></td>
              <td><p>{el.FINAL_RMA_STATUS}</p></td>
              <td><p>{el.STATUS_1}</p></td>
              <td><p>{el.KBO_STATUS}</p></td>
              <td><p>{el.START_DAY}</p></td>
              <td><RepairTatItem repair_tat={el.REPAIR_TAT}/></td>
              <td><DDayTimeItem deadline={el.deadline}/></td>
              <td>
                <input
                  type="checkbox"
                  id={el.RMA_NO_1}
                  name="completeData"
                  onChange={(e)=>completeClick(e)}
                  checked={useCompleteData.indexOf(el.RMA_NO_1) > -1 ? 'checked' : false}
                  />
                <label htmlFor={el.RMA_NO_1}>Complete</label>
              </td>
            </tr>
          )
        })
      }
    </>
  )
}
export default RmaItems