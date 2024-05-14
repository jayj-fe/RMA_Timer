// @ts-nocheck
const RepairTatItem = ({ repair_tat } : any) => {
  let warning = false;
  let warningCnt;

  if(repair_tat >= 2 && repair_tat < 2.5){
    warning = true;
    warningCnt = 'warning-yellow';
  }else if(repair_tat >= 2.5 && repair_tat < 3){
    warning = true;
    warningCnt = 'warning-red';
  }

  return (
    <p className={`${warning ? warningCnt : ""}`}>
      {repair_tat}
    </p>
  )
}
export default RepairTatItem