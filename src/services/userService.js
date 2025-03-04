import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { where } from "sequelize-cockroachdb";
require('dotenv').config();

// lấy toàn bộ tài khoản
export const getAllUsersService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findAll();

        resolve({
            err: response.length ? 0 : 2,
            msg: response.length ? 'Lấy dữ liệu thành công!' : 'Không có dữ liệu trong bảng User.',
            data: response
        });
    } catch (error) {
        reject(error);
    }
});

// lấy tài khoản theo id
export const getUserByIdService = ({ id }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Lấy dữ liệu thành công!' : 'Lấy dữ liệu không thành công.',
            data: response
        });
    } catch (error) {
        reject(error);
    }
});


export const getUserByCardIdService = (card_id) =>
    new Promise(async (resolve, reject) => {
      try {
        // Tìm tài khoản theo card_id
        const response = await db.User.findOne({
          where: { card_id },
        });
  
        if (response) {
          // Trả về dữ liệu nếu tìm thấy
          resolve(response.dataValues); // `dataValues` chứa dữ liệu thực của đối tượng
        } else {
          // Trả về thông báo nếu không tìm thấy tài khoản
          resolve(null); // Hoặc tùy chỉnh: resolve({ error: "Không tìm thấy tài khoản" })
        }
      } catch (error) {
        console.error("Lỗi khi lấy tài khoản theo card_id:", error);
        reject(error); // Trả về lỗi để xử lý ở nơi gọi hàm
      }
    });
  

// sửa
export const updateUserService = ({ id, user_name, vehicle_type, type }) =>
    new Promise(async (resolve, reject) => {
        try {
            // Cập nhật bản ghi thông tin dựa trên id
            const response = type ?
                await db.User.update(
                    { user_name, vehicle_type, type },
                    {
                        where: { id },
                    }
                ) :
                await db.User.update(
                    { user_name, vehicle_type },
                    {
                        where: { id },
                    }
                )

            resolve({
                err: response[0] ? 0 : 2,
                msg: response[0] ? 'Cập nhật thông tin thành công!' : 'Không tìm thấy thông tin để cập nhật.',
            });
        } catch (error) {
            reject({
                err: 1,
                msg: 'Lỗi khi cập nhật thông tin!',
                error: error,
            });
        }
    });

// xóa user
export const deleteUserService = async ({ id }) => {
    try {
        const response = await db.User.destroy({
            where: {
                id
            }
        })
        return {
            err: response ? 0 : 2,
            msg: response ? ' Xóa thành công!' : 'Xóa không thành công.'
        }
    } catch (error) {
        throw (error)
    }
}