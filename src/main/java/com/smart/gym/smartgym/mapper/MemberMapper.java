package com.smart.gym.smartgym.mapper;

import com.smart.gym.smartgym.dto.MemberRequestDTO;
import com.smart.gym.smartgym.dto.MemberResponseDTO;
import com.smart.gym.smartgym.model.Member;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {
    MemberResponseDTO toDTO(Member member);

    List<MemberResponseDTO> toDTOList(List<Member> members);

    Member toEntity(MemberRequestDTO requestDTO);
}