import cloudinaryModule from 'cloudinary';
const { v2: cloudinary } = cloudinaryModule;

const cloudinaryConnect = async () => {
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

};

export default cloudinaryConnect;
