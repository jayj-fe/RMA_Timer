// @ts-nocheck
import DDayTimeItem from './DDayTimeItem';
import RepairTatItem from './RepairTatItem';

const RmaItems = ({rmaDataList}) => {
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
            </tr>
          )
        })
      }
    </>
  )
}
export default RmaItems