package ftn.booking.controller;

import ftn.booking.dto.MailDTO;
import ftn.booking.dto.UserDTO;
import ftn.booking.model.Mail;
import ftn.booking.model.User;
import ftn.booking.model.enums.Role;
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

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail-approved-punishment/toEmail/{toEmail}",produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMailApprovedPunishment(@PathVariable String toEmail){
		User user = userService.loadUserByUsername(toEmail);

		if(user.getRole().equals(Role.ROLE_CLIENT)) {
			return emailService.sendMailSimplified(toEmail, "You are punished by admin, " + user.getFirstName() + " " + user.getLastName(),
					"Unfortunatelly,admin approved your punishment,requested by instructor for action.\n Hope we will see you soon, " +
							user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");
		} else if (user.getRole().equals(Role.ROLE_INSTRUCTOR)) {
			return emailService.sendMailSimplified(toEmail, "Admin approved your request for punishment, " + user.getFirstName() +  " " + user.getLastName(),
					"Admin approved your punishment,so client gained 1 more punish point.\n Hope we will see you soon, " +
							user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");
		} else
			return Boolean.FALSE;

	}

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail-not-approved-punishment/toEmail/{toEmail}",produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMailNotApprovedPunishment(@PathVariable String toEmail){
		User user = userService.loadUserByUsername(toEmail);

		if(user.getRole().equals(Role.ROLE_CLIENT)) {
			return emailService.sendMailSimplified(toEmail, "Admin rejected to punish you, " + user.getFirstName() + " " +user.getLastName(),
					"Fortunatelly,admin didn't approved your punishment,requested by instructor for action.\n Hope we will see you soon, " +
							user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");
		} else if (user.getRole().equals(Role.ROLE_INSTRUCTOR)) {
			return emailService.sendMailSimplified(toEmail, "Admin  didn't approved your request for punishment, " + user.getFirstName() + " " + user.getLastName(),
					"Admin didn't approved your punishment,so client  didn't gained 1 punish point.\n Hope we will see you soon, " +
							user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");
		} else
			return Boolean.FALSE;

	}





}
