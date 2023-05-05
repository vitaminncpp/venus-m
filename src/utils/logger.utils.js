import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      levelFirst: true,
      translateTime: true,
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;

export function debugInfo(data) {
  console.log(`${new Error().stack.split('\n')[2].trim()}::${JSON.stringify(data, null, 4)}`);
}