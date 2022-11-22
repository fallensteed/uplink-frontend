import istFormModel from "./istFormModel";
const {
    formField: {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        gender,
        race,
        ethnicity,
        comPhone,
        dsnPhone,
        officialEmail,
        personalEmail,
    },
} = istFormModel;

export default {
    [firstName.name]: "",
    [middleName.name]: "",
    [lastName.name]: "",
    [dateOfBirth.name]: "",
    [gender.name]: "",
    [race.name]: "",
    [ethnicity.name]: "",
    [comPhone.name]: "",
    [dsnPhone.name]: "",
    [officialEmail.name]: "",
    [personalEmail.name]: "",
};
