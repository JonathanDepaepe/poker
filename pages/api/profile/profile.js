import formidable from "formidable";
import fs from "fs";
import https from "https";
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

export const config = {
    api: {
        bodyParser: false
    }
};


const s3Client = new S3Client({
    endpoint: "https://ams3.digitaloceanspaces.com",
    forcePathStyle: false,
    region: "ams3",
    credentials: {
        accessKeyId: "DO00GZP3NZNZCE9RP4M6",
        secretAccessKey: "TrObRgMfGfIV6qy4ZJhrUz8TShXIgtE+To4oyD+N8DA"
    }
});

const uploadProfile = async (files) => {
    try {
        await s3Client.send(new PutObjectCommand({
            Bucket: "pokerimages",
            Key: "profiles/" + files.originalFilename,
            Body: fs.createReadStream(files.filepath),
            ACL: "public-read",
        }));
        return "https://pokerimages.ams3.digitaloceanspaces.com/profiles/" + files.originalFilename
    } catch (err) {
        console.log("Error", err);
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
            fullImageSrc = await uploadProfile(files.file, fields.nickname);
        } else {
            fullImageSrc = "/static/profile/logo.png"
        }
        await fetch('https://pokermanager.games/api/User/update', {
            body: JSON.stringify({
                memberId: fields.memberId,
                email: fields.email,
                name: "string",
                profilePictureUrl: fullImageSrc,
                nickname: fields.nickname
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + fields.token,
            },
            agent: httpsAgent,
            method: 'PUT',
        }).then(async function (respo) {
            if (respo.status === 202) {
                return res.status(201).send("");
            } else {
                return res.status(403).send("");
            }
        })


    });
};

const saveFile = async (file, nickname) => {
    const imageSRC = file.originalFilename.split(".").pop()
    const fullImageSrc = `/static/profile/${nickname}${Math.floor(Math.random() * 100)}.${imageSRC}`
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync("./public"+fullImageSrc, data);
    await fs.unlinkSync(file.filepath);
    return fullImageSrc ;
};

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
            : res.status(404).send("");

};
