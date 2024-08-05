package mypackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import mypackage.Emailmodel;

@Service
public class EmailServices implements Emailrepository {
	
	@Autowired
	private JavaMailSender mailsender;
	
	@Value("${spring.mail.username}")
	private String sender;
	
	public String SendEmail(Emailmodel em) {
		try {
			SimpleMailMessage s=new SimpleMailMessage();
			s.setFrom(sender);
			s.setTo(em.getEmail_address());
			s.setSubject(em.getSubject());
			s.setText(em.getMessage_body());
			mailsender.send(s);
			return "Email Sent Successfully";
		} catch (Exception e) {
			return e.getMessage();
		}
	}

}
