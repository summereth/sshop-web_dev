import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js"

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
    res.send("auth user");
});

// @desc    Register a new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    res.send("register user");
});

// @desc    Logout a user & clear cookie
// @route   POST /api/users/logout
// @access  public
const logoutUser = asyncHandler(async (req, res) => {
    res.send("logout user");
});

// @desc    Get user's profile
// @route   GET /api/users/profile
// @access  private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get user's profile");
});

// @desc    Update user's profile
// @route   PUT /api/users/profile
// @access  private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("update user's profile");
});

// @desc    Get all users
// @route   GET /api/users/
// @access  private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send("get all users");
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send("user deleted");
});

// @desc    Get user by Id
// @route   GET /api/users/:id
// @access  private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send("get user by Id");
});

// @desc    Update user by Id
// @route   PUT /api/users/:id
// @access  private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send("update user");
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
  };