// @ts-nocheck
import { useState, useEffect } from 'react';
import DDayTimeItem from './DDayTimeItem';
import RepairTatItem from './RepairTatItem';
import { db } from "../lib/js/firebase-config";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";

const RmaItems = ({rmaDataList}) => {
  const [ completeList, setCompleteList ] = useState([]);

  const firebaseUpdata = async ( newData ) => {
    try {
      const saveData = {
        RMA_NO_1 : newData
      }
      await setDoc(doc(db, "rma-timer-db", "finish-work"), saveData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  const firebaseInit = async () => {
    try {
      let completedData = []
      const docRef = await getDocs(collection(db, "rma-timer-db"), "finish-work")

      docRef.forEach((element) => {
        completedData = element.data().RMA_NO_1
      });

      setCompleteList(completedData);
      console.log(completeList)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const completeClick = (e) => {
    if(completeList.indexOf(e.target.id) > -1){
      const delData = completeList.filter((el)=> el !== e.target.id)
      setCompleteList(delData);
      firebaseUpdata(delData);
    }else{
      const newData = [...completeList]
      newData.push(e.target.id);
      setCompleteList(newData);
      firebaseUpdata(newData);
    }
  }

  useEffect(()=>{
    firebaseInit()
  }, [])

  return (
    <>
      {
        rmaDataList.map((el:any, idx:Number) => {
          return (
            <tr key={idx} className={`${ el.TRAN_OWNER === '' ? 'no' : el.TRAN_OWNER }`}>
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
              <td>
                <input
                  type="checkbox"
                  id={el.RMA_NO_1}
                  name="completeData"
                  onChange={(e)=>completeClick(e)}
                  checked={completeList.indexOf(el.RMA_NO_1) > -1 ? 'checked' : false}
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