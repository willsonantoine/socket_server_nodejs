import vars from "../../utils/vars";
import RequestModel from "../models/request.model";
import UsersModel from "../models/users.model";

const save_request = async (arg: {
  reference: string;
  msg: { message: any; token: string };
}): Promise<string | null> => {
  try {
    const { reference, msg } = arg;
    const user = await UsersModel.findOne({ where: { token: msg.token } });
    if (user) {
      const result = await RequestModel.create({
        reference,
        message: msg.message,
        UserId: user.id,
      });
      await user.update({ sessionId: reference });
      return "Message recue";
    } else {
      return "User not found on this server";
    }
  } catch (error: any) {
    console.log(error.message);
    vars.writeLogToFile(error, "save_requestF");
    return "An internal error has occurred";
  }
};

export default { save_request };
