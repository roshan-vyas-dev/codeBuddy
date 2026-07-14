import { useState } from "react"




function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>login</h1>
            <input type="email" value={email} placeholder="Enter email" onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <p>{email}</p>

        </div>
    )
}

export default Login
