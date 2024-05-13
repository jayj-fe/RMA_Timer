
import Papa from 'papaparse';

export const Get_rmaTimer = async (url: string, sheets: string) => {
  try {
    let callData: any;
    const data = new Promise((resolve) => {
      Papa.parse(`${url}${sheets}`, {download: true, header: true, complete(results: any) { resolve( callData = results.data )}});
    });
    
    return data.then(()=>{
      return callData;
    });
  } catch (error) {
    console.warn("");
  }
}