import SlakeEmoji from "./SlakeNotification/SlakeEmoji";
import SlakeNotification from "./SlakeNotification/SlakeNotification";
import * as path from "path";
import * as fs from "fs";
import { Response } from "express";

function writeLogToFile(log: any, file: string = "log", send_to_sale = true) {
  const logDirectory = "./logs";
  const date = formatDate(getDate(new Date())).substring(0, 10);
  const logFilePath = path.join(logDirectory, `${file}-error-${date}.log`);
  if (send_to_sale) {
    SlakeNotification(
      `${SlakeEmoji.DANGER} ALERT Type: ${file}:: ${JSON.stringify(log)}`,
    );
  }
  // Vérifier si le dossier "logs" existe, sinon le créer
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  fs.appendFile(
    logFilePath,
    `${getDateTime(new Date())} ::: ${log} \n`,
    (err) => {
      if (err) {
        console.error("Error writing log to file:", err);
      }
    },
  );
}

export const setResponse = (
  res: Response,
  message: string,
  status: number,
  data: object | any = {},
  logs: string | any = null,
  logsFileName: string | any = null,
): Response => {
  if (status === 500) {
    console.log(logs);
    writeLogToFile(logs, logsFileName);
  }
  return res
    .status(status)
    .json({ message: message, status: status, data: data })
    .end();
};

