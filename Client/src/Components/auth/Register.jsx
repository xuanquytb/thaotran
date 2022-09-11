import React from "react";
import "../Style/Register.css";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Store/Context/AuthContext";

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const history = useHistory();
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        rePassword: "",
        fullname: "",
        email: "",
        phone: "",
    });
    const { username, password, rePassword, fullname, email, phone } =
        registerForm;

    const onChangeRegisterForm = (e) =>
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

    const register = async (e) => {
        e.preventDefault();
        try {
            const registerData = await registerUser(registerForm);
            if (registerData.success) {
                history.push("/");
            } else {
                alert("Đăng ký không thành công");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='Form-Register'>
            <div className='color'></div>
            <div className='color'></div>
            <div className='color'></div>
            <div className='color'></div>
            <div className='Container-Register'>
                <div className='box'>
                    <div className='box-squade' delay='--i:1;'></div>
                    <div className='box-squade' delay='--i:2;'></div>
                    <div className='box-squade' delay='--i:3;'></div>
                    <div className='box-squade' delay='--i:4;'></div>
                    <div className='form-Register'>
                        <div className='form-left'>
                            <div className='image'>
                                <img
                                    className='image-signup'
                                    src='../../../signUp.png'
                                    alt=''
                                />
                            </div>
                        </div>
                        <div className='form-right'>
                            <h2 className='title-Form'>Đăng ký</h2>
                            <div className='form-register'>
                                <form action='' className='from-input'>
                                    <div className='input-Value input-name'>
                                        <div className='input-name-left'>
                                            <span htmlFor=''>Họ và tên</span>
                                            <input
                                                type='text'
                                                placeholder='Tên đầy đủ'
                                                name='fullname'
                                                value={fullname}
                                                onChange={onChangeRegisterForm}
                                            />
                                        </div>
                                        <div className='input-name-right'>
                                            <span htmlFor=''>
                                                Tên đăng nhập
                                            </span>
                                            <input
                                                type='text'
                                                name='username'
                                                placeholder='Tên đăng nhập'
                                                value={username}
                                                onChange={onChangeRegisterForm}
                                            />
                                        </div>
                                    </div>
                                    <div className='input-Value'>
                                        <span htmlFor=''>Email</span>
                                        <input
                                            className='input-text-Value'
                                            type='text'
                                            placeholder='tonydev@gmail.com'
                                            name='email'
                                            value={email}
                                            onChange={onChangeRegisterForm}
                                        />
                                    </div>
                                    <div className='input-Value'>
                                        <span htmlFor=''>Phone</span>
                                        <input
                                            className='input-text-Value'
                                            type='text'
                                            placeholder='+84xxxxxxxxx'
                                            name='phone'
                                            value={phone}
                                            onChange={onChangeRegisterForm}
                                        />
                                    </div>
                                    <div className='input-Value input-Password'>
                                        <div className='input-Password-left'>
                                            <span htmlFor=''>Mật khẩu</span>
                                            <input
                                                type='text'
                                                placeholder='*****************'
                                                name='password'
                                                value={password}
                                                onChange={onChangeRegisterForm}
                                            />
                                        </div>
                                        <div className='input-Password-right'>
                                            <span htmlFor=''>
                                                Nhập lại mật khẩu
                                            </span>
                                            <input
                                                type='text'
                                                placeholder='*****************'
                                                name='rePassword'
                                                value={rePassword}
                                                onChange={onChangeRegisterForm}
                                            />
                                        </div>
                                    </div>

                                    <div className='btn-form'>
                                        <div className='more'>
                                            <span className='more-detail'>
                                                Bạn đã có tài khoản?
                                            </span>
                                            <a href='http://localhost:3000/login'>
                                                Sign in
                                            </a>
                                        </div>
                                        <div className='btn-box'>
                                            <button
                                                className='btn-regiter'
                                                onClick={register}
                                            >
                                                Đăng ký
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
