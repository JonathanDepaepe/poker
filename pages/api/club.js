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
            fullImageSrc = await saveFile(files.file, fields.clubName);
        } else {
            fullImageSrc = "/public/images/placeholder.png"
        }
        const club = await fetch('https://pokermanager.games/api/Club', {
            body: JSON.stringify({
                ownerId: fields.memberId,
                name : fields.clubName,
                pictureUrl: fullImageSrc,
                public: fields.isPrivate !== "on"
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
    await fetch("https://pokermanager.games/api/Club/public",{
        agent: httpsAgent,
    }).then((res) => res.json())
        .then((data) => {
            return res.status(200).json(data);
        })

}

const saveFile = async (file, clubName) => {
    const imageSRC = file.originalFilename.split(".").pop()
    const fullImageSrc = `/static/${clubName}${Math.floor(Math.random() * 100)}.${imageSRC}`
    console.log(imageSRC);
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync("./public"+fullImageSrc, data);
    await fs.unlinkSync(file.filepath);
    return fullImageSrc ;
};

export default (req, res) => {
    req.method === "POST"
        ? post(req, res)
        : req.method === "GET"
            ? get(req, res)
            : res.status(404).send("");

};
