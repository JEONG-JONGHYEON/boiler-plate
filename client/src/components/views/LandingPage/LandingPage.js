import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello') // CORS(Cross-Origin Resource Sharing) 정책 proxy 설정으로 해결
            .then(response => console.log(response))
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                console.log(response.data)
                if (response.data.logoutSuccess) {
                    props.history.push("/login")
                } else {
                    alert('로그아웃 하는데 실패 했습니다.')
                }
            })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>
                Landing Page
            <br />
                시작 페이지
            </h2>

            <button onClick={onClickHandler}>
                Logout
            </button>
        </div>
    )
}

export default withRouter(LandingPage)