package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.dto.request.UserReqDTO;
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

    User findUserAuthenticated();
    void deleteUserById(User user);
    List<User> findAllUser();
    User findUserById(UUID id);

    void updateById(UUID id, UserReqDTO req);

    void makeHomeResponsible(UUID id);

    void patchRole(User user, Role role);
    User findOneByIdentifier(String identifier);

}
