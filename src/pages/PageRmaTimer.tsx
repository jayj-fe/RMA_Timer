import RmaSearchBar from '../components/RmaSearchBar'
import RmaTimerView from '../components/RmaTimerView'
import { useRmaTimer } from '../service/queries';
import '../styles/rmaTimerView.scss';

const PageRmaTimer = () => {
  const defaultURL: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSiN_GfaUxToAjhf61oaxqhIvCSn1xTPoqF83CsMj93HnaSW12ayKgJWUHGF5vwS1aXVyaKPSPKJ_Ay/pub?output=csv&gid=';
  
  const rmaDataQuery = useRmaTimer('rmaDateKeys', defaultURL, '0');

  if (rmaDataQuery.isLoading){
    return "...loading"
  }

  return (
    <>
      <RmaSearchBar />
      <RmaTimerView 
        rmaData={rmaDataQuery.data}
        />
    </>
  )
}
export default PageRmaTimer