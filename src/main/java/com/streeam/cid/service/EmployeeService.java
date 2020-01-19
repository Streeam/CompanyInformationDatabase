package com.streeam.cid.service;

import com.streeam.cid.domain.*;
import com.streeam.cid.repository.AuthorityRepository;
import com.streeam.cid.repository.EmployeeRepository;
import com.streeam.cid.repository.RolesRepository;
import com.streeam.cid.repository.UserRepository;
import com.streeam.cid.security.AuthoritiesConstants;
import com.streeam.cid.service.dto.EmployeeDTO;
import com.streeam.cid.service.mapper.CompanyMapper;
import com.streeam.cid.service.mapper.EmployeeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Employee}.
 */
@Service
@Transactional
public class EmployeeService {

    private final Logger log = LoggerFactory.getLogger(EmployeeService.class);

    private final EmployeeRepository employeeRepository;

    private final EmployeeMapper employeeMapper;

    private final  RolesService rolesService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private  UserService userService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private RolesRepository roleRepository;

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private CompanyService companyService;

    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper,
                           NotificationService notificationService, RolesService rolesService) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.notificationService = notificationService;
        this.rolesService = rolesService;
    }

    /**
     * Save a employee.
     *
     * @param employeeDTO the entity to save.
     * @return the persisted entity.
     */
    public EmployeeDTO save(EmployeeDTO employeeDTO) {
        Employee employee = employeeMapper.toEntity(employeeDTO);
        Optional<User> user = userRepository.findOneWithAuthoritiesById(employeeDTO.getUserId());
        Optional<Roles> roles = roleRepository.findById(employeeDTO.getRoleId());
        if(user.isPresent() && roles.isPresent()){
            employee.setUser(user.get());
            employee.setRole(roles.get());
            log.debug("Request to save Employee : {}", employee);
        }
        return saveEmployee(employee);
    }

    public EmployeeDTO saveEmployee(Employee employee) {
        log.debug("Request to save Employee : {}", employee);
        Employee updatedEmployee = employeeRepository.save(employee);
        EmployeeDTO result = employeeMapper.toDto(updatedEmployee);
        return result;
    }

    /**
     *  Create and save a employee and link it to a user
     * @param newUser
     * @return Employee with the same details as the user
     */
    public Employee createEmployeeFromUser(User newUser) {
        Set<Authority> authorities = new HashSet<>();
        newUser.getAuthorities().forEach(authorities::add);
        List<User> users = userService.findAll();
        Optional<User> manager =  users.stream().filter(user -> userService.checkIfUserHasRoles(user, AuthoritiesConstants.MANAGER)).findAny();
        Employee employee = new Employee();
        if(manager.isPresent()){
            authorityRepository.findById(AuthoritiesConstants.EMPLOYEE).ifPresent(authorities::add);
            newUser.setAuthorities(authorities);
            employee.user(newUser)
                .role(rolesService.defaultRole(false))
                .hiredDate(LocalDate.now());
        } else {
            authorityRepository.findById(AuthoritiesConstants.MANAGER).ifPresent(authorities::add);
            newUser.setAuthorities(authorities);
            employee.user(newUser)
                .role(rolesService.defaultRole(true))
                .hiredDate(LocalDate.now());
        }
        log.debug("Request to save Employee : {}", employee);
        employee = employeeRepository.save(employee);
        return employee;
    }

    /**
     * Get all the employees.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<EmployeeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Employees");
        return employeeRepository.findAll(pageable)
            .map(employeeMapper::toDto);
    }

    /**
     * Get one employee by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EmployeeDTO> findOne(Long id) {
        log.debug("Request to get Employee : {}", id);
        return employeeRepository.findById(id)
            .map(employeeMapper::toDto);
    }

    /**
     * Delete the employee by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Employee : {}", id);
        employeeRepository.deleteById(id);
    }

    public Optional<Employee> findOneByUser(User user) {
        return employeeRepository.findOneByUser(user);
    }
    /**
     * Get one employee by id.
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Employee> findOneById(Long id) {
        log.debug("Request to get Employee : {}", id);
        return employeeRepository.findById(id);
    }

    public boolean hasCurrentUserRoles(User currentUser, String... roles) {
        return userService.checkIfUserHasRoles(currentUser, roles);
    }

    public Optional<User> findCurrentUser(String login) {
        return userService.getCurrentUser(login);
    }

    public Optional<User> findUserByEmail(String email) {
        return  userService.findOneByEmail(email);
    }

    public void deleteEmployeesNotifications(Employee employeeToDelete) {
        notificationService.deleteAllByEmployee(employeeToDelete);
    }

    public void deleteLinkedUser(User linkedUser) {
        userService.deleteUser(linkedUser.getLogin());
    }

    @Transactional(readOnly = true)
    public List<EmployeeDTO> findAllEmployees() {
        log.debug("Request to get all Employees");
        return employeeRepository.findAll().
            stream().
            map(employee -> employeeMapper.toDto(employee)).
            collect(Collectors.toList());
    }

}
