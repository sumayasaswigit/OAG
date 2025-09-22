package com.fsd.sdp.asthetica.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fsd.sdp.asthetica.enumeration.Role;
import com.fsd.sdp.asthetica.model.Order;
import com.fsd.sdp.asthetica.model.User;
import com.fsd.sdp.asthetica.repository.OrderRepository;
import com.fsd.sdp.asthetica.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository repository;
	@Autowired
	private OrderRepository orderRepository;
	
	@Override
	public String adduser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		repository.save(user);
		return "User Registered Successfully";
	}

	@Override
	public User checkuserlogin(String username, String password) {
		User user = repository.findByUsername(username);
		if(user != null && passwordEncoder.matches(password, user.getPassword())) {
			return user;
		}
		return null;
	}

	@Override
	public List<User> displayusers() {
		List<User> users = repository.findAll();
		List<User> filteredUsers = users.stream()
			 							.filter(user -> user.getRole().equals(Role.BUYER) || user.getRole().equals(Role.SELLER))
			 							.collect(Collectors.toList());
		
		return filteredUsers;
	}

	@Override
	public String deleteuser(int cid) {
		Optional<User> user=repository.findById(cid);
		if(user.isPresent()) {
			repository.deleteById(cid);
			return "User Deleted Successfully";
		}else {
			return "User Id Not Found";
		}
		
	}

	@Override
	public User getprofile(String username) {
		User user = repository.findByUsername(username);
		return user;
	}

	@Override
	public User updateProfile(User user) {
		User u = repository.findByUsername(user.getUsername());
		if(u != null) {
			u.setName(user.getName());
	        u.setEmail(user.getEmail());
	        u.setContact(user.getContact());
	        u.setProfileImage(user.getProfileImage());
			return repository.save(u);
		}
		return null;
	}
	
	public List<User> displayallsellerrequest() {
        return repository.findByStatusIsNotNull();
    }

    public String approveseller(int id) {
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus("APPROVED");
        user.setRole(Role.SELLER);
        repository.save(user);
        return "Seller Approved Successfully";
    }

    public String rejectseller(int id) {
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus("REJECTED");
        repository.save(user);
        return "Seller Rejected Successfully";
    }
    
    
    public String requestToBecomeSeller(int userId) {
        Optional<User> optionalUser = repository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            
            if (user.getRole() == Role.BUYER) {
                user.setStatus("PENDING");
                repository.save(user);
                return "Seller request submitted";
            } else {
                return "Only buyers can request to become sellers";
            }
        }
        throw new RuntimeException("User not found");
    }
    
    public String removeseller(int id) {
        User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        
        if (user.getRole() == Role.SELLER) {
            user.setRole(Role.BUYER);
            user.setStatus(null); // Optional: clear the status
            repository.save(user);
            return "Seller role reverted to Buyer successfully";
        } else {
            return "Only users with SELLER role can be reverted";
        }
    }

    @Override
    public long displaybuyercount() {
        return repository.countByRole(Role.BUYER); 
    }

    @Override
    public long displaysellercount() {
        return repository.countByRole(Role.SELLER);
    }

	@Override
	public String getusername(int cid) {
		return repository.findNameById(cid);
	}

	
	@Override
	public List<User> getApprovedSellers() {
	    return repository.findApprovedSellers();
	}

	@Override
	public List<Order> getAllOrders() {
	    return orderRepository.findAll();
	}

	
	
}
