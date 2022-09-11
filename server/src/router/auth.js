const express = require("express");

const Router = express.Router();

const jwt = require("jsonwebtoken");

const argon2 = require("argon2");

const {
    Users,
    find_all_Customer,
    find_by_name_row,
    find_by_username,
    InsertUser,
    UpdateUser,
    delete_By_Id,
    find_all_Administrators,
    find_all_Employee,
    UpdateUserIdCard,
} = require("../models/user");
const { Card, InsertCard, find_all_Card } = require("../models/card");

const { find_by_id_role, find_by_name_row_role } = require("../models/role");

const verifyToken = require("../../Middleware/Auth");

const GenerateToken = (payload) => {
    const token = jwt.sign(payload, process.env.secret_token, {
        expiresIn: "1d",
    });
    return token;
};

Router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await find_by_name_row("id", req.userId);
        if (!user) {
            return res
                .status(202)
                .json({ success: false, message: "User not found" });
        } else {
            return res
                .status(200)
                .json({ success: true, user, role: req.role });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});
Router.delete("/:id", verifyToken, async (req, res) => {
    try {
        if (req.role.nameRole === "Administrators") {
            const result = await delete_By_Id(req.params.id);
            if (result != 1) {
                return res
                    .status(202)
                    .json({ success: false, message: "Xóa thất bại" });
            } else {
                return res
                    .status(200)
                    .json({ success: true, message: "Xóa thành công" });
            }
        } else {
            return res.status(405).json({
                success: false,
                message: "Tài khoản không được cấp phép",
            });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.get("/customer", verifyToken, async (req, res) => {
    try {
        const users = await find_all_Customer();
        if (!users) {
            return res
                .status(202)
                .json({ success: false, message: "User not found" });
        } else {
            return res
                .status(200)
                .json({ success: true, users, role: req.role });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});
Router.get("/allEmployee", verifyToken, async (req, res) => {
    try {
        const users = await find_all_Employee();
        if (!users) {
            return res
                .status(202)
                .json({ success: false, message: "User not found" });
        } else {
            return res
                .status(200)
                .json({ success: true, users, role: req.role });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});
Router.get("/allAdmin", verifyToken, async (req, res) => {
    try {
        const users = await find_all_Administrators();
        if (!users) {
            return res
                .status(202)
                .json({ success: false, message: "User not found" });
        } else {
            return res
                .status(200)
                .json({ success: true, users, role: req.role });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.get("/", verifyToken, async (req, res) => {
    try {
        const users = await find_all_Employee();
        if (!users) {
            return res
                .status(202)
                .json({ success: false, message: "User not found" });
        } else {
            return res
                .status(200)
                .json({ success: true, users, role: req.role });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
});

Router.post("/register", async (req, res) => {
    const { username, password, fullname, nameRole, email, phone, address } =
        req.body;

    if (
        !username ||
        !password ||
        !fullname ||
        !nameRole ||
        !email ||
        !phone ||
        !address
    ) {
        res.status(400).json({
            success: true,
            message: "Nhập thiếu thông tin",
        });
    } else {
        const user = await find_by_name_row("username", username);
        if (user.length > 0) {
            res.status(202).json({
                success: false,
                message: "Tài khoản đã được sử dụng",
            });
        } else {
            const emailValid = await find_by_name_row("email", email);

            if (emailValid.length > 0) {
                res.status(202).json({
                    success: false,
                    message: "Email đã được sử dụng",
                });
            } else {
                const phoneValid = await find_by_name_row("phone", phone);
                if (phoneValid.length > 0) {
                    res.status(202).json({
                        success: false,
                        message: "Số điện thoại đã được sử dụng",
                    });
                } else {
                    const hashPassword = await argon2.hash(password);
                    const role = await find_by_name_row_role(
                        "nameRole",
                        nameRole
                    );

                    const newUser = new Users({
                        username,
                        password: hashPassword,
                        fullname,
                        email,
                        phone,
                        address,
                        idRole: role.id,
                    });
                    try {
                        const result = await InsertUser(newUser);
                        const cardNew = {
                            userid: result.id,
                        };

                        const card = await InsertCard(cardNew);
                        const resultUpdate = await UpdateUserIdCard(
                            result.id,
                            card.id
                        );

                        if (result) {
                            const token = GenerateToken({
                                userId: result.id,
                                role: role,
                                cardId: card.id,
                            });
                            const userNew = await find_by_name_row(
                                "id",
                                result.id
                            );
                            res.status(200).json({
                                success: true,
                                tokenAccess: token,
                                message: "Thêm thành công",
                                user: userNew,
                            });
                        } else {
                            res.status(400).json({
                                success: false,
                                message: "Thêm thất bại",
                            });
                        }
                    } catch (error) {
                        res.status(400).json({
                            success: false,
                            message: "Xảy ra lỗi : " + error,
                        });
                    }
                }
            }
        }
    }
});
Router.post("/createAdmin", async (req, res) => {
    const {
        username,
        password,
        fullname,
        nameRole,
        email,
        phone,
        address,
        sex,
        nameAvata,
        dateOfBirth,
    } = req.body;
    if (
        !username ||
        !password ||
        !fullname ||
        !nameRole ||
        !email ||
        !phone ||
        !address ||
        !sex ||
        !nameAvata ||
        !dateOfBirth
    ) {
        res.status(202).json({
            success: true,
            message: "Nhập thiếu thông tin",
        });
    } else {
        const user = await find_by_name_row("username", username);
        if (user.length > 0) {
            res.status(202).json({
                success: false,
                message: "Tài khoản đã được sử dụng",
            });
        } else {
            const emailValid = await find_by_name_row("email", email);

            if (emailValid.length > 0) {
                res.status(202).json({
                    success: false,
                    message: "Email đã được sử dụng",
                });
            } else {
                const phoneValid = await find_by_name_row("phone", phone);
                if (phoneValid.length > 0) {
                    res.status(202).json({
                        success: false,
                        message: "Số điện thoại đã được sử dụng",
                    });
                } else {
                    const hashPassword = await argon2.hash(password);
                    const role = await find_by_name_row_role(
                        "nameRole",
                        nameRole
                    );
                    const newUser = new Users({
                        username,
                        password: hashPassword,
                        fullname,
                        email,
                        phone,
                        address,
                        sex,
                        dateOfBirth,
                        nameAvata,
                        idRole: role.id,
                    });
                    try {
                        const result = await InsertUser(newUser);
                        if (result) {
                            const token = GenerateToken({
                                userId: result.id,
                                role: role,
                            });
                            const userNew = await find_by_name_row(
                                "id",
                                result.id
                            );
                            res.status(200).json({
                                success: true,
                                tokenAccess: token,
                                message: "Thêm thành công",
                                user: userNew,
                            });
                        } else {
                            res.status(400).json({
                                success: false,
                                message: "Thêm thất bại",
                            });
                        }
                    } catch (error) {
                        res.status(400).json({
                            success: false,
                            message: "Xảy ra lỗi : " + error,
                        });
                    }
                }
            }
        }
    }
});
Router.post("/createEmloyee", async (req, res) => {
    const {
        username,
        password,
        fullname,
        nameRole,
        email,
        phone,
        address,
        sex,
        dateOfBirth,
        nameAvata,
    } = req.body;
    if (
        !username ||
        !password ||
        !fullname ||
        !nameRole ||
        !email ||
        !phone ||
        !address ||
        !sex ||
        !dateOfBirth ||
        !nameAvata
    ) {
        res.status(400).json({
            success: true,
            message: "Nhập thiếu thông tin",
        });
    } else {
        const user = await find_by_name_row("username", username);
        if (user.length > 0) {
            res.status(202).json({
                success: false,
                message: "Tài khoản đã được sử dụng",
            });
        } else {
            const emailValid = await find_by_name_row("email", email);

            if (emailValid.length > 0) {
                res.status(202).json({
                    success: false,
                    message: "Email đã được sử dụng",
                });
            } else {
                const phoneValid = await find_by_name_row("phone", phone);
                if (phoneValid.length > 0) {
                    res.status(202).json({
                        success: false,
                        message: "Số điện thoại đã được sử dụng",
                    });
                } else {
                    const hashPassword = await argon2.hash(password);
                    const role = await find_by_name_row_role(
                        "nameRole",
                        nameRole
                    );
                    const newUser = new Users({
                        username,
                        password: hashPassword,
                        fullname,
                        email,
                        phone,
                        address,
                        sex,
                        dateOfBirth,
                        nameAvata,
                        idRole: role.id,
                    });
                    try {
                        const result = await InsertUser(newUser);
                        if (result) {
                            const token = GenerateToken({
                                userId: result.id,
                                role: role,
                            });
                            const userNew = await find_by_name_row(
                                "id",
                                result.id
                            );
                            res.status(200).json({
                                success: true,
                                tokenAccess: token,
                                message: "Thêm thành công",
                                user: userNew,
                            });
                        } else {
                            res.status(400).json({
                                success: false,
                                message: "Thêm thất bại",
                            });
                        }
                    } catch (error) {
                        res.status(400).json({
                            success: false,
                            message: "Xảy ra lỗi : " + error,
                        });
                    }
                }
            }
        }
    }
});

Router.put("/update/:id", verifyToken, async (req, res) => {
    const { fullname, sex, dateOfBirth, email, phone, address } = req.body;
    if (!fullname || !sex || !dateOfBirth || !email || !phone || !address) {
        res.status(400).json({
            success: true,
            message: "Nhập thiếu thông tin",
        });
    } else {
        const user = await find_by_name_row("id", req.params.id);
        if (user.length <= 0) {
            res.status(400).json({
                success: false,
                message: "Tài khoản không tồn tại",
            });
        } else {
            const newUpdate = new Users({
                fullname,
                email,
                phone,
                address,
                sex,
                dateOfBirth,
            });
            try {
                const result = await UpdateUser(newUpdate, req.params.id);
                const users = await find_all_Customer();
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: "Cập nhật thành công",
                        users: users,
                    });
                } else {
                    res.status(400).json({
                        success: false,
                        message: "Cập nhật thất bại",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    message: "Xảy ra lỗi : " + error,
                });
            }
        }
    }
});

Router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({
            success: false,
            message: "Nhập thiếu thông tin Tài khoản/Mật khẩu",
        });
    } else {
        try {
            const user = await find_by_username(username);
            if (!user) {
                res.status(500).json({
                    success: false,
                    message: "Tài khoản/Mật khẩu không chính xác",
                });
            } else {
                const Role = await find_by_id_role(user.idRole);
                const validPassword = await argon2.verify(
                    user.passwordEn,
                    password
                );

                if (Role.nameRole === "Customer") {
                    const card = await find_all_Card(user.id);
                    if (validPassword) {
                        const accessToken = GenerateToken({
                            userId: user.id,
                            role: Role,
                            idCard: card[0].id,
                        });
                        res.status(200).json({
                            success: true,
                            message: "Đăng nhập thành công",
                            token: accessToken,
                            user: user,
                        });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: "Tài khoản/Mật khẩu không chính xác",
                        });
                    }
                } else {
                    if (validPassword) {
                        const accessToken = GenerateToken({
                            userId: user.id,
                            role: Role,
                        });
                        res.status(200).json({
                            success: true,
                            message: "Đăng nhập thành công",
                            token: accessToken,
                            user: user,
                        });
                    } else {
                        res.status(200).json({
                            success: false,
                            message: "Tài khoản/Mật khẩu không chính xác",
                        });
                    }
                }
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Xảy ra lỗi : " + error,
            });
        }
    }
});

module.exports = Router;
