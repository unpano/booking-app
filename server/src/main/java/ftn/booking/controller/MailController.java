package ftn.booking.controller;

import ftn.booking.dto.AdminResponseDTO;
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

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail-rejected-request-deleting-account/toEmail/{toEmail}",produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMailRejectedRequestDeletingAccount(@PathVariable String toEmail){
		User user = userService.loadUserByUsername(toEmail);


			return emailService.sendMailSimplified(toEmail, "Admin rejected your request for deleting account, " + user.getFirstName() + " " +user.getLastName(),
					"Unfortunatelly,admin didn't approved your request for deleting account.\n Hope we will see you soon, " +
							user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");

	}

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail-approving-request-deleting-account/toEmail/{toEmail}",produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMailApprovingRequestDeletingAccount(@PathVariable String toEmail){
		User user = userService.loadUserByUsername(toEmail);


		return emailService.sendMailSimplified(toEmail, "Admin approved your request for deleting account, " + user.getFirstName() + " " +user.getLastName(),
				"Admin approved your request for deleting account.\nIf you want to again have access to our app,you need to again register.\n \n Hope we will see you soon, " +
						user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");

	}

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail-disabling-account/toEmail/{toEmail}",produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMailDisablingAccount(@PathVariable String toEmail){
		User user = userService.loadUserByUsername(toEmail);


		return emailService.sendMailSimplified(toEmail, "Admin disabled your  account, " + user.getFirstName() + " " +user.getLastName(),
				"Because you have wired entities,admin only disabled your account.\n \n Hope we will see you soon, " +
						user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");

	}



	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail-admin-comment-to-complaint-client",produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMailAdminCommentToComplaintClient(@RequestBody AdminResponseDTO adminResponseDTO){
		User user = userService.loadUserByUsername(adminResponseDTO.getToEmail());

		if(user.getRole().equals(Role.ROLE_CLIENT)) {
			return emailService.sendMailSimplified(adminResponseDTO.getToEmail(), "Admin responsed to your complaint, " + user.getFirstName() + " " +user.getLastName(),
					"Here is his response: \n" + adminResponseDTO.getComment() + ".\n\n Hope we will see you soon, " +
							user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");
		} else if (user.getRole().equals(Role.ROLE_INSTRUCTOR)) {
			return emailService.sendMailSimplified(adminResponseDTO.getToEmail(), "Admin responsed to complaint for you, " + user.getFirstName() + " " + user.getLastName(),
					"Here is his response: " + adminResponseDTO.getComment() +  "\n\n Hope we will see you soon, " +
							user.getFirstName() + " " + user.getLastName() + "\n \n Isa Booking 56 team");
		} else
			return Boolean.FALSE;

	}



}
