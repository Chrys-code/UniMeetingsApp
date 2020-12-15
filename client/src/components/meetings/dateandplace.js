import React, {useEffect, useState} from 'react'

function Dateandplace(props) {
    const {inputHandlers, inputValue } = props;
    const { yearInputHandler, monthInputHandler, dayInputHandler, placeInputHandler } = inputHandlers;
    const {year, day , month} = inputValue;
    // options
    const [yearOpt, setYearOpt] = useState(['2020','2021'])
    const [dayOpt, setDayOpt] = useState(['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'])
    const [monthOpt, setMonthOpt] = useState(['01','02','03','04','05','06','07','08','09','10','11','12'])

    //////////////////////////
    // Page content
    //////////////////////////
    // This function filters out days
    // Only future days are given to book a meeting
    //////////////////////////


    useEffect(()=>{
        // get date
        const d = new Date();

        setYearOpt(yearOpt.filter(x => x >= d.getFullYear()))  
        if(year === `${d.getFullYear()}`) {
            setMonthOpt(monthOpt.filter(x => x >= (d.getMonth() + 1)))
            if(month === `${(d.getMonth() + 1)}`){
                setDayOpt(dayOpt.filter(x => x >= d.getDate()))

            }
        } else if (year !== `${d.getFullYear()}`) {
            setMonthOpt(['01','02','03','04','05','06','07','08','09','10','11','12'])
            if(month === `${(d.getMonth() + 1)}`){
                setDayOpt(['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'])

            }

        }
        
    },[year, month, day])

    
    return (
        <>
            <div className="meetings_details">
                <p>Provide date & location</p>
                <span>Year:</span>{" "}<br/>
                    <select onChange={(e)=>yearInputHandler(e)}>
                    <option disabled={year !== "Year" ? true : false }>Year</option>

                    {yearOpt.map(year=>{ return(
                            <option key={year} value={year}>{year}</option>
                        )})}
                    </select> {" "}<br/>

                    <span>Month:</span>{" "}<br/>
                    <select onChange={(e)=>monthInputHandler(e)}> 
                    <option disabled={month !== "Month" ? true : false }>Month</option>
                        {monthOpt.map(month=>{ return(
                            <option key={month} value={month}>{month}</option>
                        )})}
                    </select>{" "}<br/> 

                    <span>Day:</span>{" "}<br/>
                    <select onChange={(e)=>dayInputHandler(e)}>
                    <option disabled={day !== "Day" ? true : false }>Day</option>
                        {dayOpt.map(day=>{ return(
                            <option key={day} value={day}>{day}</option>
                        )})}
                    </select>{" "}<br/>
                <p>Provide address or place name</p>
                <div className="field">
                   <div className="field_icon">
                        <img src={require('../../Assets/Login/lockmail.png').default} alt="" />
                   </div>
                   <input name="place" type="text" placeholder="Address or place name" onChange={(e)=>placeInputHandler(e)} />
                </div>
            </div>

        </>
    )
}

export default Dateandplace
