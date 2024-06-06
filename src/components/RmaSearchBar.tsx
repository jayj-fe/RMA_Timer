// @ts-nocheck
import { useState, useEffect } from 'react';
import useFilterStore from '../stores/filterList'
import useFilterMenuList from '../stores/filterMenuList'

const RmaSearchBar = () => {
  const [ tranOwnerCheck, setTranOwnerCheck ] = useState([]);
  const [ finalRmaStatusCheck, setFinalRmaStatusCheck ] = useState([]);
  const [ completedCheck, setCompletedCheck ] = useState(false);
  const { useTranOwnerList, useFinalRmaStatusLists } = useFilterMenuList((state) => ({
    useTranOwnerList: state.useTranOwnerList,
    useFinalRmaStatusLists: state.useFinalRmaStatusLists,
  }));
  const { userFilterList, setUserFilterList } = useFilterStore((state) => ({
    userFilterList: state.userFilterList,
    setUserFilterList: state.setUserFilterList,
  }));

  const inputHandleChange = (e) => {
    const filterData = [...userFilterList];
    const clickData = e.target;
    const filterCheck = filterData.filter((ele) => ele.id === clickData.id);

    if(filterCheck.length > 0){
      const filterExistence = filterData.filter((ele) => ele.id !== clickData.id);
      setUserFilterList(filterExistence)
    }else{
      filterData.push({name : clickData.name, id : clickData.id})
      setUserFilterList(filterData)
    }
  };

  useEffect(()=>{
    let tranOwnerData = [];
    userFilterList.forEach(element => {
      if(element.name === 'TRAN_OWNER'){
        tranOwnerData.push(element.id)
      }
    });

    let finalRmaStatusData = [];
    userFilterList.forEach(element => {
      if(element.name === 'FINAL_RMA_STATUS'){
        finalRmaStatusData.push(element.id)
      }
    });

    let completedData = false;
    userFilterList.forEach(element => {
      if(element.name === 'completed-tasks'){
        completedData = true;
      }
    });
    
    setTranOwnerCheck(tranOwnerData);
    setFinalRmaStatusCheck(finalRmaStatusData);
    setCompletedCheck(completedData)
  }, [userFilterList])
  
  return (
    <article className='rma-filter'>
      <dl>
        {useTranOwnerList && (
          <>
            <dt>TRAN_OWNER Filter</dt>
            <dd>
              {
                useTranOwnerList.map((el, idx)=>{
                  const itemName = el === '' ? 'noTranOwner' : el;
                  const itemChecked = tranOwnerCheck.indexOf(itemName) > -1 ? 'checked' : false;
                  return (
                    <div className="checkbox" key={idx}>
                      <input
                        type="checkbox"
                        id={itemName}
                        name="TRAN_OWNER"
                        onChange={inputHandleChange}
                        checked={itemChecked}
                        />
                      <label htmlFor={itemName}>{ el === '' ? 'No TRAN_OWNER' : el }</label>
                    </div>
                  )
                })
              }
            </dd>
          </>
        )}

        {useFinalRmaStatusLists && (
          <>
            <dt>FINAL_RMA_STATUS Filter</dt>
            <dd>
              {
                useFinalRmaStatusLists.map((el, idx)=>{
                  const itemName = el === '' ? 'noFinalRmaStatus' : el;
                  const itemChecked = finalRmaStatusCheck.indexOf(itemName) > -1 ? 'checked' : false;
                  return (
                    <div className="checkbox" key={idx}>
                      <input
                        type="checkbox"
                        id={itemName}
                        name="FINAL_RMA_STATUS"
                        onChange={inputHandleChange}
                        checked={itemChecked}
                        />
                      <label htmlFor={itemName}>{ el === '' ? 'No FINAL_RMA_STATUS' : el }</label>
                    </div>
                  )
                })
              }
            </dd>
          </>
        )}
        
        <dt>Hidden Completed Tasks</dt>
        <dd>
          <div className="checkbox">
            <input
              type="checkbox"
              id="completed-tasks"
              name="completed-tasks"
              onChange={inputHandleChange}
              checked={completedCheck}
              />
            <label htmlFor="completed-tasks">Completed Tasks</label>
          </div>
        </dd>
      </dl>

    </article>
  )
}
export default RmaSearchBar