import httpStatus from "http-status";
import ApiError from "../../utils/errors/ApiError.js";
import { Organizer } from "../models/index.js";
import { catchAsync, sendResponse } from "../../utils/helpers/global/index.js";
import { compareString } from "../../utils/helpers/bcrypt/index.js";
import { generateToken } from "../../utils/helpers/jwt/index.js";

// sass signin controller
const Signin = catchAsync(async (req, res) => {

    // parsing data
    const body = JSON.parse(req.body.data);
    const { email, password: reqPassword } = body;

    // checking email and password given
    if (!email || !reqPassword)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Data not found!');

    // finding user
    const findOrgnizer = await Organizer.isOrganizerExistsByEmail(email);
    if (!findOrgnizer)
        throw new ApiError(httpStatus.NOT_FOUND, 'You are not a registered user!');

    // checking is organizer accepted invitation
    if (!findOrgnizer.isEmailVerified)
        throw new ApiError(httpStatus.NOT_FOUND, 'Accept your invitaion & try again!');

    // checking is valid password
    const isValidPassword = await compareString(reqPassword, findOrgnizer.password);
    if (!isValidPassword)
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Credential mismatch!');

    // generating token
    const token = generateToken(findOrgnizer);

    // user data to send with response
    const { password, ...pwd } = findOrgnizer;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login Success!',
        data: {
            accessToken: token,
            _id: pwd._id,
            name: pwd.name,
            surname: pwd.surname,
        },
    });
}
)

// profile of logged User
const Profile = catchAsync(
    async (req, res) => {

        // finding profile data
        const data = await Organizer.findById(req.user?._id).select("-password");

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Profile retrieved successfully!',
            data,
        });
    }
)

export default {
    Signin,
    Profile,
};