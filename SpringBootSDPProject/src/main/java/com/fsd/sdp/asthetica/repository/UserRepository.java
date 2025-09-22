package com.fsd.sdp.asthetica.repository;

import java.util.List; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fsd.sdp.asthetica.enumeration.Role;
import com.fsd.sdp.asthetica.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	public User findByUsernameAndPassword(String username, String password);
	public User findByUsername(String username);
	@Query("SELECT u.name FROM User u WHERE u.id = :id")
	String findNameById(@Param("id") int cid);
	public List<User> findByStatusIsNotNull();
	long countByRole(Role role);
	@Query("SELECT u FROM User u WHERE u.role = 'SELLER' AND u.status = 'APPROVED'")
	List<User> findApprovedSellers();
}
