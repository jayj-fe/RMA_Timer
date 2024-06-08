// @ts-nocheck
import { useState, useEffect } from 'react';
import RmaSearchBar from '../components/RmaSearchBar'
import useCompleteDataList from '../stores/completeDataList'
import { db } from "../lib/js/firebase-config";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";

const RmaHeader = () => {
  const [ filterShow, setFilterShow ] = useState(false);
  const { useCompleteData, setUseCompleteData } = useCompleteDataList((state) => ({
    useCompleteData: state.useCompleteData,
    setUseCompleteData: state.setUseCompleteData,
  }));

  const firebaseUpdata = async () => {
    try {
      const saveData = {
        RMA_NO_1 : useCompleteData
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
  
      setUseCompleteData(completedData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <section className='rma-header'>
      <article className="rma-header-menu">
        <div>
          <a href="https://docs.google.com/spreadsheets/d/10tZZFY0tDLhDHt0Asf8WuDfPCtTutsJX2HoKLSH-Phc/edit#gid=0" target='_blank'>데이터 업데이트하러가기</a>
          {/* <a href="#" target='_blank'>공휴일 입력하기</a> */}
          <button type='button' onClick={ (e) => setFilterShow(!filterShow) }>필터보기</button>
        </div>
        <div>
          <button type="button" onClick={ (e) => firebaseInit()}>저장된 완료 현황 차트에 적용하기</button>
          <button type="button" onClick={ (e) => firebaseUpdata()}>완료 데이터 저장하기</button>
        </div>
      </article>
      {
        filterShow && (
          <RmaSearchBar />
        )
      }
    </section>
  )
}
export default RmaHeader