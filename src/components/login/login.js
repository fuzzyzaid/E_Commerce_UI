import React,{useState} from 'react';
import styles from "./login.module.css"; // Correct way


const Login=()=>{
    const [email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[formErrors,setFormErrors]=useState({});

 async function submit(e){
    e.preventDefault();
 }



  return (
    <>
     <div className="d-flex mt-4 justofy-content-center align-items-center">
        <div id={styles.mainContainer}>
            <form onSubmit={submit} id={`login`}>
                <label htmlFor='email'>Email Address</label>
                <input
                type='email'
                onChange={(e)=>setEmail(e.target.value)}
                name="email"
                id='email'
                value={email}
                />
                {formErrors.email && (
                    <p className={styles.errorMsg}>{formErrors.email}</p>
                )}
                <label htmlFor="password">Password</label>
                <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                />
                {formErrors.password && (
                <p className={styles.errorMsg}>{formErrors.password}</p>
                )}
                <input type="submit" value="Login" />
            </form>
            <div></div>
        </div>
       
     </div>
    </>
  )
}

export default Login