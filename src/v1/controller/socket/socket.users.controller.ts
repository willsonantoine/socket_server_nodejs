import vars from "../../../utils/vars";
import SessionSocket from "../../models/session.socket.model";

const save_session = async (arg: { id: string; ip: string }) => {
  try {
    const { id, ip } = arg;
    const current_ip = ip.replace("::ffff:", "");
    const exist = await SessionSocket.findOne({
      where: { reference: id, ip: current_ip },
    });
    if (!exist) {
      const result = await SessionSocket.create({
        reference: id,
        ip: current_ip,
      });
      console.log("New Users devise Detected :: ", id);
      console.log("IP :: ", current_ip);
      console.log("------------------------------");
    } else {
      console.log("Users devise exist :: ", id);
    }
  } catch (error) {
    vars.writeLogToFile(error, "save-session");
  }
};

export default { save_session };
