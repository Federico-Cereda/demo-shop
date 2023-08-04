import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/auth/useAuth";

export function useLogin() {
    const navigate =useNavigate()
    const login = useAuth(state => state.login)
    const isLogged = useAuth(state => state.isLogged)
    const error = useAuth(state => state.error)
    const [formData, setFormData] = useState({ username: 'info@fake.com', password: '1234567890' })

    useEffect(() => {
        if (isLogged) {
            navigate('/cms')
        }
    }, [navigate, isLogged])

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormData(s => ({...s, [name]: value}) )
    }

    const isValid = formData.username.length && formData.password.length

    async function doLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login(formData.username, formData.password)
    }

    return {
        formData,
        isValid,
        error, //001
        doLogin,
        changeHandler
    }
}
