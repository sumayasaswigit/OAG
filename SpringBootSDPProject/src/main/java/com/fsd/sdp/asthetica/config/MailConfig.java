package com.fsd.sdp.asthetica.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfig {
    @Bean
    JavaMailSender getJavaMailSender() {
        return new JavaMailSenderImpl();
    }
}
