import { parseISO } from "date-fns";

export default function Datefunction({ dateString }) {
  const date = parseISO(dateString);

  let d1 = Date.now();

  const daysDiff = (d1, d2) =>  {

    let hours = hoursDiff(d1, d2);
    let daysDiff = Math.floor( hours / 24 );

    function hoursDiff(d1, d2) {
        let hoursDiff = Math.floor(d2-d1) /1000/60/60 ;
        return hoursDiff;
     }
    return daysDiff;
 }

 return <time dateTime={dateString}>{daysDiff(date, d1) + " days ago"}</time>
}
