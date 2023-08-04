import { useLogin } from "./hooks/useLogin";

export function LoginPage() {

    const { formData, isValid, error, doLogin, changeHandler } = useLogin()
    
    return (
        <div className="page-sm">
            <h1 className="title">LOGIN</h1>

            {error && <div>errore!</div>}

            <div className="text-3xl my-4">Login as Admin</div>
            <form onSubmit={doLogin} className="flex flex-col gap-3">
                <input type="text" placeholder="username" value={formData.username} onChange={changeHandler} />
                <input type="password" placeholder="password" value={formData.password} onChange={changeHandler} />
                <button className="btn primary" type="submit" disabled={!isValid}>SIGN IN</button>
            </form>
        </div>
    )
}
