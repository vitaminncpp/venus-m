import {test} from "../test/controller.test.js";
import AWS from "aws-sdk";
import {debugInfo} from "../utils/logger.utils.js";


// TODO this is temporary function
export async function getEC2(req, res) {
  const ec2 = new AWS.EC2();
  ec2.describeInstances({}, (err, data) => {
    if (err) {
      debugInfo('Error:', err);
    } else {
      debugInfo('EC2 Instances:', data);
      return res.status(200).send(data)
    }
  });

  let data = undefined;

}