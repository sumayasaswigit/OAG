package com.fsd.sdp.asthetica.service;


import java.util.List;

import com.fsd.sdp.asthetica.model.Order;
import com.fsd.sdp.asthetica.model.User;


public interface UserService {
	public String adduser(User user);
	public User checkuserlogin(String username, String password);
	public List<User> displayusers();
	public String deleteuser(int cid);
	public User getprofile(String username);
	public User updateProfile(User user);
	
	public List<User> displayallsellerrequest();
	public String approveseller(int cid);
	public String rejectseller(int cid);
	public String removeseller(int cid);
	public String requestToBecomeSeller(int cid);
	public String getusername(int cid);
	
	public long displaybuyercount();
	public long displaysellercount();
	
	List<User> getApprovedSellers();
	List<Order> getAllOrders();
	
	
}
