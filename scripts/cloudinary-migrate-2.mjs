import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config({ path: '.env.local' })

const __dirname = path.dirname(fileURLToPath(
    import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')
const dataDir = path.join(__dirname, '..', 'lib', 'data')
const componentsDir = path.join(__dirname, '..', 'components')
const appDir = path.join(__dirname, '..', 'app')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Root-level content images (skip icons/favicons/manifest/placeholders)
const rootFiles = ['logo.jpeg', 'l2.jpg', 'luxvi.jpg', 'image.png']

// Recursively collect files from public/images (blogs, home, etc.)
function collectFiles(dir, baseRelative) {
    let results = []
    const entries = fs.readdirSync(dir)
    for (const entry of entries) {
        const fullPath = path.join(dir, entry)
        const relativePath = `${baseRelative}/${entry}`
        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(collectFiles(fullPath, relativePath))
        } else {
            results.push({ fullPath, relativePath })
        }
    }
    return results
}

async function uploadImage(localPath, folder) {
    const result = await cloudinary.uploader.upload(localPath, {
        folder: `mahabaleshwar-villa-stays/${folder}`,
    })
    return result.secure_url
}

async function migrate() {
    const urlMap = {}

    // Root files
    for (const file of rootFiles) {
        const fullPath = path.join(publicDir, file)
        if (!fs.existsSync(fullPath)) continue
        const oldRelativePath = `/${file}`
        try {
            const newUrl = await uploadImage(fullPath, 'misc')
            urlMap[oldRelativePath] = newUrl
            console.log(`Uploaded: ${oldRelativePath}`)
        } catch (err) {
            console.log(`Failed: ${oldRelativePath} - ${err.message}`)
        }
    }

    // public/images (recursive)
    const imagesDir = path.join(publicDir, 'images')
    const imageFiles = collectFiles(imagesDir, '/images')

    for (const { fullPath, relativePath }
        of imageFiles) {
        const folder = relativePath.split('/').slice(1, -1).join('/') || 'images'
        try {
            const newUrl = await uploadImage(fullPath, folder)
            urlMap[relativePath] = newUrl
            console.log(`Uploaded: ${relativePath}`)
        } catch (err) {
            console.log(`Failed: ${relativePath} - ${err.message}`)
        }
    }

    fs.writeFileSync(
        path.join(__dirname, 'url-map-2.json'),
        JSON.stringify(urlMap, null, 2)
    )

    // Update all JSON files in lib/data
    const jsonFiles = fs.readdirSync(dataDir).filter((f) => f.endsWith('.json') && !f.includes('backup'))
    for (const jsonFile of jsonFiles) {
        const filePath = path.join(dataDir, jsonFile)
        let content = fs.readFileSync(filePath, 'utf-8')
        let changed = false
        for (const [oldPath, newUrl] of Object.entries(urlMap)) {
            if (content.includes(oldPath)) {
                content = content.split(oldPath).join(newUrl)
                changed = true
            }
        }
        if (changed) {
            fs.writeFileSync(filePath, content)
            console.log(`Updated: lib/data/${jsonFile}`)
        }
    }

    // Update .tsx files in components and app (e.g. NavBar logo)
    function updateTsxFiles(dir) {
        const entries = fs.readdirSync(dir)
        for (const entry of entries) {
            const fullPath = path.join(dir, entry)
            if (fs.statSync(fullPath).isDirectory()) {
                updateTsxFiles(fullPath)
            } else if (entry.endsWith('.tsx')) {
                let content = fs.readFileSync(fullPath, 'utf-8')
                let changed = false
                for (const [oldPath, newUrl] of Object.entries(urlMap)) {
                    if (content.includes(oldPath)) {
                        content = content.split(oldPath).join(newUrl)
                        changed = true
                    }
                }
                if (changed) {
                    fs.writeFileSync(fullPath, content)
                    console.log(`Updated: ${fullPath}`)
                }
            }
        }
    }

    updateTsxFiles(componentsDir)
    updateTsxFiles(appDir)

    console.log('Migration complete')
}

migrate()