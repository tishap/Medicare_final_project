// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {

    // Mapping to store registered patient and doctor addresses
    mapping(address => bool) public registeredPatients;
    mapping(address => bool) public registeredDoctors;

    // Mapping to store doctor addresses and their whitelisted users
    mapping(address => mapping(address => bool)) public allowedUsers;

    // Mapping to store users who have granted access to specific doctors
    mapping(address => address[]) public usersWhitelistedForDoctor;

    // Event to log when a user is whitelisted by a doctor
    event UserWhitelisted(address indexed doctor, address indexed user);

    // Event to log when access is revoked for a user by a doctor
    event AccessRevoked(address indexed doctor, address indexed user);

    // Event to log when a patient is registered
    event PatientRegistered(address indexed patient);

    // Event to log when a doctor is registered
    event DoctorRegistered(address indexed doctor);

    // Function to register a patient
    function registerPatient() public {
        require(!registeredPatients[msg.sender], "Patient already registered");
        registeredPatients[msg.sender] = true;
        emit PatientRegistered(msg.sender);
    }

    // Function to register a doctor
    function registerDoctor() public {
        require(!registeredDoctors[msg.sender], "Doctor already registered");
        registeredDoctors[msg.sender] = true;
        emit DoctorRegistered(msg.sender);
    }

    // Function to whitelist a user by a doctor
    function whitelistUser(address doctor, address user) public {
        require(registeredDoctors[doctor], "Doctor not registered");
        require(registeredPatients[user], "User not registered");
        require(msg.sender == user, "Only patient can whitelist users");
        allowedUsers[doctor][user] = true;
        usersWhitelistedForDoctor[doctor].push(user);
        emit UserWhitelisted(doctor, user);
    }

    // Function to check if a user is whitelisted by a doctor
    function isWhitelisted(address doctor, address user) public view returns (bool) {
        return allowedUsers[doctor][user];
    }

    // Function to revoke access for a user by a doctor
    function revokeAccess(address doctor, address user) public {
    require(registeredDoctors[doctor], "Doctor not registered");
    require(registeredPatients[user], "User not registered");
    require(msg.sender == user, "Only patient can revoke access");
    allowedUsers[doctor][user] = false;

    // Remove the user address from the usersWhitelistedForDoctor array
    address[] storage users = usersWhitelistedForDoctor[doctor];
    for (uint i = 0; i < users.length; i++) {
        if (users[i] == user) {
            // Shift elements to the left to overwrite the user address
            for (uint j = i; j < users.length - 1; j++) {
                users[j] = users[j + 1];
            }
            // Remove the last element
            users.pop();
            break;
        }
    }

    emit AccessRevoked(doctor, user);
}

    // Function to get the list of users whitelisted for a specific doctor
    function getUsersWhitelistedForDoctor(address doctor) public view returns (address[] memory) {
        return usersWhitelistedForDoctor[doctor];
    }
}
