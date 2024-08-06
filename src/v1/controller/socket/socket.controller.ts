import requestController from "../request.controller";

const request = async (msg: any, socket_infos: { id: string }) => {
  const response = await requestController.save_request({
    msg: msg,
    reference: socket_infos.id,
  });
  console.log("Incomming message : ", msg.message, " :: Response:: ", response);

  return response;
};

export default { request };
