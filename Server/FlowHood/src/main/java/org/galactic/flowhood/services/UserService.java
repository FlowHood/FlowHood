package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.dto.request.UserReqDTO;
import org.galactic.flowhood.domain.dto.response.UserRegisterDTO;
import org.galactic.flowhood.domain.entities.House;
import org.galactic.flowhood.domain.entities.Role;
import org.galactic.flowhood.domain.entities.Token;
import org.galactic.flowhood.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    //Token management
    Token registerToken(User user) throws Exception;
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;


    UserRegisterDTO getUserInformation(String token);
    User findUserAuthenticated();
    void deleteUser(User user);
    List<User> findAllUser();
    User findUserById(UUID id);
    User findUserByEmail(String email);

    boolean existUserByEmail(String email);

    User createUser(User user);

    User updateUser(User user);

    User makeHomeResponsible(User user, House house);

    User patchRole(User user, Role role);
    User findOneByIdentifier(String identifier);
    void addRole(User user, Role role);


}
