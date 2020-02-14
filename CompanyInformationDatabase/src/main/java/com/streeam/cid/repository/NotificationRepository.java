package com.streeam.cid.repository;
import com.streeam.cid.domain.Notification;
import com.streeam.cid.domain.enumeration.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * Spring Data  repository for the Notification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByEmployeeId(Long employeeId);
    List<Notification> findAllByFormat(NotificationType notificationType);

}
