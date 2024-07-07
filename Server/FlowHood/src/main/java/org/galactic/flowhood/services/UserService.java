package org.galactic.flowhood.services;

import org.galactic.flowhood.domain.dto.request.UserReqDTO;
import org.galactic.flowhood.domain.dto.response.UserRegisterDTO;
import org.galactic.flowhood.domain.dto.response.UserResDTO;
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

    boolean hasUserRole(User user, String roleId);

    UserRegisterDTO getUserInformation(String token);
    UserResDTO findUserAuthenticated();
    void deleteUser(User user);
    List<UserResDTO> findAllUser();
    User findUserById(UUID id);
    UserResDTO findUserByIdDto(UUID id);
    User findUserByEmail(String email);

    boolean existUserByEmail(String email);

    User createUser(User user);

    User updateUser(User user);

    User toggleRole(User user, String role);
    User findOneByIdentifier(String identifier);
    void addRole(User user, Role role);

    List<User> findUsersByIds(List<UUID> residentIds);
}
