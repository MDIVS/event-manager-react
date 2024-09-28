import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import InputUsername from "../fields/input-username";
import InputPassword from "../fields/input-password";

export function Register() {
    const [userErr, setUserErr] = useState('');
    const [username, setUsername] = useState('');
    const [passErr, setPassErr] = useState('');
    const [pass, setPass] = useState('');

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    useEffect(() => {
        setValidMatch(pass === matchPwd)
    }, [pass, matchPwd])

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
                <p className="text-red-400">{userErr}</p>
                <br />

                <InputPassword onDataChanged={(data:InstanceType<typeof InputPassword.InputData>) => {setPassErr(data.error); setPass(data.value);}}/>
                <p className="text-red-400">{passErr}</p>
                <br />

                <label htmlFor="confirm_pwd"> confirm your password </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value.replace(/\s/g, ""))}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    className={twMerge(
                        "transition-all duration-500 w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                        validMatch ? "border-green-500": matchPwd ? "border-red-600" : "border-yellow-600"
                    )}
                />
                <div className="text-xs">
                    <p className={matchPwd ? matchPwd != pass ? "text-orange-500" : "text-green-500" : ""}>
                        Passwords must match
                    </p>
                </div>

                <br />
                
                <button className="transition-all duration-300 outline-none border-2 border-yellow-400 border-opacity-50 text-yellow-400 rounded-md p-1 px-16 bg-white bg-opacity-5 hover:border-opacity-100 focus:border-opacity-100 disabled:border-white disabled:border-opacity-50 disabled:opacity-35"
                    disabled={(username==='' || userErr || pass==='' || passErr || !validMatch) ? true : false}>
                    Sign Up
                </button>
            </form>

            <div className="m-4 border-t border-slate-700"></div>

            Already registered? <a href="https://www.github.com/MDIVS" className="text-blue-300">Sign In</a>
        </section>
    )
}