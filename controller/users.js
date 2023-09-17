const User = require("../models/User");
const userService = require("../service/user");
const authServices = require("../service/auth");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter,sort,pagination,select
   */

  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserByID = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;
  try {
    const user = await authServices.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const putUserById = async(req, res, next) => {
    const {userId} = req.params
    const {name,email,roles,accountStatus} = req.body
    try{
        const user = await userService.updateUser(userId,{name,email,roles,accountStatus})
        if(!user){
            throw error('User not found',404)
        }
        res.status(200).json({user})
    } catch(e){
        next(e)
    }
};

const patchUserById = async(req, res, next) => {
    const {userId} = req.params
    const {name,roles,accountStatus} = req.body
    try {
      const  user = await userService.findUserByProperty('_id',userId)
        if(!user) {
            throw error('User not found',404)
        }
        user.name = name ?? user.name
        user.roles = roles ?? user.roles
        user.accountStatus = accountStatus ?? user.accountStatus
        await user.save()
        return res.status(200).json(user)
    } catch(e){
        next(e)
    }
};

const deleteUSerById = async (req, res, next) => {
  /**
     * user id = find user by user id

        if user not found ;

        return 400 error

        else 

        delete user from DB
        delete all associated data
        return 203 status
     */
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }
    await user.deleteOne();
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUsers,
  getUserByID,
  postUser,
  putUserById,
  patchUserById,
  deleteUSerById,
};
