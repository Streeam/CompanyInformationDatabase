package com.streeam.cid.service;

import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.User;
import com.streeam.cid.repository.UserRepository;
import com.streeam.cid.service.dto.ContactDTO;
import io.github.jhipster.config.JHipsterProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    @Autowired
    private UserRepository userRepository;

    private static final String USER = "user";

    private static final String BASE_URL = "baseUrl";

    private static final String FIRST_NAME = "firstName";
    private static final String LAST_NAME = "lastName";
    private static final String EMAIL = "email";
    private static final String PHONE = "phone";
    private static final String MESSAGE = "message";

    private final JHipsterProperties jHipsterProperties;

    private final JavaMailSender javaMailSender;

    private final MessageSource messageSource;

    private final SpringTemplateEngine templateEngine;

    public MailService(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender,
                       MessageSource messageSource, SpringTemplateEngine templateEngine) {

        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, to, subject, content);

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.debug("Sent email to User '{}'", to);
        } catch (Exception e) {
            if (log.isDebugEnabled()) {
                log.warn("Email could not be sent to user '{}'", to, e);
            } else {
                log.warn("Email could not be sent to user '{}': {}", to, e.getMessage());
            }
        }
    }

    @Async
    public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }

    @Async
    private void sendEmailFromTemplate(String sendTo, User user, String templateName, String titleKey) {
        String language = "en";
        if(user.getLangKey() != null){
            language = user.getLangKey();
        }
        Locale locale = Locale.forLanguageTag(language);
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(sendTo, subject, content, false, true);
    }
    @Async
    private void sendEmailOfContactInfoFromTemplate(String sendTo, User user, String templateName, ContactDTO contactDTO) {
        String language = "en";
        if(user.getLangKey() != null){
            language = user.getLangKey();
        }
        Locale locale = Locale.forLanguageTag(language);
        Context context = new Context(locale);
        context.setVariable(FIRST_NAME, contactDTO.getFirstName());
        context.setVariable(LAST_NAME, contactDTO.getLastName());
        context.setVariable(EMAIL, contactDTO.getEmail());
        context.setVariable(PHONE, contactDTO.getPhone());
        context.setVariable(MESSAGE, contactDTO.getMessage());
        String content = templateEngine.process(templateName, context);
        String subject = "New Contact Info";
        sendEmail(sendTo, subject, content, false, true);
    }

    @Async
    public void sendActivationEmail(User user) {
        log.debug("Sending activation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/activationEmail", "email.activation.title");
    }

    @Async
    public void sendCreationEmail(User user) {
        log.debug("Sending creation email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/creationEmail", "email.activation.title");
    }

    @Async
    public void sendPasswordResetMail(User user) {
        log.debug("Sending password reset email to '{}'", user.getEmail());
        sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
    }

    public void sendEmailToAllFromCompany(Set<Employee> employees, String templateName, String templateTitle) {
        employees.stream()
            .map(employee -> employee.getUser().getEmail())
            .map(userRepository::findOneByEmailIgnoreCase)
            .filter(Optional::isPresent)
            .map(Optional::get)
            .filter(user -> Objects.nonNull(user.getEmail()))
            .forEach(user -> {
                log.debug("Sending a email to '{}'", user.getEmail());
                sendEmailFromTemplate(user.getEmail(), user, templateName, templateTitle);
            });
    }

    public void sendInviteEmail(String invitedUserEmail ,User manager) {

        log.debug("Sending a invitation notification email to '{}'", invitedUserEmail);
        sendEmailFromTemplate(invitedUserEmail ,manager, "mail/inviteToJoinEmail", "email.invite.to.join");
    }

    public void sendTaskEmail(Employee toUser, User fromUser) {
        log.debug("Sending a notification email to " + toUser.getUser().getEmail() + " to inform him that he was assigned a new task.");
        sendEmailFromTemplate(toUser.getUser().getEmail() ,fromUser, "mail/taskEmail", "email.new.task");
    }

    public void sendContactInfo(ContactDTO contactDTO, User currentUser) {
        log.debug("Contact information from '{}'", contactDTO.getFirstName());
        sendEmailOfContactInfoFromTemplate("bogdanmihoci27@gmail.com" ,currentUser, "mail/contactInfo", contactDTO);
    }
}
