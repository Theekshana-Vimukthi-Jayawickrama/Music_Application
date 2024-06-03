package com.Tune.Book.Tune.Book.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserResponse {
    private String userName;
    private String fullName;
    private String role;
    private String id;
}
