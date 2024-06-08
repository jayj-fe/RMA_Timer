import RmaHeader from '../components/RmaHeader'
import RmaTimerView from '../components/RmaTimerView'
import { useRmaTimer } from '../service/queries';
import '../styles/rmaTimerView.scss';

const PageRmaTimer = () => {
  const defaultURL: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSiN_GfaUxToAjhf61oaxqhIvCSn1xTPoqF83CsMj93HnaSW12ayKgJWUHGF5vwS1aXVyaKPSPKJ_Ay/pub?output=csv&gid=';
  const defaultURL2: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vStXVCBkM7coElpUYpyqpGS6Yw5Eq6QcZoy_aJTL30I0yzjyqLxj4MY2cx7vGWqQwJNgFsv6oVoNh90/pub?output=csv&gid=';
  
  const rmaDataQuery = useRmaTimer('rmaDateKeys', defaultURL, '0');
  const rmaDayOffQuery = useRmaTimer('rmaDayOffKeys', defaultURL2, '0');

  if (rmaDataQuery.isLoading){
    return "...loading"
  }
  if (rmaDayOffQuery.isLoading){
    return "...loading"
  }

  return (
    <>
      <RmaHeader />
      <RmaTimerView 
        rmaData={rmaDataQuery.data}
        rmaDayOff={rmaDayOffQuery.data}
        />
    </>
  )
}
export default PageRmaTimer