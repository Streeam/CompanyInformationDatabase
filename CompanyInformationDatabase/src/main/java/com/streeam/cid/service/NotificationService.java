package com.streeam.cid.service;

import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.Notification;
import com.streeam.cid.domain.enumeration.NotificationType;
import com.streeam.cid.repository.EmployeeRepository;
import com.streeam.cid.repository.NotificationRepository;
import com.streeam.cid.service.dto.NotificationDTO;
import com.streeam.cid.service.mapper.NotificationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Notification}.
 */
@Service
@Transactional
public class NotificationService {

    private final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepository notificationRepository;

    private final NotificationMapper notificationMapper;

    @Autowired
    private EmployeeRepository employeeRepository;

    public NotificationService(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    /**
     * Save a notification.
     *
     * @param notificationDTO the entity to save.
     * @return the persisted entity.
     */
    public NotificationDTO save(NotificationDTO notificationDTO) {
        log.debug("Request to save Notification : {}", notificationDTO);
        Notification notification = notificationMapper.toEntity(notificationDTO);
        notification = notificationRepository.save(notification);
        return notificationMapper.toDto(notification);
    }

    /**
     * Get all the notifications.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<NotificationDTO> findAll() {
        log.debug("Request to get all Notifications");
        return notificationRepository.findAll().stream()
            .map(notificationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the employee's notifications.
     *
     * @param employee .
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<NotificationDTO> findAllByEmployee(Employee employee) {
        log.debug("Request to get all employee's Notifications");
        return notificationRepository.findAllByEmployeeId(employee.getId()).
            stream().
            map(notification -> notificationMapper.toDto(notification)).
            collect(Collectors.toList());
    }

    /**
     * Get one notification by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<NotificationDTO> findOne(Long id) {
        log.debug("Request to get Notification : {}", id);
        return notificationRepository.findById(id)
            .map(notificationMapper::toDto);
    }

    /**
     * Delete the notification by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Notification : {}", id);
        notificationRepository.deleteById(id);
    }


    public Employee save(Employee authorEmployee, String referencedEmployeeEmail, Long companyId, NotificationType notificationType, String comment) {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setSentDate(Instant.now());
        notificationDTO.setFormat(notificationType);
        notificationDTO.setEmployeeId(authorEmployee.getId());
        notificationDTO.setRead(false);
        notificationDTO.setComment(comment);
        notificationDTO.setReferencedEmployee(referencedEmployeeEmail);
        return authorEmployee;}

    public NotificationDTO save(String from, Employee to, NotificationType notificationType, String comment) {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setSentDate(Instant.now());
        notificationDTO.setFormat(notificationType);
        notificationDTO.setRead(false);
        notificationDTO.setComment(comment);
        notificationDTO.setEmployeeId(to.getId());
        notificationDTO.setReferencedEmployee(from);
        Notification notification = notificationRepository.save(notificationMapper.toEntity(notificationDTO));
        return notificationMapper.toDto(notification);
    }

    public void deleteAllByEmployee(Employee employeeToDelete) {
        List<Notification> notifications = notificationRepository.findAllByEmployeeId(employeeToDelete.getId());
        notifications.stream()
            .forEach(notification -> {
                this.delete(notification.getId());
            });
    }

}
