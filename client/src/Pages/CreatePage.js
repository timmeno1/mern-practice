import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import { useHistory } from "react-router-dom";

const CreatePage = () => {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    let history = useHistory()
    const [link, setLink] = useState('')


    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${auth.token}`})
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className={"row"}>
            <div className={"col s8 offset-s2"}>
                <div className="input-field">
                    <input
                        id={"link"}
                        type="text"
                        placeholder={"Вставьте ссылку"}
                        name={"link"}
                        onChange={ e => setLink(e.target.value) }
                        value={link}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Ссылка</label>
                </div>
            </div>

        </div>
    )
}

export default CreatePage