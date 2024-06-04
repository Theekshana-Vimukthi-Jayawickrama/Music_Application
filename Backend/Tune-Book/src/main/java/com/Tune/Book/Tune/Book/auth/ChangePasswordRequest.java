package com.Tune.Book.Tune.Book.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChangePasswordRequest {
    private String email;
    private String password;
    private String confirmPassword;
}
