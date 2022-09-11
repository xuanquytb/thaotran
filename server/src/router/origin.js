const express = require("express");

const Router = express.Router();

const jwt = require("jsonwebtoken");

const argon2 = require("argon2");

const {
    find_by_name_row_origin,
    find_all_Origin,
    find_by_Id,
    delete_By_Id,
    InsertOrigin,
    UpdateOrigin,
    Origin,
} = require("../models/origin");
const {
    find_Emp_by_name_row,
} = require("../models/Employee");

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
    const result = await find_Emp_by_name_row("id",req.userId)
    if(result){
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
    }else{
            return res.status(405).json({
                success: false,
                message: "Tài khoản không tồn tại",
            });
    }
    
});

Router.get("/allOrigin", verifyToken, async (req, res) => {
    const result = await find_Emp_by_name_row("id",req.userId)
    if(result)  {
        try {
            const origins = await find_all_Origin();
            if (!origins) {
                return res
                    .status(202)
                    .json({ success: false, message: "User not found" });
            } else {
                return res
                    .status(200)
                    .json({ success: true, origins });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, message: "Server Error" });
        }
    } else{
        return res.status(405).json({
            success: false,
            message: "Tài khoản không tồn tại",
        });
}
});

Router.post("/addOrigin", verifyToken, async (req, res) => {
    if (req.role.id === 1 || req.role.id === 3) {
        const {
            nameOrigin,
            description,
        } = req.body;

        if (
            !nameOrigin ||
            !description 
        ) {
            res.status(400).json({
                success: true,
                message: "Nhập thiếu thông tin",
            });
        } else {
            const nameOriginRe = await find_by_name_row_origin("nameOrigin", nameOrigin);
            if (nameOriginRe.length > 0) {
                res.status(400).json({
                    success: false,
                    message: "Ngành hàng đã tồn tại",
                });
            } else {
                try {
                    const newOriginItem = new Origin({
                        nameOrigin,
                        description,
                    })
                    const newOriginRe = await InsertOrigin(newOriginItem);
                    if(newOriginRe){
                        res.status(200).json({
                            success:true,
                            message: "Thêm thành công",
                            nameOrigin: nameOrigin,
                        })
                    }else{
                        res.status(400).json({
                            success:false,
                            message:"Thêm thất bại",
                        });
                    }
                } catch (error) {
                    res.status(400).json({
                        success:false,
                        message: "Xảy ra lỗi : " + error,
                    })
                }
            }
        }
    } else {
        return res.status(405).json({
            success: false,
            message: "Tài khoản không được cấp phép",
        });
    }
});

Router.put("/updateOrigin/:id", verifyToken, async (req, res) => {
    if (req.role.id === 1 || req.role.id === 3) {
        const {
            nameOrigin,
            description,
        } = req.body;
        if (
            !nameOrigin ||
            !description 
        ) {
            res.status(400).json({
                success: true,
                message: "Nhập thiếu thông tin",
            });
        } else {
            const nameOriginRe = await find_by_name_row_origin("nameOrigin", req.params.id);
            if (nameOriginRe.length > 0) {
                res.status(400).json({
                    success: false,
                    message: "Ngành hàng đã tồn tại",
                });
            } else {
                try {
                    const newOriginItem = new Origin({
                        nameOrigin,
                        description,
                    })
                    const newOriginRe = await UpdateOrigin(newOriginItem,req.params.id);
                    if(newOriginRe){
                        res.status(200).json({
                            success:true,
                            message: "Cập nhật thành công",
                            nameOrigin: nameOrigin,
                        })
                    }else{
                        res.status(400).json({
                            success:false,
                            message:"Cập nhật thất bại",
                        });
                    }
                } catch (error) {
                    res.status(400).json({
                        success:false,
                        message: "Xảy ra lỗi : " + error,
                    })
                }
            }
        }
    } else {
        return res.status(405).json({
            success: false,
            message: "Tài khoản không được cấp phép",
        });
    }
});

module.exports = Router;
