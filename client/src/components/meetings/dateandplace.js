import React from 'react'

function Dateandplace(props) {
    const {inputHandlers, inputOptions } = props;
    const { yearInputHandler, monthInputHandler, dayInputHandler, placeInputHandler } = inputHandlers;
    const { days, months, years } = inputOptions;
    return (
        <>
            <div className="meetings_details">
                <p>Provide date & location</p>
                <span>Year:</span>{" "}<br/>
                    <select onChange={(e)=>yearInputHandler(e)}>
                    {years.map(year=>{ return(
                            <option key={year} value={year}>{year}</option>
                        )})}
                    </select> {" "}<br/>

                    <span>Month:</span>{" "}<br/>
                    <select onChange={(e)=>monthInputHandler(e)}> 
                        {months.map(month=>{ return(
                            <option key={month} value={month}>{month}</option>
                        )})}
                    </select>{" "}<br/> 

                    <span>Day:</span>{" "}<br/>
                    <select onChange={(e)=>dayInputHandler(e)}>
                        {days.map(day=>{ return(
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
