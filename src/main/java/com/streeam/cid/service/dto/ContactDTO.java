package com.streeam.cid.service.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Data
public class ContactDTO implements Serializable {

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    @Email
    @Size(min = 5, max = 254)
    private String email;

    private String phone;

    private String message;

    @Override
    public String toString() {
        return "ContactDTO{" +
            ", first name ='" + getFirstName() + "'" +
            ", last name='" + getLastName() + "'" +
            ", email ='" + getEmail() + "'" +
            ", phone =" + getPhone() +
            "}";
    }
}
