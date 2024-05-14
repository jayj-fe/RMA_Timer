// @ts-nocheck
import { useEffect } from 'react';
import useFilterStore from '../stores/filterList'
import useTranOwner from '../stores/tranOwnerList'

const RmaSearchBar = () => {
  const { useTranOwnerList } = useTranOwner();
  const { userFilterList, setUserFilterList } = useFilterStore();

  const inputHandleChange = (e) => {
    const filterData = userFilterList;
    const clickData = e.target;
    const filterIdx = filterData.indexOf(clickData.id);

    if(filterIdx !== -1 ){
      if(!clickData.checked){
        filterData.splice(filterIdx, 1);
      }
    }else{
      if(clickData.checked){
        filterData.push(clickData.id)
      }
    }

    setUserFilterList(filterData)
  };

  return (
    <article className='rma-filter'>
      <dl>
        {useTranOwnerList && (
          <>
            <dt>TRAN_OWNER Filter</dt>
            <dd>
              {
                useTranOwnerList.map((el, idx)=>{
                  const itemName = el === '' ? 'no' : el;
                  const itemChecked = userFilterList.indexOf(itemName) > -1;
                  return (
                    <div className="checkbox" key={idx}>
                      <input
                        type="checkbox"
                        id={itemName}
                        name="TRAN_OWNER"
                        onChange={inputHandleChange}
                        checked={itemChecked ? 'checked' : false}
                        />
                      <label for={itemName}>{ el === '' ? 'No TRAN_OWNER' : el }</label>
                    </div>
                  )
                })
              }
            </dd>
          </>
        )}
        
        <dt>Show Completed Tasks</dt>
        <dd>
          <div className="checkbox">
            <input type="checkbox" id="completed-tasks" name="completed-tasks" />
            <label for="completed-tasks">Completed Tasks</label>
          </div>
        </dd>
      </dl>

    </article>
  )
}
export default RmaSearchBar