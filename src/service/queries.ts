import {
  useQuery,
} from "@tanstack/react-query";
import {
  Get_rmaTimer,
} from "../http/googleSheetApi";

export function useRmaTimer(keyName:string, sheetUrl:string, sheetIdx:string ) {
  return useQuery({
    queryKey: [keyName],
    queryFn: () => Get_rmaTimer(sheetUrl, sheetIdx)
  });
}
