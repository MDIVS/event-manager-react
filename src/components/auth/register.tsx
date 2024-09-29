import { useState } from "react";
import axios from "axios";
import InputUsername from "../fields/input-username";
import InputPassword from "../fields/input-password";
import InputRetypePassword from "../fields/input-retype-password";

export function Register() {
    const [userErr, setUserErr] = useState('');
    const [username, setUsername] = useState('');
    const [passErr, setPassErr] = useState('');
    const [pass, setPass] = useState('');
    const [retypePassErr, setRetypePassErr] = useState('');
    const [retypePass, setRetypePass] = useState('');

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        alert('Submit clicked!');
        console.log('hey', event);
        axios({
            method: 'POST',
            url: '/user',
            data: {record: {username, password: pass}}
        }).then((res) => console.log(res.data));
        event.preventDefault();
    }

    return (
        <section className="m-auto text-center w-60">
            <h1> Register </h1>
            <div className="border-b border-b-slate-700 m-2"></div>

            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleSubmit}>
                <InputUsername onDataChanged={(data:InstanceType<typeof InputUsername.InputData>) => {setUserErr(data.error); setUsername(data.value);}}/>
                <p className="text-red-400 text-xs mb-3">{userErr}</p>

                <InputPassword onDataChanged={(data:InstanceType<typeof InputPassword.InputData>) => {setPassErr(data.error); setPass(data.value);}}/>
                <p className="text-red-400 text-xs mb-3">{passErr}</p>

                <InputRetypePassword password={pass} onDataChanged={(data:InstanceType<typeof InputPassword.InputData>) => {setRetypePassErr(data.error); setRetypePass(data.value);}}/>
                <p className="text-red-400 text-xs mb-3">{retypePassErr}</p>
                
                <br />

                <button className="transition-all duration-300 outline-none border-2 border-yellow-400 border-opacity-50 text-yellow-400 rounded-md p-1 px-16 bg-white bg-opacity-5 hover:border-opacity-100 focus:border-opacity-100 disabled:border-white disabled:border-opacity-50 disabled:opacity-35"
                    disabled={(username==='' || userErr || pass==='' || passErr || retypePass==='' || retypePassErr) ? true : false}>
                    Sign Up
                </button>
            </form>

            <div className="m-4 border-t border-slate-700"></div>

            Already registered? <a href="https://www.github.com/MDIVS" className="text-blue-300">Sign In</a>
        </section>
    )
}