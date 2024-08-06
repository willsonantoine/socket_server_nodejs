import vars from "../vars";

const axios = require("axios");
const SlakeNotification = (text: string) => {
  let data = JSON.stringify({
    channel: process.env.SLAKE_CHANNEL,
    text: text,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://hooks.slack.com/services/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",
    headers: {
      "Content-Type": "application/json",
      "Accept-Charset": "application/json",
      Authorization: `Bearer ${process.env.SLAKE_TOKEN}`,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response: any) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error: any) => {
      console.log(error.message);
      vars.writeLogToFile(error, "SLAKE_NOTIFICATION", false);
    });
};

export default SlakeNotification;
