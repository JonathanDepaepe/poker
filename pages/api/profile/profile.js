import formidable from "formidable";
import fs from "fs";
import https from "https";

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
            fullImageSrc = await saveFile(files.file, fields.nickname);
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
            if (respo.status === 201) {
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
