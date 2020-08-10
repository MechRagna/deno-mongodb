interface errorResp {
  code: string | number;
  message: string;
  stack: any;
  isOwnError: boolean;
  originCode: string | number;
  source: string;
}

const mongoError = (error: any): errorResp => {
  const codeI: number = error.message.search("code:");
  const codeNum: string = error.message.substr(codeI + 5, 5);
  return {
    code: "DB_MONGO_ERROR",
    message: error.message,
    stack: error.stack,
    isOwnError: true,
    originCode: parseInt(codeNum.trim()),
    source: "mongodb-common-util",
  };
};

export { mongoError };