export const HttpStatus = {
  CONTINUE: { code: 100, message: "Continue" },
  SWITCHING_PROTOCOLS: { code: 101, message: "Switching Protocols" },
  SUCCESS: { code: 200, message: "Successful treatment with success" },
  CREATED: { code: 201, message: "Created" },
  ACCEPTED: { code: 202, message: "Accepted" },
  NON_AUTHORITATIVE_INFORMATION: {
    code: 203,
    message: "Non-Authoritative Information",
  },
  NO_CONTENT: { code: 204, message: "No Content" },
  RESET_CONTENT: { code: 205, message: "Reset Content" },
  PARTIAL_CONTENT: { code: 206, message: "Partial Content" },
  MULTIPLE_CHOICES: { code: 300, message: "Multiple Choices" },
  MOVED_PERMANENTLY: { code: 301, message: "Moved Permanently" },
  FOUND: { code: 302, message: "Found" },
  SEE_OTHER: { code: 303, message: "See Other" },
  NOT_MODIFIED: { code: 304, message: "Not Modified" },
  USE_PROXY: { code: 305, message: "Use Proxy" },
  TEMPORARY_REDIRECT: { code: 307, message: "Temporary Redirect" },
  PERMANENT_REDIRECT: { code: 308, message: "Permanent Redirect" },
  BAD_REQUEST: { code: 400, message: "Bad Request" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized" },
  PAYMENT_REQUIRED: { code: 402, message: "Payment Required" },
  FORBIDDEN: { code: 403, message: "Forbidden" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  METHOD_NOT_ALLOWED: { code: 405, message: "Method Not Allowed" },
  NOT_ACCEPTABLE: { code: 406, message: "Not Acceptable" },
  PROXY_AUTHENTICATION_REQUIRED: {
    code: 407,
    message: "Proxy Authentication Required",
  },
  REQUEST_TIMEOUT: { code: 408, message: "Request Timeout" },
  CONFLICT: { code: 409, message: "Conflict" },
  GONE: { code: 410, message: "Gone" },
  LENGTH_REQUIRED: { code: 411, message: "Length Required" },
  PRECONDITION_FAILED: { code: 412, message: "Precondition Failed" },
  PAYLOAD_TOO_LARGE: { code: 413, message: "Payload Too Large" },
  URI_TOO_LONG: { code: 414, message: "URI Too Long" },
  UNSUPPORTED_MEDIA_TYPE: { code: 415, message: "Unsupported Media Type" },
  RANGE_NOT_SATISFIABLE: { code: 416, message: "Range Not Satisfiable" },
  EXPECTATION_FAILED: { code: 417, message: "Expectation Failed" },
  MISDIRECTED_REQUEST: { code: 421, message: "Misdirected Request" },
  UNPROCESSABLE_ENTITY: { code: 422, message: "Unprocessable Entity" },
  LOCKED: { code: 423, message: "Locked" },
  FAILED_DEPENDENCY: { code: 424, message: "Failed Dependency" },
  TOO_EARLY: { code: 425, message: "Too Early" },
  UPGRADE_REQUIRED: { code: 426, message: "Upgrade Required" },
  PRECONDITION_REQUIRED: { code: 428, message: "Precondition Required" },
  TOO_MANY_REQUESTS: { code: 429, message: "Too Many Requests" },
  REQUEST_HEADER_FIELDS_TOO_LARGE: {
    code: 431,
    message: "Request Header Fields Too Large",
  },
  UNAVAILABLE_FOR_LEGAL_REASONS: {
    code: 451,
    message: "Unavailable For Legal Reasons",
  },
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
  NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
  BAD_GATEWAY: { code: 502, message: "Bad Gateway" },
  SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
  GATEWAY_TIMEOUT: { code: 504, message: "Gateway Timeout" },
  HTTP_VERSION_NOT_SUPPORTED: {
    code: 505,
    message: "HTTP Version Not Supported",
  },
  VARIANT_ALSO_NEGOTIATES: { code: 506, message: "Variant Also Negotiates" },
  INSUFFICIENT_STORAGE: { code: 507, message: "Insufficient Storage" },
  LOOP_DETECTED: { code: 508, message: "Loop Detected" },
  NOT_EXTENDED: { code: 510, message: "Not Extended" },
  NETWORK_AUTHENTICATION_REQUIRED: {
    code: 511,
    message: "Network Authentication Required",
  },
};
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const getDate = (dateParam: string | any) => {
  // Convert date
  return dateParam != undefined || dateParam != null
    ? dateParam
    : new Date().toISOString().split("T")[0];
};
function getName(fullname: string) {
  const tab = fullname.split(" ");
  if (tab.length === 1) {
    return tab[0];
  } else if (tab.length >= 2) {
    return tab[0] + " " + tab[1];
  }
}

const getDateTime = (dateTimeParam: Date | any = new Date()) => {
  const dateTime = dateTimeParam || new Date();
  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  const seconds = String(dateTime.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const sleepAction = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function NextDateTime(year = 0, month = 0, day = 0, minutes = 0, seconds = 0) {
  let today = new Date();
  return new Date(
    today.getFullYear() + year,
    today.getMonth() + month,
    today.getDate() + day,
    today.getHours(),
    today.getMinutes() + minutes,
    today.getSeconds() + seconds,
  );
}

function generateKey() {
  var key = "";

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      var randomDigit = Math.floor(Math.random() * 10);
      key += randomDigit;
    }

    if (i !== 3) {
      key += "-";
    }
  }

  return key;
}

function formaterNumeroTelephone(numero: string): string | null {
  // Supprimer les espaces et caractères non numériques
  let numeroSansCaracteresSpeciaux = numero.replace(/\D/g, "");

  // Vérifier la longueur du numéro
  if (
    numeroSansCaracteresSpeciaux.length !== 10 &&
    numeroSansCaracteresSpeciaux.length !== 12 &&
    numeroSansCaracteresSpeciaux.length !== 13
  ) {
    // Si la longueur n'est pas valide, retourner null
    return null;
  }

  // Préfixe par défaut
  let prefixe = "+243";

  // Si le numéro commence par "0", "00" ou "243", ajuster le préfixe
  if (numeroSansCaracteresSpeciaux.startsWith("00")) {
    // Supprimer les deux premiers caractères s'ils sont "00"
    numeroSansCaracteresSpeciaux = numeroSansCaracteresSpeciaux.slice(2);
  } else if (numeroSansCaracteresSpeciaux.startsWith("0")) {
    // Supprimer le premier caractère s'il est "0"
    numeroSansCaracteresSpeciaux = numeroSansCaracteresSpeciaux.slice(1);
  } else if (numeroSansCaracteresSpeciaux.startsWith("243")) {
    // Supprimer les trois premiers caractères s'ils sont "243"
    numeroSansCaracteresSpeciaux = numeroSansCaracteresSpeciaux.slice(3);
  }

  // Assembler le numéro avec le préfixe
  return `${prefixe}${numeroSansCaracteresSpeciaux}`;
}

const validateKey = (key: string | any): Boolean => {
  // Expression régulière pour vérifier le format de la clé
  const keyRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;

  // Vérifier si la clé correspond au format
  if (keyRegex.test(key)) {
    return true;
  } else {
    console.log("Clé invalide. Assurez-vous d'utiliser le format correct.");
    return false;
  }
};

export default {
  writeLogToFile,
  validateKey,
  generateKey,
  getDate,
  setResponse,
  HttpStatus,
};
