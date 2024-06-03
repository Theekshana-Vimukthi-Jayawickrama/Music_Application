package com.Tune.Book.Tune.Book;

import com.Tune.Book.Tune.Book.User.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@SpringBootApplication
public class TuneBookApplication implements CommandLineRunner {
	@Autowired
	private final RoleRepository roleRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

    public TuneBookApplication(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public static void main(String[] args) {
		SpringApplication.run(TuneBookApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Optional<UserRole> adminAccount = roleRepository.findByName(Role.ADMIN);
		Optional<User> userAdmin = userRepository.findByUserName("admin@gmail.com");



		List<UserRole> allRoles = roleRepository.findAll();
		List<Role> role = Arrays.stream(Role.values()).toList();
		for (Role userRole : role) {
			if(allRoles.stream().allMatch(userRoles -> userRoles.getName() != userRole )){
				UserRole userRoles = UserRole.builder()
						.name(userRole)
						.build();
				roleRepository.save(userRoles);
			}
		}
		if(userAdmin.isEmpty()){

			User user = new User();
			user.setRole(Role.SUPERADMIN);
			user.setUserName("admin@gmail.com");
			user.setEmail("admin@gmail.com");
			user.setFullName("Default Admin");
			user.setPassword(passwordEncoder.encode("admin1234"));
			userRepository.save(user);
		}

	}



}
