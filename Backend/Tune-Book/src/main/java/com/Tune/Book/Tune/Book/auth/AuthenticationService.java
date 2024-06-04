package com.Tune.Book.Tune.Book.auth;

import com.Tune.Book.Tune.Book.User.Role;
import com.Tune.Book.Tune.Book.User.User;
import com.Tune.Book.Tune.Book.User.UserRepository;
import com.Tune.Book.Tune.Book.admin.UserResponse;
import com.Tune.Book.Tune.Book.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail().trim().toLowerCase())
                .userName(request.getEmail().trim().toLowerCase())
                .role(Role.ADMIN)
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return  AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserName(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByUserName(request.getUserName()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return  AuthenticationResponse.builder()
                .id(user.getId())
                .role(user.getRole().toString())
                .token(jwtToken)
                .build();
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserResponse> userResponseList = new ArrayList<>();
        for(User user: users){
            UserResponse userResponse = UserResponse.builder()
                    .id(user.getId())
                    .fullName(user.getFullName())
                    .userName(user.getUsername())
                    .role(user.getRole().toString())
                    .build();
            userResponseList.add(userResponse);
        }
        return userResponseList;
    }

    public void removeUser(String id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            userRepository.delete(user.get());
        }
    }

    public void authenticateUpdate(String request,String id) {

        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            if(request != null){
                user.get().setFullName(request);
            }

            userRepository.save(user.get());
        }

    }

    public void changePassword(String email, ChangePasswordRequest changePasswordRequest) {
        Optional<User> user = userRepository.findByUserName(email);
        if(user.isPresent()){
            if(Objects.equals(changePasswordRequest.getConfirmPassword(), changePasswordRequest.getPassword()) && Objects.equals(user.get().getUsername(), changePasswordRequest.getEmail())){
                user.get().setPassword(changePasswordRequest.getPassword());
                userRepository.save(user.get());
            }
        }

    }
}
