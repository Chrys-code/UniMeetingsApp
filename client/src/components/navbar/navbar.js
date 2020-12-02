import React, { Component } from 'react';
// Remove User: Token 
import { getFromStorage, setInStorage } from "../../utils/storage";

export class Navbar extends Component {

    onLogOut() {
        const obj = getFromStorage("login_app");
        if (obj && obj.token) {
          const { token } = obj;
    
          fetch("/api/account/logout?token=" + token)
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                setInStorage("login_app", { token: "" });
                this.setState({
                  token: "",
                });
                window.location.reload();

              }
            });
        } else {
            console.log('smth went wrong')
        }

      }
    
    render() {
        return (
            <div className="navbar">
                <button onClick={(e)=>this.onLogOut(e)}></button>
            </div>
        )
    }
}

export default Navbar
