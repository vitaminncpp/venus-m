import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY
});

AWS.config.update({region: 'us-east-1'});
