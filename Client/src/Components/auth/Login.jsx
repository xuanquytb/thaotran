import "../Style/Login.css";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Store/Context/AuthContext";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const history = useHistory();
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const { username, password } = loginForm;
    const ErrorSvg = () => (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
        >
            <path fill='none' d='M0 0h24v24H0z' />
            <path
                d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z'
                fill='rgba(251,34,11,1)'
            />
        </svg>
    );
    const ErrorIcon = (props) => <Icon component={ErrorSvg} {...props} />;

    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    const login = async (e) => {
        e.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                // history.push("/dashboard");
            } else {
                notification.open({
                    description: loginData.message,
                    className: "custom-class",
                    style: {
                        width: 350,
                        backgroundColor: "#fff2f0",
                    },
                    type: "error",
                    icon: <ErrorIcon />,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='Form-Login'>
            <div className='color'></div>
            <div className='color'></div>
            <div className='color'></div>
            <div className='color'></div>
            <div className='Container'>
                <div className='box'>
                    <div className='box-squade' delay='--i:1;'></div>
                    <div className='box-squade' delay='--i:2;'></div>
                    <div className='box-squade' delay='--i:3;'></div>
                    <div className='box-squade' delay='--i:4;'></div>
                    <div className='form-login'>
                        <h2 style={{ fontSize: 28 }}>Đăng nhập</h2>
                        <form action='' className='form-input'>
                            <div className='box-input'>
                                <input
                                    type='text'
                                    className='input-value'
                                    placeholder='Username'
                                    name='username'
                                    value={username}
                                    onChange={onChangeLoginForm}
                                />
                            </div>
                            <div className='box-input'>
                                <input
                                    type='password'
                                    className='input-value'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={onChangeLoginForm}
                                />
                            </div>
                            <div className='box-input'>
                                <button className='btn-login' onClick={login}>
                                    Login
                                </button>
                            </div>
                            <div className='box-input'>
                                <p className='more'>
                                    Quên mật khẩu?
                                    <a href='https://' className='link'>
                                        Click here?
                                    </a>
                                </p>
                                <p className='more'>
                                    Bạn chưa có tài khoản?
                                    <a
                                        href='http://localhost:3000/register'
                                        className='link'
                                    >
                                        Sign up?
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
