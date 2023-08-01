package com.example.userManagementWithMongoDB.service;

import com.example.userManagementWithMongoDB.data.User;
import com.example.userManagementWithMongoDB.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    public List<User> getAllUser(){
        List<User> user = userRepository.findAll();
        return user;
    }
    public User createUser(User user){

        return userRepository.save(user);
    }
    public User updateUser(User user){

        return userRepository.save(user);
    }
    public void deleteUserById(@PathVariable String id){
        userRepository.deleteById(id);
    }
}
