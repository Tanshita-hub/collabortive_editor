package com.example.collabortive_editor.service;

import com.example.collabortive_editor.entity.User;
import com.example.collabortive_editor.repository.UserRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String processGoogleUser(OAuth2User oauthUser) {

        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        if (email == null) {
            throw new RuntimeException("Google email not available");
        }

        var existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            return "login";
        }

        User user = new User(name, email, "GOOGLE");
        userRepository.save(user);

        return "created";
    }
}