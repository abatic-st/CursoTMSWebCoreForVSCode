import { UserDto } from "../dto/users/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserMapper {

    dtoToEntity(userDTO: UserDto): UserEntity {
        return new UserEntity(userDTO.id, userDTO.createdat, userDTO.updatedat, userDTO.name, userDTO.lastname,
            userDTO.email, userDTO.password, userDTO.active, userDTO.salt);
    }

    entityToDto(userEntity: UserEntity): UserDto {
        return new UserDto(userEntity.id, userEntity.createdat, userEntity.updatedat, userEntity.name, userEntity.lastname,
            userEntity.email, userEntity.password, userEntity.active, userEntity.salt);
    }

}