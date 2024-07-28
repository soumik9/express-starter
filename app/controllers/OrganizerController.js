import ApiError from "../../utils/errors/ApiError.js";
import httpStatus from "http-status";
import catchAsync from "../../utils/helpers/global/catchAsync.js";
import sendResponse from "../../utils/helpers/global/sendResponse.js";
import pick from "../../utils/helpers/transforms/pick.js";
import Organizer from "../models/OrganizerSchema.js";

// filering and searhing constant
export const organizerFilterableFields = ['isEmailVerified'];

// create new organizer to a business controller
const CreateNewOrganizerToSentInviteToAddUnderBusiness = catchAsync(async (req, res) => {

    // parsing data
    const organizerData = req.body && req.body.data ? JSON.parse(req.body.data) : {};

    // check organizer profile exists with any business by email
    const findOrgnizer = await Organizer.isOrganizerExistsByEmail(organizerData.email);
    if (findOrgnizer)
        throw new ApiError(httpStatus.NOT_FOUND, 'Already an employee of a business profile!');

    // saving role info
    const data = await Organizer.create({ ...organizerData });

    // if (data._id) {
    // email template with invitation link
    // const mailTemp = await mailTeamplates.sassInvitationEmailTemp(String(data._id), req);

    // // sending invitation
    // await sendMail({
    //     email: organizerData.email,
    //     subject: String(config.SENDER_EMAIL_ID),
    //     content: mailTemp,
    // })
    // }

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Organizer invitation sent successfully!`,
        data,
    });
}
)

// get all organizers under a business
const GetOrganizersUnderBusiness = catchAsync(async (req, res) => {

    // filter data pick
    const andConditions = [];
    const filtersData = pick(req.query, organizerFilterableFields);

    // if any filterable query make it on object
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    // finalizing condition & find data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const data = await Organizer.find(whereConditions);
    const total = await Organizer.find().countDocuments();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Organizers retrived successfully!`,
        meta: {
            total,
            showingTotal: data.length,
        },
        data,
    });
}
)

// get single organizer under business
const GetOrganizerById = catchAsync(async (req, res) => {

    const organizerId = req.params.organizerId;
    const data = await Organizer.findOne({ _id: organizerId }).select("-password");

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Organizer retrived successfully!`,
        data,
    });
}
)

// organizer update under business controller
const UpdateOrganizerUnderBusiness = catchAsync(async (req, res) => {

    // parsing data and params
    const organizerId = req.params.organizerId;
    const body = req.body && req.body.data ? JSON.parse(req.body.data) : {};

    // Check if a organizer exists or not
    const existsOrganizer = await Organizer.isOrganizerExistsById(organizerId, "_id");
    if (!existsOrganizer)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Organizer not found.');

    // updating role info
    const data = await Organizer.findOneAndUpdate({ _id: organizerId }, {
        $set: body
    }, { new: true, runValidators: true })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Organizer updated successfully!`,
        data,
    });
}
)

// delete organizer
const DeleteOrganizer = catchAsync(async (req, res) => {

    const organizerId = req.params.organizerId;

    // Check if a organizer exists or not
    const existsOrganizer = await Organizer.isOrganizerExistsById(organizerId, "_id");
    if (!existsOrganizer)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Organizer not found.');

    await Organizer.deleteOne({ _id: organizerId })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Organizer deleted successfully!`,
    });
}
)

export default {
    CreateNewOrganizerToSentInviteToAddUnderBusiness,
    GetOrganizersUnderBusiness,
    GetOrganizerById,
    UpdateOrganizerUnderBusiness,
    DeleteOrganizer,
};