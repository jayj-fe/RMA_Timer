import RmaTimerView from '../components/RmaTimerView'
import { useRmaTimer } from '../service/queries';
import '../styles/rmaTimerView.scss';

const PageRmaTimer = () => {
  const defaultURL: string = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSLyeOcC_4T28sfHZVukc8YmKl53sCHrYY0HMVPjltpn4RbNW3cc8ktwzW-cQcXQmMN1xdswGrqrZa6/pub?output=csv&gid=';
  
  const rmaDataQuery = useRmaTimer('rmaDateKeys', defaultURL, '0');

  if (rmaDataQuery.isLoading){
    return "...loading"
  }

  return (
   <RmaTimerView 
    rmaData={rmaDataQuery.data}
    />
  )
}
export default PageRmaTimer