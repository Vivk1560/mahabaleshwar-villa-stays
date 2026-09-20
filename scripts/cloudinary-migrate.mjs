import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: '.env.local' })

const __dirname = path.dirname(fileURLToPath(
    import.meta.url))
const villaImagesDir = path.join(__dirname, '..', 'public', 'villaImages')
const villasJsonPath = path.join(__dirname, '..', 'lib', 'data', 'villas.json')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function uploadImage(localPath, folder) {
    const result = await cloudinary.uploader.upload(localPath, {
        folder: `mahabaleshwar-villa-stays/${folder}`,
    })
    return result.secure_url
}

async function migrate() {
    const villaFolders = fs.readdirSync(villaImagesDir).filter((name) =>
        fs.statSync(path.join(villaImagesDir, name)).isDirectory()
    )

    const urlMap = {}

    for (const folder of villaFolders) {
        const folderPath = path.join(villaImagesDir, folder)
        const files = fs.readdirSync(folderPath)

        for (const file of files) {
            const localPath = path.join(folderPath, file)
            const oldRelativePath = `/villaImages/${folder}/${file}`

            try {
                const newUrl = await uploadImage(localPath, folder)
                urlMap[oldRelativePath] = newUrl
                console.log(`Uploaded: ${oldRelativePath}`)
            } catch (err) {
                console.log(`Failed: ${oldRelativePath} - ${err.message}`)
            }
        }
    }

    fs.writeFileSync(
        path.join(__dirname, 'url-map.json'),
        JSON.stringify(urlMap, null, 2)
    )

    let villasContent = fs.readFileSync(villasJsonPath, 'utf-8')
    for (const [oldPath, newUrl] of Object.entries(urlMap)) {
        villasContent = villasContent.split(oldPath).join(newUrl)
    }

    fs.writeFileSync(villasJsonPath, villasContent)
    console.log('villas.json updated with Cloudinary URLs')
}

migrate()