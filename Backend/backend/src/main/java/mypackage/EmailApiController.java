package mypackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*",methods = {RequestMethod.GET,RequestMethod.DELETE,RequestMethod.POST,RequestMethod.PUT},allowedHeaders = "*")
public class EmailApiController {

	@Autowired
	EmailServices emservice;
	
	@PostMapping("api/sendemail")
	public Emailmodel SendEmail(@RequestBody Emailmodel m) {
		emservice.SendEmail(m); 
		
		return m;	
		
	}
	
}
