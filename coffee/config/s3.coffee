knox = require("knox")
secrets = {}

# load AWS credentials
if ( process.env.NODE_ENV == "production" )
  secrets.aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;
  secrets.aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;
else
  secrets = require("./secrets.js");

# initialize S3
s3 = knox.createClient({
  key: secrets.aws_access_key_id,
  secret: secrets.aws_secret_access_key,
  bucket: 'fimo'
})


# s3Url = "http://fimo.s3.amazonaws.com/"

module.exports = s3;