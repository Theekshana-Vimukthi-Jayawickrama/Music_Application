package com.Tune.Book.Tune.Book.auth;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return  ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        try{
            return ResponseEntity.ok(authenticationService.authenticate(request));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }

    }
    @PutMapping("/updateUser/{id}")
    public ResponseEntity<?> update(
            @RequestBody String request,
            @PathVariable String id
    ){
        try{
            authenticationService.authenticateUpdate(request,id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("updatePassword/{email}")
    public  ResponseEntity<?> updatePassword(
            @PathVariable String email,
            @RequestBody ChangePasswordRequest changePasswordRequest){
        try{
            authenticationService.changePassword(email,changePasswordRequest);
            return ResponseEntity.ok("Updated");
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }

    }
}
