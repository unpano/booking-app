package ftn.booking.controller;

import ftn.booking.dto.MailDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.Mail;
import ftn.booking.service.MailService;
import ftn.booking.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "emails")
public class MailController {

	private MailService emailService;

	private ModelMapper modelMapper;

	private UserService userService;

	@Autowired
	public MailController(MailService emailService,ModelMapper modelMapper,UserService userService) {
		this.emailService = emailService;
		this.modelMapper = modelMapper;
		this.userService = userService;
	}



	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMail(@RequestBody MailDTO emailDTO){
		Mail mail = new Mail(emailDTO.getMailFrom(),emailDTO.getMailTo(),emailDTO.getMailCc(),emailDTO.getMailBcc(),
				emailDTO.getMailSubject(),emailDTO.getMailContent(),emailDTO.getContentType(),emailDTO.getAttachments());
		return emailService.sendMail(mail);
	}
	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail-simplified/{toEmail}",produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMail(@PathVariable String toEmail){

		UserDTO informationVerUser = modelMapper.map(userService.loadUserByUsername(toEmail),UserDTO.class);
		return emailService.sendMailSimplified(toEmail,"Your account succesfully verified," + informationVerUser.getFirstName(),
				"Your account is successfully verified by admin.\n Hope you will enjoy, "+
						informationVerUser.getFirstName() + " "+ informationVerUser.getLastName() +"\n \n Isa Booking 56 team");

	}

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value="/send-mail-rejecting-verification/{toEmail}",produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendRejectingMail(@PathVariable String toEmail){
		UserDTO informationVerUser = modelMapper.map(userService.loadUserByUsername(toEmail),UserDTO.class);
		return emailService.sendMailSimplified(toEmail,"Your account verification is rejected," + informationVerUser.getFirstName(),
				"Unfortunatelly,admin rejected you request for verification.\n Hope we will see you soon, "+
						informationVerUser.getFirstName() + " "+ informationVerUser.getLastName() +"\n \n Isa Booking 56 team");
	}


}
