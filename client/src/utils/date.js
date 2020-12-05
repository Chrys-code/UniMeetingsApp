import { parseISO } from "date-fns";

export default function Datefunction({ dateString }) {
  const date = parseISO(dateString);

  let d1 = Date.now();

  const daysDiff = (d1, d2) =>  {

    let hours = hoursDiff(d1, d2);
    let daysDiff = Math.floor( hours / 24 );

    function hoursDiff(d1, d2) {
        let minutes = minutesDiff(d1, d2);
        let hoursDiff = Math.floor( minutes / 60 );

        function minutesDiff(d1, d2) {
            let seconds = secondsDiff(d1, d2);
            let minutesDiff = Math.floor( seconds / 60 );

            function secondsDiff(d1, d2) {
                let millisecondDiff = d2 - d1;
                let secDiff = Math.floor( ( d2 - d1) / 1000 );

                return secDiff;
             }
            return minutesDiff;
       }
        return hoursDiff;
     }
    return daysDiff;
 }


  return <time dateTime={dateString}>{daysDiff(date, d1) + " days ago"}</time>;
}
