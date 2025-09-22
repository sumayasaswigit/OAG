package com.fsd.sdp.asthetica.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService service;
	
	@PostMapping("/checkuserlogin")
	public ResponseEntity<?> checkUserLogin(@RequestBody User user){
	    User u = service.checkuserlogin(user.getUsername(), user.getPassword());
	    try {
	    if(u != null) {
	        return ResponseEntity.ok(u);
	    } else {
	        System.out.println("Login Failed");
	        return ResponseEntity.status(401).body("Invalid Credentials");
	    }
	    }catch(Exception e) {
	    	return ResponseEntity.status(500).body("Login Failed"+e.getMessage());
	    }
	}
	
	@GetMapping("/getprofile")
	public ResponseEntity<?> getProfile(@RequestParam String username) {
		User user = service.getprofile(username);
		if(user != null) {
			return ResponseEntity.ok(user);
		}else {
			return ResponseEntity.status(404).body("User Data not Found !!");
		}
	}
	
	
	@PutMapping("/updateprofile")
	public ResponseEntity<?> updateProfile(@RequestBody User user){
		User u = service.updateProfile(user);
		if(u != null) {
			return ResponseEntity.ok(u);
		}else {
			return ResponseEntity.status(404).body("User Not Found");
		}
	}
	
	@GetMapping("/getusername/{cid}")
	public String getUsername(@PathVariable int cid) {
		return service.getusername(cid);
	}
	
	
}
