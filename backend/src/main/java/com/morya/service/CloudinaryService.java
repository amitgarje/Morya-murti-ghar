package com.morya.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
            "image/jpeg", "image/png", "image/jpg", "image/webp"
    );

    public String uploadImage(MultipartFile file) throws IOException {
        if (!ALLOWED_CONTENT_TYPES.contains(file.getContentType())) {
            throw new IllegalArgumentException("Invalid file type. Only JPG, PNG, and WebP are allowed.");
        }

        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", "morya-murti-ghar"
        ));
        
        return uploadResult.get("secure_url").toString();
    }

    public void deleteImageByUrl(String imageUrl) {
        try {
            // Extract publicId from URL (this is a simplified extraction based on standard Cloudinary URLs)
            // Example URL: https://res.cloudinary.com/demo/image/upload/v12345/morya-murti-ghar/sample.jpg
            String folder = "morya-murti-ghar/";
            if(imageUrl != null && imageUrl.contains(folder)) {
                String publicIdWithExt = imageUrl.substring(imageUrl.indexOf(folder));
                String publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            }
        } catch (Exception e) {
            // Log error but don't stop the application
            System.err.println("Failed to delete image from Cloudinary: " + e.getMessage());
        }
    }
}
