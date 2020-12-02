import React from 'react'
// Server Imports

export function Form(props) {

    const {schoolsData, inputHandlers, signInErr} = props;

    function displaySchools() {
        var data = schoolsData;

        if(data.loading) {
            return (<option > Loading Options ...</option>)
        } else {
            return data.schools.map(school => {
                return(
                <option key={school.id} value={school.id}>{school.name}</option>
                )
            })
        }
    }


        return (
            <>
                <form onSubmit={(e) => inputHandlers.onSignIn(e)}>
                    <div className="field_select">
                        <select name="schoolId" onChange={(e)=>inputHandlers.organizationInputHandler(e)}>
                            <option>Organization</option>
                                {displaySchools()}
                        </select>
                    </div>

                    <div className="field">
                        <div className="field_icon">
                            <img src={require('../../Assets/Login/lockmail.png').default} alt="" />
                        </div>
                        <input className="login_name" name="name" type="text" placeholder="Name" onChange={(e)=>inputHandlers.nameInputHandler(e)}/>
                    </div>

                    <div className="field">
                        <div className="field_icon">
                            <img src={require('../../Assets/Login/lockpassword.png').default} alt=""  />
                        </div>
                        <input name="password" type="text" placeholder="Password" onChange={(e)=>inputHandlers.passwordInputHandler(e)}/>
                    </div>

                        {signInErr &&  <p>{signInErr}</p>}

                    <div className="field">
                        <button className="login_button">Login</button>
                    </div>
                </form>
            </>
        )
    
}

export default Form
