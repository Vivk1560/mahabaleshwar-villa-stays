export default function cloudinaryLoader({ src, width, quality }) {
    if (!src.includes("res.cloudinary.com") || !src.includes("/upload/")) {
        return src
    }
    const q = quality ? `q_${quality}` : "q_auto"
    return src.replace("/upload/", `/upload/f_auto,${q},w_${width}/`)
}