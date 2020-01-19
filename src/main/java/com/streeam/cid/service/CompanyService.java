package com.streeam.cid.service;

import com.streeam.cid.domain.Authority;
import com.streeam.cid.domain.Company;
import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.User;
import com.streeam.cid.repository.AuthorityRepository;
import com.streeam.cid.repository.CompanyRepository;
import com.streeam.cid.repository.EmployeeRepository;
import com.streeam.cid.repository.UserRepository;
import com.streeam.cid.security.AuthoritiesConstants;
import com.streeam.cid.service.dto.CompanyDTO;
import com.streeam.cid.service.mapper.CompanyMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Company}.
 */
@Service
@Transactional
public class CompanyService {

    private final Logger log = LoggerFactory.getLogger(CompanyService.class);

    @Autowired
    private MailService mailService;

    @Autowired
    private  UserService userService;

    private final  EmployeeService employeeService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    private final CompanyRepository companyRepository;

    private final CompanyMapper companyMapper;

    private final AuthorityRepository authorityRepository;
    private final NotificationService notificationService;

    public CompanyService(CompanyRepository companyRepository, EmployeeService employeeService, AuthorityRepository authorityRepository,NotificationService notificationService , CompanyMapper companyMapper) {
        this.employeeService = employeeService;
        this.companyRepository = companyRepository;
        this.authorityRepository = authorityRepository;
        this.companyMapper = companyMapper;
        this.notificationService = notificationService;
    }

    /**
     * Save a company.
     * @param companyDTO the entity to save.
     * @return the persisted entity.
     */
    public CompanyDTO save(CompanyDTO companyDTO) {
        log.debug("Request to save Company : {}", companyDTO.getName());
        Company company = companyMapper.toEntity(companyDTO);
        company = companyRepository.save(company);
        return companyMapper.toDto(company);
    }
    /**
     * Get all the companies.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CompanyDTO> findAll() {
        log.debug("Request to get all Companies");
        return companyRepository.findAll().stream()
            .map(companyMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }
    /**
     * Get one company by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CompanyDTO> findOne(Long id) {
        log.debug("Request to get Company : {}", id);
        return companyRepository.findById(id)
            .map(companyMapper::toDto);
    }

    /**
     * Delete the company by id.
     *
     * @param currentCompany the company to delete.
     */
    public void delete(Company currentCompany) {
        log.debug("Request to delete Company : {}", currentCompany.getName());
        Optional.of(companyRepository
            .findOneById(currentCompany.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(company -> {
                employeeRepository.findAll().stream()
                    .map(Employee::getId)
                    .map(employeeRepository::findById)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .forEach(employee -> {
                        Optional.of(userRepository
                            .findOneByLogin(employee.getUser().getLogin()))
                            .filter(Optional::isPresent)
                            .map(Optional::get)
                            .map(user1 -> {
                                Set<Authority> managedAuthorities = new HashSet<>();
                                //managedAuthorities.clear(); // Clear all old authorities
                                user1.getAuthorities().stream()
                                    .map(Authority::getName)
                                    .map(authorityRepository::findOneByName)
                                    .filter(Optional::isPresent)
                                    .map(Optional::get)
                                    .filter(authority ->
                                        !AuthoritiesConstants.MANAGER.equals( authority.getName()) &&
                                            !AuthoritiesConstants.EMPLOYEE.equals( authority.getName())
                                    )
                                    .forEach(managedAuthorities::add);
                                user1.setAuthorities(managedAuthorities);
                                return user1;
                            });
                        employee.setHiredDate(null);
                    });
                return company;
            }).ifPresent(
            companyRepository::delete);
    }

    /**
     * Checks if the company email already exists
     * @param email
     * @return true if the company email is present in the database false otherwise
     */
    public boolean companyEmailAlreadyExists(String email) {
        return companyRepository.findAll().stream().anyMatch(company -> company.getEmail().equals(email));
    }

    /**
     * Checks if the company name already exists
     * @param name
     * @return true if the company name is present in the database false otherwise
     */
    public boolean companyNameAlreadyExists(String name) {
        return companyRepository.findAll().stream().anyMatch(company -> company.getName().equals(name));
    }

    /**
     *
     * @return an optional of the current user
     */
    public Optional<User> findCurrentUser(String login) {
        return userService.getUserWithAuthoritiesByLogin(login);
    }

    public Optional<Employee> findEmployeeFromUser(User user) {
        return employeeService.findOneByUser(user);
    }

    /**
     *  Checks if the current uses has the provided authorities
     * @param roles
     * @return true if the user has at least one of the authorities false otherwise
     */
    public boolean checkUserHasRoles(User user,String... roles) {
        return userService.checkIfUserHasRoles(user, roles);
    }

    public CompanyDTO saveCompany(CompanyDTO companyDTO, Employee employee, User user) {

        Company company = companyMapper.toEntity(companyDTO);
        Company updatedCompany = companyRepository.save(company);
        CompanyDTO result = companyMapper.toDto(updatedCompany);
        log.debug("Request to save Company : {}", result.getName());

        employee.setUser(user);
        employee.setHiredDate(LocalDate.now());
        log.debug("Request to save Employee : {}", employee);
        employeeRepository.save(employee);

        return result;
    }

    public Optional<Company> findCompanyById(Long companyId) {
        return companyRepository.findOneById(companyId);
    }

}
