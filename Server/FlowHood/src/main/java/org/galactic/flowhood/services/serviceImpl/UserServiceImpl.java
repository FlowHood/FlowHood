package org.galactic.flowhood.services.serviceImpl;

import jakarta.transaction.Transactional;
import org.galactic.flowhood.domain.dto.response.UserRegisterDTO;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.Token;
import org.galactic.flowhood.domain.entities.User;
import org.galactic.flowhood.repository.TokenRepository;
import org.galactic.flowhood.repository.UserRepository;
import org.galactic.flowhood.services.UserService;
import org.galactic.flowhood.utils.JWTTools;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    final
    UserRepository userRepository;

    final
    TokenRepository tokenRepository;

    final
    JWTTools jwtTools;

    final RestTemplate restTemplate;

    public UserServiceImpl(UserRepository userRepository, TokenRepository tokenRepository, JWTTools jwtTools, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.jwtTools = jwtTools;
        this.restTemplate = restTemplate;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Token registerToken(User user) throws Exception {
        cleanTokens(user);

        String tokenString = jwtTools.generateToken(user);
        Token token = new Token(tokenString, user);

        tokenRepository.save(token);

        return token;
    }

    @Override
    public Boolean isTokenValid(User user, String token) {
        try {
            cleanTokens(user);
            List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

            tokens.stream()
                    .filter(tk -> tk.getContent().equals(token))
                    .findAny()
                    .orElseThrow(() -> new Exception());

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void cleanTokens(User user) throws Exception {
        List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

        tokens.forEach(token -> {
            if (!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                tokenRepository.save(token);
            }
        });

    }

    @Override
    public UserRegisterDTO getUserInformation(String token) {
        String url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+token;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");

        HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);
        ResponseEntity<Object> response = restTemplate.exchange(url, HttpMethod.GET, requestEntity, Object.class);

        if(response.getStatusCode() != HttpStatus.OK) {
            throw new RuntimeException("Failed to get user information from Google OAuth2");
        }

        System.out.println(requestEntity);

        UserRegisterDTO user = new UserRegisterDTO();
        user.setEmail((String) ((Map)response.getBody()).get("name"));
        user.setLastname((String) ((Map)response.getBody()).get("family_name"));
        user.setEmail((String) ((Map) response.getBody()).get("email"));

        return user;
    }

    @Override
    public User findUserAuthenticated() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findFirstByEmail(username).orElse(null);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User findUserById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findFirstByEmail(email).orElse(null);
    }

    @Override
    public boolean existUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User makeHomeResponsible(User user, House house) {
        List<House> usersHouses = user.getHouses();
        if (!usersHouses.contains(house)) {
            usersHouses.add(house);
            user.setHouses(usersHouses);
            return userRepository.save(user);
        } else {
            return user;
        }
    }

    @Override
    public User patchRole(User user, Role role) {
        List<Role> roles = user.getRoles();
        if (!roles.contains(role))
            roles.add(role);
        else
            roles.remove(role);

        user.setRoles(roles);
        return userRepository.save(user);
    }

    @Override
    public User findOneByIdentifier(String identifier) {
        return userRepository.findFirstByEmail(identifier).orElse(null);
    }


    @Override
    public void addRole(User user, Role role) {
        List<Role> roles = user.getRoles();
        if (!roles.contains(role))
            roles.add(role);
        user.setRoles(roles);
        userRepository.save(user);
    }

}
