import formidable from "formidable";
import fs from "fs";
import https from "https";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';


const s3Client = new S3Client({
    endpoint: process.env.DO_SPACE_ENDPOINT,
    forcePathStyle: false,
    region: process.env.DO_SPACE_REGION,
    credentials: {
        accessKeyId: process.env.DO_SPACE_CREDENTIALS_ACCESS,
        secretAccessKey: process.env.DO_SPACE_CREDENTIALS_SECRET
    }
});

const uploadFile = async (files) => {
    try {
         await s3Client.send(new PutObjectCommand({
            Bucket: process.env.DO_SPACE_BUCKET,
            Key: files.originalFilename,
            Body: fs.createReadStream(files.filepath),
            ACL: "public-read",
            }));
        return "https://pokerimages.ams3.digitaloceanspaces.com/" + files.originalFilename
    } catch (err) {
        console.log("Error", err);
    }
};


// Step 5: Call the uploadObject function.



export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req, res) => {
    let fullImageSrc;
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
         if (fields.file !== "Default"){
            fullImageSrc = await uploadFile(files.file, fields.clubName);
        } else {
            fullImageSrc = "/static/placeholder.png"
        }
            const club = await fetch(`${process.env.URL_API}/Club`, {
            body: JSON.stringify({
                ownerId: fields.memberId,
                name : fields.clubName,
                pictureUrl: fullImageSrc,
                public: fields.isPrivate === "false"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + fields.token,
            },
            agent: httpsAgent,
            method: 'POST',
        }).then(function (respo){
            if (respo.status === 201){
                return res.status(201).send("");
            } else{
                return res.status(403).send("");
            }
        })
    });
};

const get = async (req, res) => {
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    await fetch(`${process.env.URL_API}/Club/public`,{
        agent: httpsAgent,
    }).then((res) => res.json())
        .then(async (data) => {
            for (let club of data) {
                await fetch(`${process.env.URL_API}/Club/ClubId/${club.clubId}/members`, {agent: httpsAgent}).then((res) => res.json())
                    .then(async (members) => {
                        club.totalMembers = members.length
                    })
            }
            return res.status(200).json(data);
        })

}

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "GET"
            ? get(req, res)
            : res.status(404).send("");

};
