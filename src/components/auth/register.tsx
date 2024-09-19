import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import InputUsername, {InputUsernameData} from "../fields/input-username";

const REGEX_HAS_UPPER_AND_LOWER_CASE = /^(?=.*[a-z])(?=.*[A-Z])/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,24}/;
const REGEX_HAS_NUMBER_AND_SPECIAL_CHAR = /^(?=.*\d)(?=.*[^a-zA-Z\d])/;

export function Register() {
    const [userErr, setUserErr] = useState('');
    let username:string = '';

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    useEffect(() => {
        setValidPwd(REGEX_PASSWORD.test(pwd))
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd])

    function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
        alert('Submit clicked!');
        console.log('hey', event);
        axios({
            method: 'POST',
            url: '/user',
            data: {record: {username, password: pwd}}
        }).then((res) => console.log(res.data));
        event.preventDefault();
    }

    return (
        <section className="m-auto text-center w-60">
            <h1> Register </h1>
            <div className="border-b border-b-slate-700 m-2"></div>

            {/* <form onSubmit={handleSubmit}> */}
            <form onSubmit={handleSubmit}>
                <InputUsername onDataChanged={(data:InputUsernameData) => {setUserErr(data.error); username = data.value;}}/>
                {userErr}
                <br />

                <label htmlFor="password"> create your password </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value.replace(/\s/g, ""))}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    className={twMerge(
                        "transition-all duration-500 w-full m-2 ms-0 me-0 p-1 bg-white bg-opacity-10 border-l-2 border-opacity-50 rounded-md outline-none focus:border-opacity-100",
                        validPwd ? "border-green-500": pwd ? "border-red-600" : "border-yellow-600"
                    )}
                />
                <div className="text-xs text-left transition-all duration-500">
                    <p className={pwd ? pwd.length < 8 || pwd.length > 24 ? "text-orange-500" : "text-green-500" : ""}>
                        • 8 to 24 characters</p>
                    <p className={pwd ? !REGEX_HAS_UPPER_AND_LOWER_CASE.test(pwd) ? "text-orange-500" : "text-green-500" : ""}>
                        • Must include uppercase and lowercase letters</p>
                    <p className={pwd ? !REGEX_HAS_NUMBER_AND_SPECIAL_CHAR.test(pwd) ? "text-orange-500" : "text-green-500" : ""}>
                        • Must include a number and a special character</p>
                </div>

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
                    <p className={matchPwd ? matchPwd != pwd ? "text-orange-500" : "text-green-500" : ""}>
                        Passwords must match
                    </p>
                </div>

                <br />
                
                <button className="transition-all duration-300 outline-none border-2 border-yellow-400 border-opacity-50 text-yellow-400 rounded-md p-1 px-16 bg-white bg-opacity-5 hover:border-opacity-100 focus:border-opacity-100 disabled:border-white disabled:border-opacity-50 disabled:opacity-35"
                    disabled={userErr || !validPwd || !validMatch ? true : false}>
                        Sign Up
                </button>
            </form>

            <div className="m-4 border-t border-slate-700"></div>

            Already registered? <a href="https://www.github.com/MDIVS" className="text-blue-300">Sign In</a>
        </section>
    )
}